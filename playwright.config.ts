import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 500,
    },
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.spec\.ts/,
      fullyParallel: false,
      use: {
        baseURL: process.env.BASE_URL,
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    {
      name: "chromium",
      testIgnore: /auth\.setup\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth/auth.json",
      },
    },
  ],
});
