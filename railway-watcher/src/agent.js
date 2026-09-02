import { query } from '@anthropic-ai/claude-agent-sdk';

// Verified against a live `tools/list` call against `railway mcp` — every
// tool here has readOnlyHint: true. Anything not on this list (redeploy,
// accept-deploy, set-variables, delete-*, railway-agent, etc.) is simply
// absent from allowedTools, so Claude cannot call it regardless of prompt.
const READ_ONLY_RAILWAY_TOOLS = [
  'whoami',
  'list-workspaces',
  'list-projects',
  'list-services',
  'get-service-config',
  'get-service-metrics',
  'list-variables',
  'list-domains',
  'domain-status',
  'search-docs',
  'fetch-docs',
  'list-feature-flags',
  'get-feature-flag',
  'list-deployments',
  'get-status',
  'get-logs',
  'http-requests',
  'http-error-rate',
  'http-response-time',
  'get-deployment-diagnosis',
  'environment-status',
  'list-tcp-proxies',
].map((name) => `mcp__railway__${name}`);

function mcpServers() {
  return {
    railway: {
      type: 'stdio',
      command: 'railway',
      args: ['mcp'],
    },
  };
}

const SYSTEM_PROMPT = `
You are railway-watcher, a Slack bot that answers questions about Railway
projects and deployments using the "railway" MCP tools available to you.
You have no other tools. Answer concisely, formatted for Slack (plain text,
occasional markdown), and never mention permissions, connectors, sessions,
or any tool other than the railway ones.
`.trim();

export async function ask(prompt) {
  const q = query({
    prompt,
    options: {
      mcpServers: mcpServers(),
      settingSources: [],
      systemPrompt: SYSTEM_PROMPT,
      permissionMode: 'dontAsk',
      allowedTools: READ_ONLY_RAILWAY_TOOLS,
      model: 'claude-opus-5',
    },
  });

  for await (const message of q) {
    if (message.type === 'result') {
      if (message.subtype === 'success') {
        return message.result;
      }
      return `Sorry, something went wrong (${message.subtype}).`;
    }
  }
  return '(no response)';
}
