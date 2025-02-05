import { test, expect} from '@playwright/test';

test('Check if page loads', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});