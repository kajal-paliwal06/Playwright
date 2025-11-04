import { test } from "@playwright/test";
import { LoginPageCMN } from "../page-objects/loginPageCMN";
import { MenusPage } from "../page-objects/menusPage";
import { CloningInSameAccount } from "../page-objects/cloningInSameAccount";

test.only("login and clone the items into same account", async ({ page }) => {
  const loginPage = new LoginPageCMN(page);
  const menusPage = new MenusPage(page);
  const cloningInSameAccount = new CloningInSameAccount(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login("99304153", "123bamco");

  // Step 2: Go to Newput Account
  await menusPage.selectAccount("Newput", "Newput First Campus");

  // Step 3: Click "Menus"
  await menusPage.clickMenus();

  // Step 4: Click on "Edit button" on menus page
  await menusPage.clickEditButtonOfSpecialMenu();

  // Case 1: Cloning at item level in same account, campus, cafe and station
  await cloningInSameAccount.hoverOnMenuItemByName(
    "stuffed sole fish fillet, paneer, tomato chipotle sauce"
  );
  await cloningInSameAccount.clickCloneIconByName(
    "stuffed sole fish fillet, paneer, tomato chipotle sauce"
  );
  await cloningInSameAccount.selectDateAndClone("2025-11-04");

  // Case 2: Cloning at item level in same account, same cafe but different station
  await cloningInSameAccount.cloneAtItemLevelInSameAccCamCafeButDiffStation(
    "stuffed sole fish fillet, paneer, tomato chipotle sauce",
    "Global",
    "2025-11-03"
  );

  // Case 3: Cloning at day level in same account, campus and cafe
  await cloningInSameAccount.clickCloneDayIconInSameAccCamCafe(
    "2025-11-03",
    "2025-11-04"
  );

  // Case 4: Cloning at station level in same account, campus, cafe but different station
  await cloningInSameAccount.cloneAtStationLevelInSameAccCamCafeButDiffStation(
    "27139",
    "Grill",
    "2025-11-03"
  );

  // Case 5: Cloning at week level in same account, campus and cafe
  await cloningInSameAccount.cloneAtWeekLevelInSameAccCamCafe("2025-11-10");

  // Case 6: Cloning at item level in same account, campus but in different cafes
  await cloningInSameAccount.cloneAtItemLevelInSameAccAndCamButDiffCafe(
    "stuffed sole fish fillet, paneer, tomato chipotle sauce",
    "Kajal's Cafe",
    "Indian",
    "2025-11-03"
  );

  // Case 7: Cloning at station level in same account, campus but in different cafe
  await cloningInSameAccount.cloneAtStationLevelInSameAccAndCamButDiffCafe(
    "27139",
    "Kajal's Cafe",
    "Indian",
    "2025-11-03"
  );

  // Case 8: Cloning at item level in same account but in different campus and cafe
  await cloningInSameAccount.cloneAtItemLevelInSameAccButDiffCamAndCafe(
    "stuffed sole fish fillet, paneer, tomato chipotle sauce",
    "Sandbox Cafe",
    "Salad",
    "2025-11-03"
  );

  // Case 9: Cloning at station level in same account but in different campus and cafe
  await cloningInSameAccount.cloneAtStationLevelInSameAccButDiffCamAndCafe(
    "27139",
    "Sandbox Cafe",
    "Salad",
    "2025-11-03"
  );
});
