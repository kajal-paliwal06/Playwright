import { Page, expect } from "@playwright/test";

export class CloningInSameAccount {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Case 1: Cloning at item level in same account, same cafe and same station

  async hoverOnMenuItemByName(itemName: string) {
    // Log the start of the cloning process for traceability
    console.log("Clone at item level in same account, same cafe and station");

    const menuItem = this.page
      .locator(`div.menu-item-description:has-text("${itemName}")`)
      .first();
    await menuItem.waitFor({ state: "visible", timeout: 10000 });
    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.hover();
  }

  async clickCloneIconByName(itemName: string) {
    const itemSection = this.page
      .locator(
        `xpath=//div[contains(@class,'menu-item-description') and contains(., "${itemName}")]`
      )
      .first();
    await itemSection.scrollIntoViewIfNeeded();
    await itemSection.hover();

    const cloneIcon = itemSection.locator(
      `xpath=ancestor::div[contains(@class,'menu-item') or contains(@class,'item')]
        //img[contains(@class,'clone-item-anchor') and @title="Clone this item"]`
    );
    await cloneIcon.first().scrollIntoViewIfNeeded();
    await cloneIcon.first().click({ force: true });
    console.log(`Clicked clone icon for: ${itemName}`);
  }

  async selectDateAndClone(targetDate: string) {
    const popup = this.page.locator("#clone-item-helper");
    await popup.waitFor({ state: "visible", timeout: 15000 });

    const dropdown = popup.locator("#item_cloned_date");
    await dropdown.waitFor({ state: "visible", timeout: 10000 });
    await dropdown.selectOption({ value: targetDate });

    const cloneBtn = popup.locator(".save_cloned_item");
    await cloneBtn.waitFor({ state: "visible", timeout: 10000 });
    await cloneBtn.click();

    const confirmYes = this.page.locator(".ui-button-text", { hasText: "Yes" });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
    }

    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 50000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(3000);
    console.log("Clone successful for item:", targetDate);
  }

  // Case 2: Cloning at item level in same account, same cafe but different station

  async cloneAtItemLevelInSameAccCamCafeButDiffStation(
    itemName: string,
    stationName: string,
    targetDate: string
  ) {
    // Log the start of the cloning process for traceability
    console.log(
      "Clone at item level in same account, same cafe but different station"
    );
    await this.hoverOnMenuItemByName(itemName);
    await this.clickCloneIconByName(itemName);

    const popup = this.page.locator("#clone-item-helper");
    await popup.waitFor({ state: "visible", timeout: 15000 });

    const stationDropdown = this.page.locator("#clone_to_station_id").first();
    await stationDropdown.waitFor({ state: "visible", timeout: 10000 });
    await stationDropdown.selectOption({ label: stationName });
    await expect(stationDropdown).toHaveValue("27142");
    await this.page.waitForTimeout(3000);

    const dropdown = popup.locator("#item_cloned_date");
    await dropdown.waitFor({ state: "visible", timeout: 10000 });
    await dropdown.selectOption({ value: targetDate });

    const cloneBtn = popup.locator(".save_cloned_item");
    await cloneBtn.waitFor({ state: "visible", timeout: 10000 });
    await cloneBtn.click();

    const confirmYes = this.page.locator(".ui-button-text", { hasText: "Yes" });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
    }

    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(3000);
    console.log("Clone successful for item:", targetDate);
  }

  // Case 3: Cloning at day level in same account, campus and cafe

  async clickCloneDayIconInSameAccCamCafe(date: string, targetDate: string) {
    // Log the start of the cloning process for traceability
    console.log("Clone at day level in same account, campus and cafe");
    const cloneDayIcon = this.page.locator(
      `img.clone-day-anchor.imagedropshadow.day-actions[title="Clone this day"][id^="clone-day-${date}"]`
    );
    await cloneDayIcon.waitFor({ state: "visible", timeout: 10000 });
    await cloneDayIcon.click();

    // --- Wait for the clone day dialog to appear before interacting with its elements ---
    const cloneDayPopup = this.page.locator("#clone-day-helper");
    await cloneDayPopup.waitFor({ state: "visible", timeout: 15000 });

    // Locate the dropdown for selecting the target date
    const dropdown = this.page.locator("#cloned_date").first();
    await dropdown.waitFor({ state: "visible", timeout: 20000 });

    // For debugging: log the available options in the dropdown
    console.log(
      "Dropdown HTML:",
      await this.page.locator("#cloned_date").innerHTML()
    );

    // Select the target date from the dropdown
    await dropdown.selectOption(targetDate);

    // Select the "merge" option to combine menus
    const mergeRadioCheck = this.page.getByRole("radio", {
      name: "merge both menus together",
    });
    await mergeRadioCheck.check();

    // Locate and click the final clone button to submit the action
    const cloneButton = this.page.locator(
      "a.button.small.green.save_cloned_day"
    );
    await cloneButton.waitFor({ state: "visible", timeout: 10000 });
    await cloneButton.click();

    // If a confirmation dialog appears, click "Yes"
    const confirmYes = this.page.locator(".ui-button-text", { hasText: "Yes" });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
    }

    // Verify that the success message appears, confirming the clone was successful
    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    console.log("Clone successful and UI updated");
  }

  // Case 4: Cloning at station level in same account, campus, cafe but different station

  async cloneAtStationLevelInSameAccCamCafeButDiffStation(
    stationId: string,
    targetStation: string,
    targetWeek: string
  ) {
    // Log start of the station-level cloning operation
    console.log(
      `Clone at station level in same account, campus, cafe but different station`
    );

    const cloneStationIcon = this.page.locator(
      `img.clone-station-anchor.imagedropshadow[title="Clone station's weekly menu"][data-station_id="${stationId}"]`
    );
    await cloneStationIcon.waitFor({ state: "visible", timeout: 10000 });
    await cloneStationIcon.click();

    const stationDropdown = this.page
      .locator("#clone-station-helper select#clone_to_station_id")
      .first();

    const weekDropdown = this.page.locator("#cloned_week_date").first();
    await Promise.all([
      stationDropdown.waitFor({ state: "visible", timeout: 10000 }),
      weekDropdown.waitFor({ state: "visible", timeout: 10000 }),
    ]);
    await stationDropdown.selectOption({ label: targetStation });
    await weekDropdown.selectOption(targetWeek);

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_week")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 10000 });
    await cloneButton.click();

    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
    }

    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(5000);

    console.log("Station menu cloned successfully and UI updated");
  }

  // Case 5: Cloning at week level in same account, campus and cafe

  async cloneAtWeekLevelInSameAccCamCafe(targetWeek: string) {
    // Log start of the week-level cloning operation
    console.log("Clone at week level in same account, campus and cafe");

    const cloneWeekBtn = this.page.locator("a.button.grey.clone-week-anchor");
    await cloneWeekBtn.waitFor({ state: "visible", timeout: 15000 });
    await cloneWeekBtn.scrollIntoViewIfNeeded();
    await cloneWeekBtn.click();

    const weekDropdown = this.page.locator("#cloned_week_date").first();
    await weekDropdown.waitFor({ state: "visible", timeout: 15000 });
    await weekDropdown.selectOption(targetWeek);
    await expect(weekDropdown).toHaveValue(targetWeek);
    await this.page.waitForTimeout(2000);

    const mergeRadio = this.page.locator("#merge-week").first();
    if (await mergeRadio.isVisible()) {
      await mergeRadio.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await mergeRadio.click({ force: true });
      console.log("Merge radio clicked successfully");
    } else {
      console.log("No merge option visible — continuing");
    }

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_week")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 15000 });
    await cloneButton.click();
    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible({ timeout: 5000 }).catch(() => false)) {
      await confirmYes.click();
    }
    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    console.log(`Weekly menu successfully cloned to week: ${targetWeek}`);
    await this.page.waitForTimeout(3000);
    const prevWeekButton = this.page.locator(
      'img.select-week.imagedropshadow[title="Go to previous week"]'
    );
    await prevWeekButton.waitFor({ state: "visible", timeout: 10000 });
    await prevWeekButton.click();
    await this.page.waitForTimeout(5000);
  }

  // Case 6: Cloning at item level in same account, campus but in different cafe
  async cloneAtItemLevelInSameAccAndCamButDiffCafe(
    itemName: string,
    cafeName: string,
    stationName: string,
    dateValue: string
  ) {
    // Log start of the item-level cloning operation
    console.log(
      "Clone at item level in same account, campus but in different cafe"
    );

    await this.hoverOnMenuItemByName(itemName);
    await this.clickCloneIconByName(itemName);
    console.log("Clone popup opened");

    // --- Select Cafe ---
    const cafeDropdown = this.page.locator("#clone_to_cafe_id").first();
    await cafeDropdown.waitFor({ state: "visible", timeout: 15000 });
    await cafeDropdown.selectOption(cafeName);
    await expect(cafeDropdown).toHaveValue("1464502");
    console.log(`Cafe selected: ${cafeName}`);

    // --- Select Station ---
    const stationDropdown = this.page.locator("#clone_to_station_id").first();
    await stationDropdown.waitFor({ state: "visible", timeout: 15000 });
    await stationDropdown.selectOption({ label: stationName });
    await expect(stationDropdown).toHaveValue("33421");
    console.log(`Station selected: ${stationName}`);
    await this.page.waitForTimeout(3000);

    // --- Select Date ---
    const dateDropdown = this.page.locator("#item_cloned_date").first();
    await dateDropdown.waitFor({ state: "visible", timeout: 30000 });
    await dateDropdown.selectOption(dateValue);
    console.log(`Date selected: ${dateValue}`);

    // --- Click Clone ---
    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_item")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 15000 });
    await cloneButton.click();
    console.log("Clone button clicked");

    // --- Merge Option (if present) ---
    const mergeRadio = this.page.locator("#merge-week").first();
    if (await mergeRadio.isVisible().catch(() => false)) {
      await mergeRadio.scrollIntoViewIfNeeded();
      await mergeRadio.click({ force: true });
      console.log("Merge radio clicked successfully");
    } else {
      console.log("Merge option not visible — continuing");
    }

    // --- Confirmation Dialog ---
    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible().catch(() => false)) {
      await confirmYes.click();
      console.log("Confirmation clicked");
    }

    // --- Wait for Success Message ---
    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 50000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(3000);
  }

  // Case 7: Cloning at station level in same account, campus but in different cafe
  async cloneAtStationLevelInSameAccAndCamButDiffCafe(
    stationId: string,
    targetCafe: string,
    targetStation: string,
    targetWeek: string
  ) {
    // Log start of the station-level cloning operation
    console.log(
      "Clone at station level in same account, campus but in different cafe"
    );
    const cloneStationIcon = this.page.locator(
      `img.clone-station-anchor.imagedropshadow[title="Clone station's weekly menu"][data-station_id="${stationId}"]`
    );

    await this.page.waitForLoadState("networkidle");
    await cloneStationIcon.waitFor({ state: "visible", timeout: 30000 });
    await cloneStationIcon.scrollIntoViewIfNeeded();
    await cloneStationIcon.click({ force: true });
    console.log("Clone icon clicked");

    const cafeDropdown = this.page.locator("#clone_to_cafe_id").first();
    await cafeDropdown.waitFor({ state: "visible", timeout: 10000 });
    await cafeDropdown.selectOption({ label: targetCafe });
    console.log("Café selected:", targetCafe);

    // Wait for dropdown options to load before selecting
    const stationDropdown = this.page.locator("#clone_to_station_id").first();
    await stationDropdown.waitFor({ state: "visible", timeout: 15000 });

    // Wait until at least 1 real option (not default) appears
    await this.page.waitForFunction(
      () => {
        const dropdown = document.querySelector("#clone_to_station_id");
        return dropdown && dropdown.querySelectorAll("option").length > 1;
      },
      { timeout: 30000 }
    );

    await stationDropdown.selectOption({ label: targetStation });
    console.log("Station selected:", targetStation);

    const weekDropdown = this.page.locator("#cloned_week_date").first();
    await weekDropdown.waitFor({ state: "visible", timeout: 10000 });
    await weekDropdown.selectOption(targetWeek);
    console.log("Week selected:", targetWeek);

    // Handle merge radio button if shown
    const mergeRadio = this.page.locator("#merge-week").first();
    if (await mergeRadio.isVisible()) {
      await mergeRadio.scrollIntoViewIfNeeded();
      await mergeRadio.click({ force: true });
      console.log("Merge option clicked");
    } else {
      console.log("Merge option not visible, continuing");
    }

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_week")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 10000 });
    await cloneButton.click();
    console.log("Clone button clicked");

    // Confirm popup
    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
      console.log("Confirmed clone");
    }

    // Verify success message
    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    console.log("Station menu cloned successfully!");
  }

  // Case 8: Cloning at item level in same account but in different campus and cafe
  async cloneAtItemLevelInSameAccButDiffCamAndCafe(
    itemName: string,
    cafeName: string,
    stationName: string,
    dateValue: string
  ) {
    // Log start of the item-level cloning operation
    console.log(
      "Clone at item level in same account but in different campus and cafe"
    );
    await this.hoverOnMenuItemByName(itemName);
    await this.clickCloneIconByName(itemName);

    const cafeDropdown = this.page.locator("#clone_to_cafe_id").first();
    await cafeDropdown.waitFor({ state: "visible", timeout: 10000 });
    await cafeDropdown.selectOption(cafeName);
    await expect(cafeDropdown).toHaveValue("1464049");
    await this.page.waitForTimeout(3000);

    const stationDropdown = this.page.locator("#clone_to_station_id").first();
    await stationDropdown.waitFor({ state: "visible", timeout: 10000 });
    await stationDropdown.selectOption({ label: stationName });
    await expect(stationDropdown).toHaveValue("33722");
    await this.page.waitForTimeout(3000);

    const dateDropdown = this.page.locator("#item_cloned_date").first();
    await dateDropdown.waitFor({ state: "visible", timeout: 10000 });
    await dateDropdown.selectOption(dateValue);

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_item")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 15000 });
    await cloneButton.click();

    const mergeRadio = this.page.locator("#merge-week").first();
    if (await mergeRadio.isVisible()) {
      await mergeRadio.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await mergeRadio.click({ force: true });
      console.log("Merge radio clicked successfully");
    } else {
      console.log("No merge option visible — continuing");
    }

    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible({ timeout: 5000 }).catch(() => false)) {
      await confirmYes.click();
    }
    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(3000);
  }

  // Case 9: Cloning at station level in same account but in different campus and cafe

  async cloneAtStationLevelInSameAccButDiffCamAndCafe(
    stationId: string,
    targetCafe: string,
    targetStation: string,
    targetWeek: string
  ) {
    // Log start of the station-level cloning operation
    console.log(
      "Clone at station level in same account but in different campus and cafe"
    );
    const cloneStationIcon = this.page.locator(
      `img.clone-station-anchor.imagedropshadow[title="Clone station's weekly menu"][data-station_id="${stationId}"]`
    );
    await this.page.waitForLoadState("networkidle");
    await cloneStationIcon.waitFor({ state: "visible", timeout: 15000 });
    await cloneStationIcon.scrollIntoViewIfNeeded();
    await cloneStationIcon.click();
    console.log("Clone icon clicked.");

    const cafeDropdown = this.page.locator("#clone_to_cafe_id").first();
    await cafeDropdown.waitFor({ state: "attached", timeout: 10000 });
    await cafeDropdown.selectOption({ label: targetCafe });
    console.log(`Café selected: ${targetCafe}`);
    const selectedCafe = await cafeDropdown.inputValue();
    console.log(`Current café value: ${selectedCafe}`);

    const stationDropdown = this.page
      .locator("#clone-station-helper select#clone_to_station_id")
      .first();
    const weekDropdown = this.page.locator("#cloned_week_date").first();
    await Promise.all([
      stationDropdown.waitFor({ state: "visible", timeout: 15000 }),
      weekDropdown.waitFor({ state: "visible", timeout: 15000 }),
    ]);
    await stationDropdown.selectOption({ label: targetStation });
    console.log(`Station selected: ${targetStation}`);
    await weekDropdown.selectOption(targetWeek);
    console.log(`Week selected: ${targetWeek}`);
    await this.page.waitForTimeout(3000);

    const mergeRadio = this.page.locator("#merge-week").first();
    if (await mergeRadio.isVisible()) {
      await mergeRadio.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await mergeRadio.click({ force: true });
      console.log("Merge radio clicked successfully");
    } else {
      console.log("No merge option visible — continuing");
    }

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_week")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 10000 });
    await cloneButton.click();
    await this.page.waitForTimeout(3000);

    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
    }

    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 30000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(3000);
  }

  // Case 10: Cloning at item level in different account and cafe

  async cloneAtItemLevelInDiffAccAndCafe(
    itemName: string,
    accountName: string,
    cafeName: string,
    stationName: string,
    dateValue: string
  ) {
    // Log start of the item-level cloning operation
    console.log("Clone at item level in different account and cafe");
    await this.hoverOnMenuItemByName(itemName);
    await this.clickCloneIconByName(itemName);

    const accountDropdown = this.page.locator("#clone_to_account").first();
    await accountDropdown.waitFor({ state: "visible", timeout: 5000 });
    await accountDropdown.selectOption({ label: accountName });
    await expect(accountDropdown).toHaveValue("529");
    await this.page.waitForTimeout(5000);

    const cafeDropdown = this.page.locator("#clone_to_cafe_id").first();
    await cafeDropdown.waitFor({ state: "visible", timeout: 10000 });
    await cafeDropdown.selectOption(cafeName);
    await expect(cafeDropdown).toHaveValue("1464471");
    await this.page.waitForTimeout(3000);

    const stationDropdown = this.page.locator("#clone_to_station_id").first();
    await stationDropdown.waitFor({ state: "visible", timeout: 10000 });
    await stationDropdown.selectOption({ label: stationName });
    await expect(stationDropdown).toHaveValue("30089");
    await this.page.waitForTimeout(3000);

    const dateDropdown = this.page.locator("#item_cloned_date").first();
    await dateDropdown.waitFor({ state: "visible", timeout: 10000 });
    await dateDropdown.selectOption(dateValue);

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_item")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 15000 });
    await cloneButton.click();

    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible({ timeout: 5000 }).catch(() => false)) {
      await confirmYes.click();
    }
    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(3000);
  }

  // Case 11: Cloning at station level in different account and cafe

  async cloneAtStationLevelInDiffAccAddCafe(
    stationId: string,
    targetAccount: string,
    targetCafe: string,
    targetStation: string,
    targetWeek: string
  ) {
    // Log start of the station-level cloning operation
    console.log("Clone at station level in different account and cafe");
    const cloneStationIcon = this.page.locator(
      `img.clone-station-anchor.imagedropshadow[title="Clone station's weekly menu"][id^="clone-station-${stationId}"]`
    );
    await cloneStationIcon.waitFor({ state: "visible", timeout: 10000 });
    await cloneStationIcon.click();

    const accountDropdown = this.page.locator("#clone_to_account").first();
    await accountDropdown.waitFor({ state: "visible", timeout: 5000 });
    await accountDropdown.selectOption({ label: targetAccount });
    await expect(accountDropdown).toHaveValue("529");
    await this.page.waitForTimeout(3000);

    const cafeDropdown = this.page.locator("#clone_to_cafe_id").first();
    await cafeDropdown.waitFor({ state: "visible", timeout: 5000 });
    await cafeDropdown.selectOption({ label: targetCafe });
    await expect(cafeDropdown).toHaveValue("1464471");
    await this.page.waitForTimeout(3000);

    const stationDropdown = this.page
      .locator("#clone-station-helper select#clone_to_station_id")
      .first();

    const weekDropdown = this.page.locator("#cloned_week_date").first();
    await Promise.all([
      stationDropdown.waitFor({ state: "visible", timeout: 10000 }),
      weekDropdown.waitFor({ state: "visible", timeout: 10000 }),
    ]);
    await stationDropdown.selectOption({ label: targetStation });
    await weekDropdown.selectOption(targetWeek);

    const cloneButton = this.page
      .locator("a.button.small.green.save_cloned_week")
      .first();
    await cloneButton.waitFor({ state: "visible", timeout: 10000 });
    await cloneButton.click();

    const confirmYes = this.page.locator("span.ui-button-text", {
      hasText: "Yes",
    });
    if (await confirmYes.isVisible()) {
      await confirmYes.click();
    }

    const successMessage = this.page.locator("#success");
    await successMessage.waitFor({ state: "visible", timeout: 20000 });
    await expect(successMessage).toContainText("Successfully Cloned.");
    await this.page.waitForTimeout(5000);
    console.log("Station menu cloned successfully and UI updated");
  }
}
