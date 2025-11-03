import { test } from "@playwright/test";
import { LoginPageMosaic } from "../page-objects/loginPageMosaic";

test("login into Mosaic", async ({ page }) => {
  const loginPageMosaic = new LoginPageMosaic(page);

  await loginPageMosaic.goto();
  await loginPageMosaic.login("kajal@newput.com", "bamco123");
  await loginPageMosaic.verifyLoginSuccess();
});
