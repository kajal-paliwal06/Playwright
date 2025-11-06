import { Page, expect } from "@playwright/test";

export class AddStaticMenuPlates {
  constructor(private page: Page) {
    this.page = page;
  }

  // Method to wait for loader to disappear
  async waitForLoaderToDisappear() {
    const loader = this.page.locator("#loadingplate");
    // Wait until the loader is hidden, invisible, or not blocking clicks
    await this.page.waitForFunction(
      () => {
        const el = document.querySelector("#loadingplate");
        if (!el) return true; // removed from DOM
        const style = window.getComputedStyle(el);
        const isHidden =
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0" ||
          style.pointerEvents === "none";
        return isHidden;
      },
      { timeout: 15000 }
    );
  }
  // Add Static Entree in static menu

  // Clicks on the "+" icon to add a new static menu plate
  async clickPlusIconOnStaicMenu() {
    const addNewPlateButton = this.page
      .locator("img.add-new-item.imagedropshadow")
      .first();

    await addNewPlateButton.waitFor({ state: "visible", timeout: 10000 });
    await addNewPlateButton.scrollIntoViewIfNeeded();
    await addNewPlateButton.click();
  }

  // Clicks the "Static Entrée or Side" button and waits for the next page to load
  async clickStaticEntreeOption() {
    const staticEntreeButton = this.page.locator(
      'input.button.green.hover[value="Static Entrée or Side"]'
    );

    await staticEntreeButton.waitFor({ state: "visible", timeout: 10000 });

    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(`Click attempt ${attempt} on BYO button...`);
      await staticEntreeButton.click();
      await this.page.waitForTimeout(2000);

      const addPlateUI = this.page.locator("div.builder-list").first();
      if (await addPlateUI.isVisible()) {
        console.log("Add Plate UI loaded successfully!");
        return;
      }
      console.log("Add Plate UI not found yet. Retrying...");
    }
    throw new Error("Failed to open Add Plate UI after multiple attempts.");
  }

  // Adds multiple recipes in static entree menu from different categories and subcategories
  async addStaticEntreeRecipe(
    staticEntreeRecipes: {
      staicEntreeCategory: string;
      staicEntreeSubCategory: string;
      staicEntreeItemNames: string[];
    }[]
  ) {
    for (const recipe of staticEntreeRecipes) {
      const categoryArrow = this.page.locator("div.builder-list", {
        hasText: recipe.staicEntreeCategory,
      });
      await categoryArrow.waitFor({ state: "visible", timeout: 10000 });
      await this.waitForLoaderToDisappear();
      await categoryArrow.click();

      const subcatArrow = this.page.locator(
        `h4.panel-title:has-text("${recipe.staicEntreeSubCategory}") i.arrow-ss`
      );
      await subcatArrow.waitFor({ state: "visible", timeout: 10000 });
      await this.waitForLoaderToDisappear();
      await subcatArrow.click();

      for (const itemName of recipe.staicEntreeItemNames) {
        const item = this.page.locator(`span.hover:has-text("${itemName}")`);
        await item.waitFor({ state: "visible", timeout: 10000 });
        await item.scrollIntoViewIfNeeded();
        await this.waitForLoaderToDisappear();
        await item.click();
      }
    }

    // Selects the meal type "Breakfast"
    const breakfastLabel = this.page.locator("label.button.grey", {
      hasText: "Breakfast",
    });
    await breakfastLabel.click();

    // Fills the plate name
    const plateNameField = this.page.locator(
      'textarea[name="form-add-item-description"]'
    );
    await plateNameField.waitFor({ state: "visible", timeout: 10000 });
    await plateNameField.scrollIntoViewIfNeeded();
    await plateNameField.fill("Kp Static Entree plate multiple recipes");

    // Selects the sub station
    const subStationDropdown = this.page.locator(
      'select[name="sub_station_id"]'
    );
    await subStationDropdown.waitFor({ state: "visible", timeout: 10000 });
    const optionLocator = this.page.locator(
      'select[name="sub_station_id"] option',
      { hasText: "The rice pack" }
    );
    const optionValue = await optionLocator.getAttribute("value");
    await subStationDropdown.selectOption(optionValue);

    // Clicks the Save button
    const saveButton = this.page
      .locator("a.edit-item-submit-superplate.button.green")
      .first();
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
    await this.page
      .locator(".modal-loading2")
      .waitFor({ state: "hidden", timeout: 30000 });
  }

  // Scrolls to the light blue section after saving
  async scrollToLightBlueDiv() {
    console.log("Waiting for plate save and page to load...");

    // Wait for loader to disappear if visible
    const loader = this.page.locator(".modal-loading2");
    if (await loader.isVisible()) {
      console.log("Loader visible, waiting for it to disappear...");
      await loader.waitFor({ state: "hidden", timeout: 30000 });
    }

    // Wait for navigation (if triggered by save)
    await this.page.waitForLoadState("networkidle", { timeout: 30000 });
    console.log("Page load complete, searching for light blue div...");

    // Wait for the light blue div to appear
    const lightBlueSection = this.page.locator(
      'div[style*="background-color: lightblue;"][id^="station-superplate-"]'
    );
    await lightBlueSection.waitFor({ state: "visible", timeout: 30000 });
    await lightBlueSection.scrollIntoViewIfNeeded();
    console.log("Scrolled to the light blue station section");
  }

  // Add Bar recipe in Static Menu

  // Click the bar option
  async clickBarOption() {
    const barButton = this.page.locator(
      'input[name="builder_type"][data-builder_type="bar"]'
    );
    await barButton.waitFor({ state: "visible", timeout: 10000 });
    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(`Click attempt ${attempt} on Bar button...`);
      await barButton.click();
      await this.page.waitForTimeout(2000);

      const addPlateUI = this.page.locator("div.builder-list").first();
      if (await addPlateUI.isVisible()) {
        console.log("Add Plate UI loaded successfully!");
        return;
      }
      console.log("Add Plate UI not found yet. Retrying...");
    }
    throw new Error("Failed to open Add Plate UI after multiple attempts.");
  }

  // Adds recipes in Bar menu

  async addBarRecipe(
    barRecipes: {
      barCategory: string;
      barsubCategory: string;
      barItemNames: string[];
    }[]
  ) {
    // Clicks on the "+" icon to add a new static menu plate
    await this.clickPlusIconOnStaicMenu();

    // Clicks the "Bar" button and waits for the next page to load
    await this.clickBarOption();

    // Adds multiple recipes in Bar menu from different categories and subcategories

    for (const recipe of barRecipes) {
      const categoryArrow = this.page.locator("div.builder-list", {
        hasText: recipe.barCategory,
      });
      await categoryArrow.waitFor({ state: "visible", timeout: 10000 });
      await this.waitForLoaderToDisappear();
      await categoryArrow.click();

      const subcatArrow = this.page.locator(
        `h4.panel-title:has-text("${recipe.barsubCategory}") i.arrow-ss`
      );
      await subcatArrow.waitFor({ state: "visible", timeout: 10000 });
      await this.waitForLoaderToDisappear();
      await subcatArrow.click();

      for (const itemName of recipe.barItemNames) {
        const item = this.page.locator(`span.hover:has-text("${itemName}")`);
        await item.waitFor({ state: "visible", timeout: 10000 });
        await item.scrollIntoViewIfNeeded();
        await this.waitForLoaderToDisappear();
        await item.click();
      }
    }

    // Selects the meal type "Brunch"
    const brunchLabel = this.page.locator("label.button.grey", {
      hasText: "Brunch",
    });
    await brunchLabel.click();

    // Fills the plate name
    const plateNameField = this.page.locator(
      'textarea[name="form-add-item-description"]'
    );
    await plateNameField.waitFor({ state: "visible", timeout: 10000 });
    await plateNameField.scrollIntoViewIfNeeded();
    await plateNameField.fill("Kp Bar plate multiple recipes");

    // Clicks the Save button
    const saveButton = this.page
      .locator("a.edit-item-submit-superplate.button.green")
      .first();
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
    await this.page.waitForTimeout(10000);
  }

  // Click the BYO option

  async clickBYOOption() {
    const byoButton = this.page.locator(
      'input[name="builder_type"][data-builder_type="build"]'
    );

    console.log("Waiting for Build Your Own (Guest Options) button...");
    await byoButton.waitFor({ state: "visible", timeout: 15000 });

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Click attempt ${attempt} on Build Your Own button...`);
        await byoButton.scrollIntoViewIfNeeded();
        await byoButton.hover();
        await byoButton.click({ force: true });

        // Wait for UI to respond (new buttons to load)
        const guestChooseAllButton = this.page.locator(
          'input[name="builder_type"][data-builder_type="pure"][value="Guest will choose ALL components"]'
        );

        const uiLoaded = await guestChooseAllButton
          .waitFor({ state: "visible", timeout: 8000 })
          .then(() => true)
          .catch(() => false);

        if (uiLoaded) {
          console.log("UI loaded successfully after clicking BYO!");
          return;
        } else {
          console.log("UI not loaded yet. Retrying click...");
        }
      } catch (err) {
        console.log(`Attempt ${attempt} failed: ${err}`);
      }

      // Small delay before next try
      await this.page.waitForTimeout(1500);
    }

    throw new Error(
      "Failed to load UI after clicking Build Your Own (Guest Options)"
    );
  }

  // Click the Full Guest option of BYO

  async clickPureBuilderOption() {
    const pureButton = this.page.locator(
      'input[name="builder_type"][data-builder_type="pure"][value="Guest will choose ALL components"]'
    );
    await pureButton.waitFor({ state: "visible", timeout: 10000 });
    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(
        `Attempt ${attempt}: clicking 'Guest will choose ALL components'...`
      );
      await pureButton.click();
      await this.page.waitForTimeout(2000);

      const addPlateUI = this.page.locator("div.builder-list").first();
      if (await addPlateUI.isVisible()) {
        console.log(
          "Add Plate UI loaded successfully after clicking Pure Builder."
        );
        return;
      }
      console.log("UI not loaded yet, retrying...");
    }
    throw new Error(
      "Failed to open Add Plate UI after clicking 'Guest will choose ALL components'."
    );
  }

  // Adds Full guest recipe in BYO

  async addBYOFullGuestRecipe(
    byoRecipes: {
      byoCategory: string;
      byosubCategory: string;
      byoItemNames: string[];
    }[]
  ) {
    // Clicks on the "+" icon to add a new static menu plate
    await this.clickPlusIconOnStaicMenu();

    // Clicks the "BYO" button
    await this.clickBYOOption();

    // Clicks FULL GUEST OPTIONS
    await this.clickPureBuilderOption();

    // Adds multiple recipes in Bar menu from different categories and subcategories

    for (const recipe of byoRecipes) {
      const categoryArrow = this.page.locator("div.builder-list", {
        hasText: recipe.byoCategory,
      });
      await categoryArrow.waitFor({ state: "visible", timeout: 10000 });
      await categoryArrow.click();

      const subcatArrow = this.page.locator(
        `h4.panel-title:has-text("${recipe.byosubCategory}") i.arrow-ss`
      );
      await subcatArrow.waitFor({ state: "visible", timeout: 10000 });
      await subcatArrow.click();

      for (const itemName of recipe.byoItemNames) {
        const item = this.page.locator(`span.hover:has-text("${itemName}")`);
        await item.waitFor({ state: "visible", timeout: 10000 });
        await item.scrollIntoViewIfNeeded();
        await this.waitForLoaderToDisappear();
        await item.click();
      }
    }

    // Selects the meal type "Lunch"
    const lunchLabel = this.page.locator("label.button.grey", {
      hasText: "Lunch",
    });
    await lunchLabel.click();

    // Fills the plate name
    const nameInput = this.page.locator('input[name="no-recipe-item-name"]');
    await nameInput.waitFor({ state: "visible", timeout: 10000 });
    await nameInput.scrollIntoViewIfNeeded();
    await nameInput.fill("Kp BYO full guest plate");

    // Fills the price
    const priceInput = this.page.locator(
      'input[name="no-recipe-item-price"].item-price'
    );
    await priceInput.waitFor({ state: "visible", timeout: 10000 });
    await priceInput.scrollIntoViewIfNeeded();
    await priceInput.fill("9.99");

    // Selects the sub station
    const subStationDropdown = this.page.locator(
      'select[name="sub_station_id"]'
    );
    await subStationDropdown.waitFor({ state: "visible", timeout: 10000 });

    const optionLocator = this.page
      .locator('select[name="sub_station_id"] option', {
        hasText: "grill sides",
      })
      .first();
    const optionValue = await optionLocator.getAttribute("value");
    await subStationDropdown.selectOption(optionValue);

    // Clicks the Save button
    const saveButton = this.page
      .locator("a.edit-item-submit-superplate.button.green")
      .first();
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
  }
  // Click the Full Guest option of BYO

  async clickSomeBuilderOption() {
    const someButton = this.page.locator(
      'input[name="builder_type"][data-builder_type="hybrid"][value="Chef chooses BASE items, Guest chooses SOME components"]'
    );
    await someButton.waitFor({ state: "visible", timeout: 10000 });
    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(
        `Attempt ${attempt}: clicking 'Chef chooses BASE items, Guest chooses SOME components'...`
      );
      await someButton.click();
      await this.page.waitForTimeout(2000);

      const addPlateUI = this.page.locator("div.builder-list").first();
      if (await addPlateUI.isVisible()) {
        console.log(
          "Add Plate UI loaded successfully after clicking Pure Builder."
        );
        return;
      }
      console.log("UI not loaded yet, retrying...");
    }
    throw new Error(
      "Failed to open Add Plate UI after clicking 'Guest will choose ALL components'."
    );
  }

  // Add Some Guest plate in BYO

  async addBYOSomeGuestRecipe(
    byoRecipes: {
      byoCategory: string;
      byosubCategory: string;
      byoItemNames: string[];
    }[]
  ) {
    // Clicks on the "+" icon to add a new static menu plate
    await this.clickPlusIconOnStaicMenu();

    // Clicks the "BYO" button
    await this.clickBYOOption();

    // Clicks FULL GUEST OPTIONS
    await this.clickSomeBuilderOption();

    // Adds multiple recipes in Bar menu from different categories and subcategories

    for (const recipe of byoRecipes) {
      const categoryArrow = this.page.locator("div.builder-list", {
        hasText: recipe.byoCategory,
      });
      await categoryArrow.waitFor({ state: "visible", timeout: 10000 });
      await categoryArrow.click();

      const subcatArrow = this.page.locator(
        `h4.panel-title:has-text("${recipe.byosubCategory}") i.arrow-ss`
      );
      await subcatArrow.waitFor({ state: "visible", timeout: 10000 });
      await subcatArrow.click();

      for (const itemName of recipe.byoItemNames) {
        const item = this.page.locator(`span.hover:has-text("${itemName}")`);
        await item.waitFor({ state: "visible", timeout: 10000 });
        await item.scrollIntoViewIfNeeded();
        await this.waitForLoaderToDisappear();
        await item.click();
      }
    }

    // Selects the meal type "Dinner"
    const dinnerLabel = this.page.locator("label.button.grey", {
      hasText: "Dinner",
    });
    await dinnerLabel.click();

    // Selects the sub station
    const subStationDropdown = this.page.locator(
      'select[name="sub_station_id"]'
    );
    await subStationDropdown.waitFor({ state: "visible", timeout: 10000 });

    const optionLocator = this.page
      .locator('select[name="sub_station_id"] option', {
        hasText: "grill sides",
      })
      .first();
    const optionValue = await optionLocator.getAttribute("value");
    await subStationDropdown.selectOption(optionValue);

    // Clicks the Save button
    const saveButton = this.page
      .locator("a.edit-item-submit-superplate.button.green")
      .first();
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
  }
}
