import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import pkg from '@slack/bolt';
import { ask } from './agent.js';
import { startMonitor } from './monitor.js';

const execFileAsync = promisify(execFile);
const { App } = pkg;

const requiredEnv = ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN', 'ANTHROPIC_API_KEY'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

if (process.env.RAILWAY_ACCESS_TOKEN) {
  await import('./setup-railway-auth.js');
}

try {
  const { stdout } = await execFileAsync('railway', ['whoami']);
  console.log('Railway CLI:', stdout.trim());
} catch (err) {
  console.error('Railway CLI is not installed or not logged in. Run `railway login` in this environment.');
  console.error(err.message);
  process.exit(1);
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event('app_mention', async ({ event, say }) => {
  console.log('Received app_mention:', JSON.stringify(event));
  const text = stripMention(event.text);
  try {
    const reply = await ask(text);
    await say({ text: reply, thread_ts: event.thread_ts || event.ts });
  } catch (err) {
    console.error('Error handling app_mention:', err);
  }
});

app.message(async ({ message, say }) => {
  console.log('Received message:', JSON.stringify(message));
  if (message.subtype || message.channel_type !== 'im') return;
  try {
    const reply = await ask(message.text || '');
    await say({ text: reply, thread_ts: message.thread_ts || message.ts });
  } catch (err) {
    console.error('Error handling message:', err);
  }
});

app.error(async (error) => {
  console.error('Bolt app error:', error);
});

function stripMention(text) {
  return (text || '').replace(/<@[^>]+>\s*/, '').trim();
}

await app.start();
console.log('railway-watcher is running (Socket Mode)');

startMonitor(app);
