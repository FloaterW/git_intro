import { defineConfig } from "@playwright/test";

// Set CHROMIUM_PATH to use a preinstalled Chromium instead of Playwright's own.
const executablePath = process.env.CHROMIUM_PATH;

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: {
    // CI builds in an earlier step, so only start the server there.
    command: process.env.CI ? "npm run start" : "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 180_000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 812 } } },
  ],
});
