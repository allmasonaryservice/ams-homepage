import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  use: {
    baseURL: 'http://localhost:4321',
    headless: true,
  },
  webServer: {
    command: 'npx astro preview --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
