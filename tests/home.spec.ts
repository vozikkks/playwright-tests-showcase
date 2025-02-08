import { test, expect} from "@playwright/test";

test.describe("Home page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://practicesoftwaretesting.com/");
    })
    test("Validate signing in", async ({ page }) => {
    await page.goto("http://practicesoftwaretesting.com/");
    // Ensure the sind in link is present
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
});

test("Validate the title of the page", async ({ page }) => {
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
});

test("Validate loading of 9 items displayed on the page", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.locator('.card.skeleton').first().waitFor({ state: 'detached', timeout: 10000 });
    await expect(productGrid.getByRole("link")).toHaveCount(9);
});

test("Validate that Slip Joint Pliers persist", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Slip Joint Pliers");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Slip Joint Pliers")).toBeVisible();
});
})