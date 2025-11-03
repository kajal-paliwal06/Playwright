import { test } from "@playwright/test";
import { LoginPageCMN } from "../page-objects/loginPageCMN";
import { MenusPage } from "../page-objects/menusPage";
import { AddPlatePage } from "../page-objects/addPlatesInSpecialMenu";

test("login and add special plate", async ({ page }) => {
  const loginPage = new LoginPageCMN(page);
  const menusPage = new MenusPage(page);
  const addPlatePage = new AddPlatePage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login("99304153", "123bamco");

  // Step 2: Go to Newput Account
  await menusPage.selectAccount("Newput", "Newput First Campus");

  // Step 2: Click "Menus"
  await menusPage.clickMenus();

  // Step 3: Click on "Edit button" on menus page
  await menusPage.clickEditButtonOfSpecialMenu();

  // Step 4: Click on plus icon to add recipe plate in special menu
  await addPlatePage.clickPlusIconToAddItem("2025-10-27", "27139");
  await addPlatePage.addRecipePlate("stuffed sole fish fillet");

  // Step 5: Click on N icon to add non recipe plate in special menu
  await addPlatePage.clickNIconToAddItem("2025-10-27", "27139");
  await addPlatePage.addNonRecipePlate();
});
