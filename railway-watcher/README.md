# railway-watcher

A Slack bot with read-only Railway access. DM it or @mention it to ask about
your Railway projects; it also polls deployment status every 10 minutes and
posts to a Slack channel when a service crashes or fails.

Read-only by design: [src/agent.js](src/agent.js) allowlists only the Railway
MCP tools whose protocol-level `readOnlyHint` is `true` (verified directly
against a live `tools/list` call) — `redeploy`, `accept-deploy`,
`set-variables`, `delete-*`, `railway-agent`, and every other mutating tool
are simply absent from `allowedTools`, so Claude cannot call them regardless
of what it's asked. The session also runs with `settingSources: []` and a
custom `systemPrompt`, fully isolated from any ambient Claude Code config
(personal connectors, other MCP servers, etc.) — without this the bot would
inherit whatever's in `~/.claude/settings.json` on the machine it runs on.

## How Railway access works

This bot shells out to the **Railway CLI** (`railway mcp`) as a subprocess.
Locally, that uses whatever `railway login` session is active on your
machine. In production, there's no interactive login available, so the CLI's
session file (`~/.railway/config.json`) is reconstructed at startup from
environment variables — see [src/setup-railway-auth.js](src/setup-railway-auth.js).

Railway's plain account API tokens were tried first and didn't authenticate
(`Not Authorized` even on Railway's own documented test query, reproducibly,
across multiple freshly-created tokens — looked like an account-side issue
worth raising with Railway support separately); the CLI-based MCP connection
sidesteps that entirely.

## Setup

### 1. Slack app

Already created (Socket Mode app, "mikayla-bot"). From api.slack.com/apps:

- Bot Token (`xoxb-...`) — OAuth & Permissions
- App-Level Token (`xapp-...`) — Basic Information → App-Level Tokens, scope `connections:write`
- Bot scopes: `chat:write`, `im:history`, `im:write`, `app_mentions:read`
- Event subscriptions: `message.im`, `app_mention`
- App Home → Messages Tab must be enabled for DMs to work

Invite the bot to whichever channel you want crash alerts posted in
(`/invite @mikayla-bot`), then get that channel's ID (right-click the channel
→ View channel details → bottom of the panel) for `SLACK_ALERT_CHANNEL`.

### 2. Railway CLI credentials (for production only)

Locally, `railway login` is enough — skip this section for local dev.

For a deployed instance, extract three values from your already-logged-in
CLI's session file at `~/.railway/config.json` under the `user` key:

- `accessToken` → set as `RAILWAY_ACCESS_TOKEN`
- `refreshToken` → set as `RAILWAY_REFRESH_TOKEN`
- `id` → set as `RAILWAY_USER_ID`

Do this yourself directly from the file — don't paste these into chat with
an AI assistant, since they carry the same access as your personal Railway
account. Set all three as environment variables on the deployed service.

This is a real, sensitive personal-account-level credential, not a scoped
service token (Railway's scoped token types don't work with `railway mcp` —
see above). Treat it accordingly: don't share it, and revoke/rotate via
`railway logout` + re-login if it's ever exposed.

### 3. Anthropic API key

Standard `sk-ant-...` key from console.anthropic.com. Set as `ANTHROPIC_API_KEY`.

### 4. Deploy

This repo includes a [Dockerfile](Dockerfile) that installs `@railway/cli` as
an npm dependency (so the container has `railway` on PATH without a native
binary download) and runs `npm start`, which reconstructs the CLI session
from the three `RAILWAY_*` env vars before starting the bot.

Environment variables to set on the Railway service:

| Variable | Source |
|---|---|
| `SLACK_BOT_TOKEN` | Slack app → OAuth & Permissions |
| `SLACK_APP_TOKEN` | Slack app → Basic Information → App-Level Tokens |
| `SLACK_ALERT_CHANNEL` | Channel ID from Slack |
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `RAILWAY_ACCESS_TOKEN` | `~/.railway/config.json` → `user.accessToken` |
| `RAILWAY_REFRESH_TOKEN` | `~/.railway/config.json` → `user.refreshToken` |
| `RAILWAY_USER_ID` | `~/.railway/config.json` → `user.id` |

No public domain is needed — Slack Socket Mode connects outbound, so this
service doesn't need to consume one of Railway's HTTP domain slots.

## Local development

```bash
cp .env.example .env   # fill in Slack + Anthropic values
railway login          # if not already logged in
npm install
npm run start:local
```
