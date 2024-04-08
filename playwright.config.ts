import { defineConfig } from '@playwright/test';

export default defineConfig({
	timeout: 90_000,
	globalTimeout: 60 * 15_000,
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 1,
	reporter: process.env.CI ? [ [ 'github' ], [ 'list' ], [ 'html' ] ] : 'list',
	use: {
		actionTimeout: 10_000,
		navigationTimeout: 10_000,
		baseURL: 'https://onskeskyen.dk',
		trace: 'on-first-retry',
	},
});
