import { ask } from './agent.js';

const POLL_INTERVAL_MS = 10 * 60 * 1000;
const FAILURE_STATUSES = new Set(['CRASHED', 'FAILED']);

const STATUS_CHECK_PROMPT = `
Check the latest deployment status for every service across all Railway projects in this account.
Use list-projects, then list-services and list-deployments for each service (most recent deployment only).
Respond with ONLY a JSON array (no prose, no markdown fences), one entry per service:
[{"project": "...", "service": "...", "status": "..."}]
Use the latest deployment's status field verbatim (e.g. SUCCESS, CRASHED, FAILED, REMOVED, BUILDING, DEPLOYING).
`.trim();

function parseStatuses(raw) {
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

export function startMonitor(app) {
  const channel = process.env.SLACK_ALERT_CHANNEL;
  if (!channel) {
    console.warn('SLACK_ALERT_CHANNEL not set — crash monitoring is disabled');
    return;
  }

  const lastStatus = new Map();

  async function tick() {
    let statuses;
    try {
      const raw = await ask(STATUS_CHECK_PROMPT);
      statuses = parseStatuses(raw);
      if (!statuses) {
        console.error('Monitor: could not parse status check response:', raw);
        return;
      }
    } catch (err) {
      console.error('Monitor tick failed:', err);
      return;
    }

    for (const entry of statuses) {
      const key = `${entry.project}/${entry.service}`;
      const prev = lastStatus.get(key);
      const isNewFailure = FAILURE_STATUSES.has(entry.status) && prev !== entry.status;

      if (isNewFailure) {
        await app.client.chat.postMessage({
          channel,
          text: `⚠️ *${entry.service}* in *${entry.project}* is now *${entry.status}*`,
        });
      }
      lastStatus.set(key, entry.status);
    }
  }

  tick();
  setInterval(tick, POLL_INTERVAL_MS);
}
