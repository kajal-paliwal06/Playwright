import { Page, expect } from "@playwright/test";

export class MenusPage {
  constructor(private page: Page) {
    this.page = page;
  }

  // Select account after login
  async selectAccount(accountName: string, campusName: string) {
    const accountInfo = this.page.locator(".account p");
    await accountInfo.click();

    const searchInput = this.page.locator("#account-search");
    await searchInput.waitFor({ state: "visible" });
    await searchInput.fill(accountName);

    const campusLink = this.page.locator(`text=${campusName}`);
    await campusLink.waitFor({ state: "visible" });
    await campusLink.click();
    await expect(accountInfo).toBeVisible();
    await expect(accountInfo).toContainText(`${accountName} -`);
  }

  // Click on Menus link
  async clickMenus() {
    const editMenusLink = this.page.locator(
      'a[href*="/cafemanager/management/menus/1464230"].button.edit.menus'
    );
    await editMenusLink.waitFor({ state: "visible", timeout: 10000 });
    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      editMenusLink.click(),
    ]);
  }

  // Click Edit button of Special Menu
  async clickEditButtonOfSpecialMenu() {
    const editButton = this.page
      .locator("div.action.w15.flr a.small.button.edit")
      .first();
    await editButton.waitFor({ state: "visible", timeout: 10000 });
    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      editButton.click(),
    ]);
  }

  // Click Edit button of Static Menu
  async clickEditButtonOfStaticMenu() {
    const editButton = this.page
      .locator("div.action.w15.flr a.small.button.edit")
      .nth(1);
    await editButton.waitFor({ state: "visible", timeout: 10000 });
    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      editButton.click(),
    ]);
  }
}
