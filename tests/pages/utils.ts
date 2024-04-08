import { expect, type Page } from '@playwright/test';

export default class Utils {
	readonly page: Page;
	readonly loadMoreBtnSelector = 'button[class*="CarouselViewAllButton"]';
	readonly brands = '[class*="GridDefaultBrands"] .fade-in';


	constructor( page: Page ) {
		this.page = page;
	}

	async acceptCookieConsent() {
		const acceptBtn = this.page.locator('[aria-label="Accepter alle"]');
		await acceptBtn.waitFor();
		await acceptBtn.click();
	}

	async clickLoadMore() {
		await this.page.locator(this.loadMoreBtnSelector).waitFor();
		for (let i = 0; i < 5; i++ ) {
			if ( await this.page.$(this.loadMoreBtnSelector) ) {
				const brandCount = await this.page.locator(this.brands).count();
				await this.page.locator(this.loadMoreBtnSelector).click();
				await this.page.waitForLoadState('networkidle');
				await expect.poll(async () =>{
					return await this.page.locator(this.brands).count();
				}).not.toEqual(brandCount);
                    
			} else { return; }
		}
	}
}