import { expect, Page } from "@playwright/test";

export class LoginPageCMN {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/cafemanager/login", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  async enterUsername(employeeNum: string) {
    const employeeNumber = this.page.locator('input[name="emanresu"]');

    await employeeNumber.waitFor({ state: "visible", timeout: 15000 });
    await employeeNumber.fill(employeeNum);
  }

  async enterPassword(password: string) {
    const passwordField = this.page.locator('[name="drowssap"]');
    await passwordField.waitFor({ state: "visible" });
    await passwordField.fill(password);
  }

  async clickLogin() {
    const loginButton = this.page.getByRole("button", { name: /log\s*in/i });
    await loginButton.waitFor({ state: "visible", timeout: 10000 });
    await loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async login(employeeNum: string, password: string) {
    await this.enterUsername(employeeNum);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyLoginSuccess() {
    const userName = this.page.locator("div.user p strong");
    await expect(userName).toContainText("Kajal Paliwal", { timeout: 30000 });

    const accountInfo = this.page.locator(".account p");
    await expect(accountInfo).toBeVisible();
    await expect(accountInfo).toContainText("Wellness Team");
  }
}
