import { test, expect } from '@playwright/test';
import Brands from './pages/brands';
import Brand from './pages/brand';
import Utils from './pages/utils';

test.describe('Onskeskyen test', () => {
	test('Check number of trending list followers', async ({ page }) => {
		const brandsPage = new Brands(page);
		const brandPage = new Brand(page);
		const utils = new Utils(page);

		await page.goto('/da/brands');
		await utils.acceptCookieConsent();
		await brandsPage.selectCategory('Børn & Baby');
		await utils.clickLoadMore();
		await brandsPage.selectBrand('Plysdyr.dk');
		await brandPage.openTrandinglist('De største bamser');
		await expect(brandPage.getTrandingList()).toHaveCount(17);
	});
});

