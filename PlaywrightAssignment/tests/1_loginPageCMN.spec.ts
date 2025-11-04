import { test } from "@playwright/test";
import { LoginPageCMN } from "../page-objects/loginPageCMN";

test("login into CMN", async ({ page }) => {
  const loginPage = new LoginPageCMN(page);

  await loginPage.goto();
  await loginPage.login("99304153", "123bamco");
});
