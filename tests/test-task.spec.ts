import { test, expect } from '@playwright/test';
import Helper from './pages/helper';

test.describe('Onskeskyen test', ()=>{
	test('Check number of trending list followers', async ({ page }) =>{
		const helper = new Helper( page );
		await page.goto('/da/brands');
		const acceptBtn = page.locator('[aria-label="Accepter alle"]');
		await acceptBtn.waitFor();
		await acceptBtn.click();
		await page.getByText('Børn & Baby').click();
		await expect(page.locator('[class*="BrandsCategoryTitle"]')).toHaveText('Børn & Baby');
		await helper.clickLoadMore();
		await page.getByRole('heading', { name: 'Plysdyr.dk' }).locator('..').locator('img').click();
		await page.getByText('De største bamser').click();
		await page.getByRole('heading', { name: 'De største bamser' }).waitFor();
		await expect(page.locator('[class*="WishCard__WishImageContainer"]')).toHaveCount(17);
	});
});

