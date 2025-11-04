import { Page, expect } from "@playwright/test";

export class CafesPageMosaic {
  readonly page: Page;

  createdESTTime: string | null = null; // store time when café creation starts

  constructor(page: Page) {
    this.page = page;
  }

  // 🕒 Utility: Get current EST time in UTC-style format
  private async getCurrentESTTime(): Promise<string> {
    const now = new Date();
    const estDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    return estDate.toISOString().split(".")[0] + ".000Z";
  }

  // Go to Cafes Module
  async cafeModuleClick() {
    const cafesLink = this.page.locator("a.dashboard", { hasText: "Cafés" });

    await cafesLink.waitFor({ state: "visible", timeout: 10000 });
    await cafesLink.click();
  }

  async addNewCafe(newCafe: string) {
    const addCafeLink = this.page.locator('a[href*="/manager/cafes/create"]');
    await addCafeLink.waitFor({ state: "visible", timeout: 10000 });
    await addCafeLink.click();
    console.log("Clicked on Add Café link");
    // ⏱ Capture current EST time before clicking "Add Café"
    this.createdESTTime = await this.getCurrentESTTime();
    console.log(
      "Captured EST time at café creation start:",
      this.createdESTTime
    );

    // Locate the Account dropdown and select "Newput"
    const selectAccount = this.page.locator("#account_id");
    await selectAccount.waitFor({ state: "visible", timeout: 10000 });
    await selectAccount.selectOption({ label: "Newput Test Account" });

    // Optional: Verify selection
    const selectedAccountValue = await this.page
      .locator("#account_id")
      .inputValue();
    console.log("Selected account_id:", selectedAccountValue);

    // Locate the location dropdown by its ID and select the option by label
    const locationDropdown = this.page.locator("#location_id");
    await locationDropdown.waitFor({ state: "visible", timeout: 10000 });
    await locationDropdown.selectOption({ label: "Newput Test Campus" });

    // Optional: Verify selection
    const selectedLocationValue = await locationDropdown.inputValue();
    console.log("Selected location_id:", selectedLocationValue);

    // Locate the café name input and fill it
    const cafeNameInput = this.page.locator('input[name="name"].large');
    await cafeNameInput.waitFor({ state: "visible", timeout: 10000 });
    await cafeNameInput.fill(newCafe);
    console.log('Filled café name as "New Newput Cafe"');

    // Locate the cost center input and fill it
    const costCenterInput = this.page.locator(
      'input[name="cost_center"].large'
    );
    await costCenterInput.waitFor({ state: "visible", timeout: 10000 });
    await costCenterInput.fill("0");
    console.log('Filled cost center as "0"');

    // Locate the Save button and click it
    const saveButton = this.page.locator('img[src*="buttons/save.jpg"]');
    await saveButton.waitFor({ state: "visible", timeout: 10000 });
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
    console.log("Clicked on the Save button");
    await this.page.waitForTimeout(5000);

    // Close the cafe page
    const closeButton = this.page.locator('img[src*="buttons/close.jpg"]');
    await closeButton.waitFor({ state: "visible", timeout: 10000 });
    await closeButton.scrollIntoViewIfNeeded();
    await closeButton.click();
    console.log("Clicked on Close button successfully");
  }
}
