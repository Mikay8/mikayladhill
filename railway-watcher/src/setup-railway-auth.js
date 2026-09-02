import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

const RAILWAY_ACCESS_TOKEN = process.env.RAILWAY_ACCESS_TOKEN;
const RAILWAY_REFRESH_TOKEN = process.env.RAILWAY_REFRESH_TOKEN;
const RAILWAY_USER_ID = process.env.RAILWAY_USER_ID;

if (!RAILWAY_ACCESS_TOKEN || !RAILWAY_REFRESH_TOKEN || !RAILWAY_USER_ID) {
  console.error(
    'Missing RAILWAY_ACCESS_TOKEN, RAILWAY_REFRESH_TOKEN, or RAILWAY_USER_ID — cannot set up Railway CLI auth.',
  );
  process.exit(1);
}

const configDir = path.join(homedir(), '.railway');
const configPath = path.join(configDir, 'config.json');

const config = {
  user: {
    id: RAILWAY_USER_ID,
    accessToken: RAILWAY_ACCESS_TOKEN,
    refreshToken: RAILWAY_REFRESH_TOKEN,
    token: RAILWAY_ACCESS_TOKEN,
  },
  projects: [],
};

await mkdir(configDir, { recursive: true });
await writeFile(configPath, JSON.stringify(config, null, 2), { mode: 0o600 });
console.log('Wrote Railway CLI config to', configPath);
