import { test } from "@playwright/test";
import { LoginPageCMN } from "../page-objects/loginPageCMN";
import { MenusPage } from "../page-objects/menusPage";

test("login and click Menus", async ({ page }) => {
  const loginPage = new LoginPageCMN(page);
  const menusPage = new MenusPage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login("99304153", "123bamco");

  // Step 2: Go to Newput Account
  await menusPage.selectAccount("Newput", "Newput First Campus");

  // Step 2: Click "Menus"
  await menusPage.clickMenus();

  // Step 3: Click on "Edit button" on menus page
  await menusPage.clickEditButtonOfSpecialMenu();
});
