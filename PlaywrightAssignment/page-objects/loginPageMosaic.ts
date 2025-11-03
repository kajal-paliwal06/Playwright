import { expect, Page } from "@playwright/test";

export class LoginPageMosaic {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      "https://cafemanager-newput.dev.bamcotest.com/manager",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      }
    );
  }

  async enterUsername(email: string) {
    const emailField = this.page.locator('input[name="mosaicemail"]');

    await emailField.waitFor({ state: "visible", timeout: 15000 });
    await emailField.fill("");
    await emailField.fill(email);
  }

  async enterPassword(password: string) {
    const passwordField = this.page.locator('[name="mosaicpassword"]');

    await passwordField.waitFor({ state: "visible", timeout: 15000 });
    await passwordField.fill("");
    await passwordField.fill(password);
  }

  async clickLogin() {
    const loginButton = this.page.locator(
      'input[type="image"][src*="login.gif"]'
    );
    await loginButton.waitFor({ state: "visible", timeout: 10000 });

    await loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async login(email: string, password: string) {
    await this.enterUsername(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyLoginSuccess() {
    // Verify if correct user login
    const userName = this.page
      .locator("td", {
        hasText: "Welcome back Kajal Paliwal",
      })
      .nth(1);
    await expect(userName).toBeVisible({ timeout: 15000 });
    console.log("Login successful: Kajal Paliwal is visible in header");
  }
}
