import { test } from "@playwright/test";
import { LoginPageCMN } from "../page-objects/loginPageCMN";
import { MenusPage } from "../page-objects/menusPage";
import { AddStaticMenuPlates } from "../page-objects/addPlatesInStaicMenu";

test("login and add plates in static menu", async ({ page }) => {
  const loginPage = new LoginPageCMN(page);
  const menusPage = new MenusPage(page);
  const addStaticMenuPlate = new AddStaticMenuPlates(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login("99304153", "123bamco");

  // Step 2: Go to Newput Account
  await menusPage.selectAccount("Newput", "Newput First Campus");

  // Step 3: Click "Menus"
  await menusPage.clickMenus();

  // Step 4: Click on "Edit button" on static menu page
  await menusPage.clickEditButtonOfStaticMenu();

  // Step 5: Add plate in Static Entree in Static menu
  await addStaticMenuPlate.clickPlusIconOnStaicMenu();
  await addStaticMenuPlate.clickStaticEntreeOption();
  await addStaticMenuPlate.addStaticEntreeRecipe([
    {
      staicEntreeCategory: "cereals and granolas",
      staicEntreeSubCategory: "cereals cold",
      staicEntreeItemNames: ["cereal Bran Flakes", "cereal Cheerios"],
    },
    /* {
      staicEntreeCategory: "beans and legumes",
      staicEntreeSubCategory: "beans and legumes cooked",
      staicEntreeItemNames: ["beans kidney (canned)", "crispy chickpeas"],
    },
    {
      staicEntreeCategory: "fruits",
      staicEntreeSubCategory: "fruits raw",
      staicEntreeItemNames: ["avocado"],
    }, */
  ]);
  await addStaticMenuPlate.scrollToLightBlueDiv();

  // Step 6: Add plate in Bar in Static menu
  await addStaticMenuPlate.addBarRecipe([
    {
      barCategory: "proteins",
      barsubCategory: "egg",
      barItemNames: ["egg hard-boiled", "quail egg"],
    },
    /* {
      barCategory: "bread, tortillas and flatbread",
      barsubCategory: "breakfast bread",
      barItemNames: ["English muffin whole wheat", "bagel multigrain"],
    },
    {
      barCategory: "sushi",
      barsubCategory: "sushi rolls",
      barItemNames: ["salmon avocado sushi roll (brown rice)"],
    },
    {
      barCategory: "sauces, spreads and condiments",
      barsubCategory: "pickled",
      barItemNames: ["giardiniera", "olive green", "sweet pickle relish"],
    }, */
  ]);
  //await addStaticMenuPlate.scrollToLightBlueDiv();

  // Step 7: Add plate in BYO - FULL GUEST OPTIONS in Static menu
  await addStaticMenuPlate.addBYOFullGuestRecipe([
    {
      byoCategory: "beverages",
      byosubCategory: "fruit juices",
      byoItemNames: ["juice pineapple"],
    },
    {
      byoCategory: "nuts, seeds and toppings",
      byosubCategory: "nuts and seeds",
      byoItemNames: ["almonds", "pine nuts", "walnuts candied"],
    },
  ]);
  await addStaticMenuPlate.scrollToLightBlueDiv();

  // Step 8: Add plate in BYO - Some GUEST OPTIONS in Static menu
  await addStaticMenuPlate.addBYOSomeGuestRecipe([
    {
      byoCategory: "beverages",
      byosubCategory: "water and house-made lemonade",
      byoItemNames: ["lemonade house-made", "carbonated water"],
    },
    {
      byoCategory: "sweet and salty snacks",
      byosubCategory: "crackers",
      byoItemNames: ["Cheez-It Whole Grain"],
    },
  ]);
  await addStaticMenuPlate.scrollToLightBlueDiv();
});
