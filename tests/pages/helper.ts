import { expect, type Page } from '@playwright/test';

export default class Helper {
	readonly page: Page;
	readonly loadMoreBtnSelector = 'button[class*="CarouselViewAllButton"]';

	constructor(page: Page) {
		this.page = page;
	}

	async clickLoadMore() {
		await this.page.locator(this.loadMoreBtnSelector).waitFor();
		for (let i = 0; i < 5; i++ ) {
			if ( await this.page.$(this.loadMoreBtnSelector) ) {
				const brandCount = await this.page.locator('[class*="GridDefaultBrands"] .fade-in').count();
				await this.page.locator(this.loadMoreBtnSelector).click();
				await this.page.waitForLoadState('networkidle');
				await expect.poll(async () =>{
					return await this.page.locator('[class*="GridDefaultBrands"] .fade-in').count();
				}).not.toEqual(brandCount);
                    
			} else { return; }
		}
	}
}