import { Page, expect } from "@playwright/test";

export class AddPlatePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Add Recipe plate in Special Menu

  async clickPlusIconToAddItem(dayDate: string, stationId: string) {
    const cellLocator = this.page.locator(`#td-${stationId}-1`);
    await cellLocator.hover();
    await this.page.waitForTimeout(1000);

    const addIcon = this.page
      .locator(
        `img.add-new-item.imagedropshadow[data-day_date="${dayDate}"][data-station_id="${stationId}"][title="Add item"]:visible`
      )
      .first();

    const isVisible = await addIcon.isVisible();
    console.log("Plus icon visible:", isVisible);
    if (!isVisible) {
      console.log("Retrying hover and force click...");
      await cellLocator.hover();
      await this.page.waitForTimeout(1000);
      await addIcon.click({ force: true });
    } else {
      await addIcon.click();
    }
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  }

  async addRecipePlate(itemName: string) {
    const addAnEntreeButton = this.page.locator("#eni-plate-add-entree-item");

    await addAnEntreeButton.waitFor({ state: "visible", timeout: 15000 });
    await addAnEntreeButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000);
    try {
      await addAnEntreeButton.click({ timeout: 5000 });
    } catch (e) {
      console.log("First click failed, retrying with force...");
      await this.page.waitForTimeout(1000);
      await addAnEntreeButton.click({ force: true });
    }

    await this.page.waitForLoadState("load", { timeout: 60000 });
    await this.page.waitForTimeout(2000);

    const searchBox = this.page.locator("#search-text-id");
    await searchBox.waitFor({ state: "visible", timeout: 40000 });
    await searchBox.fill(itemName);

    const searchButton = this.page.getByRole("link", { name: /^Search$/i });
    await searchButton.click();

    const resultItem = this.page
      .getByRole("link", { name: new RegExp(itemName, "i") })
      .first();
    await resultItem.waitFor({ state: "visible", timeout: 30000 });
    await resultItem.click();

    const addToPlate = this.page.getByRole("link", { name: /Add to Plate/i });
    await addToPlate.waitFor({ state: "visible", timeout: 15000 });
    await addToPlate.click();
    await this.page.getByText("Lunch", { exact: true }).click();

    const saveButton = this.page
      .locator("#subnavigation")
      .getByRole("link", { name: /^save$/i });
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.click();
    await this.page.waitForTimeout(5000);
  }

  // Add Non Recipe plate in special menu

  async clickNIconToAddItem(dayDate: string, stationId: string) {
    const cellLocator = this.page.locator(`#td-${stationId}-1`);
    await cellLocator.hover();
    await this.page.waitForTimeout(1000);

    const noRecipeAddIcon = this.page
      .locator(
        `img.add-new-item.imagedropshadow[data-day_date="${dayDate}"][data-station_id="${stationId}"][data-eni_item="0"][title="Add no-recipe item"]:visible`
      )
      .first();

    const isVisible = await noRecipeAddIcon.isVisible();
    console.log("No-recipe icon visible:", isVisible);

    if (!isVisible) {
      console.log("Retrying hover and force click...");
      await cellLocator.hover();
      await this.page.waitForTimeout(1000);
      await noRecipeAddIcon.click({ force: true });
    } else {
      await noRecipeAddIcon.click();
    }
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  }

  async addNonRecipePlate() {
    const plateNameTextarea = this.page.locator(
      "textarea#form-add-item-description-"
    );
    await plateNameTextarea.waitFor({ state: "visible", timeout: 10000 });
    await plateNameTextarea.click();
    await plateNameTextarea.fill("Testing non recipe plate name");

    const addSideButton = this.page.locator(
      "a.button.green.flr.add-plate-side"
    );
    await addSideButton.waitFor({ state: "visible", timeout: 10000 });
    await addSideButton.click();

    const sideNameTextarea = this.page.locator("#side-name-0");
    await sideNameTextarea.click();
    await sideNameTextarea.fill("Side item in Non Recipe Plate");

    const breakfastLabel = this.page.locator(
      'label[for="formadditemmealtype1"]'
    );
    await breakfastLabel.waitFor({ state: "visible", timeout: 10000 });
    await breakfastLabel.click();

    const veganLabel = this.page.locator(
      'label[for="form-add-item-option--4"]'
    );
    await veganLabel.waitFor({ state: "visible", timeout: 10000 });
    await veganLabel.scrollIntoViewIfNeeded();
    await veganLabel.click();

    const seafoodWatchLabel = this.page.locator(
      'label[for="form-add-item-option--3"]'
    );
    await seafoodWatchLabel.waitFor({ state: "visible", timeout: 10000 });
    await seafoodWatchLabel.scrollIntoViewIfNeeded();
    await seafoodWatchLabel.click();

    const peanutLabel = this.page.locator(
      'label[for="form-add-item-option--253"]'
    );
    await peanutLabel.waitFor({ state: "visible", timeout: 10000 });
    await peanutLabel.click();

    const saveButton = this.page
      .locator("#subnavigation")
      .getByRole("link", { name: /^save$/i });
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.click();
    await this.page.waitForTimeout(5000);
  }
}
