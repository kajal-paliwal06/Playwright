import { test } from "@playwright/test";
import { LoginPageCMN } from "../page-objects/loginPageCMN";
import { MenusPage } from "../page-objects/menusPage";
import { CloningInDiffAccount } from "../page-objects/cloningInDiffAccount";

test("login and clone the items into different account", async ({ page }) => {
  const loginPage = new LoginPageCMN(page);
  const menusPage = new MenusPage(page);
  const cloningInDiffAccount = new CloningInDiffAccount(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login("99304153", "123bamco");

  // Step 2: Go to Newput Account
  await menusPage.selectAccount("Newput", "Newput First Campus");

  // Step 3: Click "Menus"
  await menusPage.clickMenus();

  // Step 4: Click on "Edit button" on menus page
  await menusPage.clickEditButtonOfSpecialMenu();

  // Case 1: Cloning at item level in different account and cafe
  await cloningInDiffAccount.cloneAtItemLevelInDiffAccAndCafe(
    "stuffed sole fish fillet, paneer, tomato chipotle sauce",
    "Newput Test Account",
    "Cafe 1",
    "Chinese",
    "2025-11-03"
  );

  // Case 2: Cloning at station level in different account and cafe
  await cloningInDiffAccount.cloneAtStationLevelInDiffAccAddCafe(
    "27139",
    "Newput Test Account",
    "Cafe 1",
    "Chinese",
    "2025-11-03"
  );
});
