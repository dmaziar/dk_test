import { expect, type Page } from '@playwright/test';

export default class Brands {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async selectCategory(categoryName: string) {
		await this.page.getByText(categoryName).click();
		await expect(this.page.locator('[class*="BrandsCategoryTitle"]')).toHaveText('Børn & Baby');
	}


	async selectBrand(brandName: string) {
		await this.page.getByRole('heading', { name: brandName }).locator('..').locator('img').click();
	}
}