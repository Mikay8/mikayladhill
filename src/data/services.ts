export interface ServiceLink {
  project: string;
  service: string;
  url: string;
}

export const services: ServiceLink[] = [
  { project: 'mikayladhill', service: 'Site', url: 'https://mikayladhill.com' },
  { project: 'crrnt-app', service: 'Web', url: 'https://web-production-a1d60.up.railway.app' },
  {
    project: 'mikaylas-weather-bot',
    service: 'Web demo',
    url: 'https://web-demo-production-f7a9.up.railway.app',
  },
  { project: 'mikaylas-weather-bot', service: 'Web', url: 'https://web-production-b13b50.up.railway.app' },
  { project: 'cards-mikayla', service: 'App', url: 'https://cards-mikayla-production.up.railway.app' },
  { project: 'presnt', service: 'App', url: 'https://www.presnt.link' },
];

export const RAILWAY_USAGE_URL = 'https://railway.com/dashboard';
