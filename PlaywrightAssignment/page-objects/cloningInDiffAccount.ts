import { Page, expect } from "@playwright/test";

export class CloningInDiffAccount {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

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
  // Case 1: Cloning at item level in different account and cafe

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

  // Case 2: Cloning at station level in different account and cafe

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
      `img.clone-station-anchor.imagedropshadow[title="Clone station's weekly menu"][data-station_id="${stationId}"]`
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
