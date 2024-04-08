import { type Page } from '@playwright/test';

export default class Brand {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async openTrandinglist(itemName: string) {
		await this.page.getByText(itemName).click();
		await this.page.getByRole('heading', { name: 'De største bamser' }).waitFor();
	}

	getTrandingList() {
		return this.page.locator('[class*="WishCard__WishImageContainer"]');
	}
}