import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 180000,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "html",
  expect: {
    timeout: 10000,
  },
  use: {
    trace: "on-first-retry",
    actionTimeout: 15000,
    navigationTimeout: 30000,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://cafemanager.dev.bamcotest.com/cafemanager/login",
      },
    },
    {
      name: "staging",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://cafemanager.staging.bamcotest.com/cafemanager/login",
      },
    },
  ],
});
