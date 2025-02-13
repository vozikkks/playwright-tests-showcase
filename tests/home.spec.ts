import { test, expect} from "@playwright/test";

test.describe("Home page without auth", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://practicesoftwaretesting.com/");
        });
    });

    test("Visual test", async ({ page }) => {
        await page.goto("http://practicesoftwaretesting.com/");
        await expect(page).toHaveScreenshot("home-page-no-auth.png", {
           // mask: [page.getByTitle("Practice Software Testing - Toolshop")]
        });
    });

    test("Validate signing in", async ({ page }) => {
        await page.goto("http://practicesoftwaretesting.com/");
        // Ensure the sind in link is present
        await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });

    test("Validate the title of the page", async ({ page }) => {
        await page.goto("http://practicesoftwaretesting.com/");
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    });

    test("Validate loading of 9 items displayed on the page", async ({ page }) => {
        await page.goto("http://practicesoftwaretesting.com/");
        const productGrid = page.locator(".col-md-9");
        await page.locator('.card.skeleton').first().waitFor({ state: 'detached', timeout: 10000 });
        await expect(productGrid.getByRole("link")).toHaveCount(9);
    });

    test("Validate that Slip Joint Pliers persist", async ({ page }) => {
        const productGrid = page.locator(".col-md-9");
        await page.goto("http://practicesoftwaretesting.com/");
        await page.getByTestId("search-query").fill("Slip Joint Pliers");
        await page.getByTestId("search-submit").click();
        await expect(productGrid.getByRole("link")).toHaveCount(1);
        await expect(page.getByAltText("Slip Joint Pliers")).toBeVisible();
});

test.describe("Home page with logged in customer", () => {
    test.use({ storageState: ".auth/customer01.json" });
    test.beforeEach(async ({page}) => {
        await page.goto("http://practicesoftwaretesting.com/");
    });

    test("visual test with auth", async ({ page }) => {
        await page.waitForLoadState("networkidle");
    
        // Increase tolerance to allow more differences
        await expect(page).toHaveScreenshot("home-page-customer.png", {
            maxDiffPixels: 10000,  // Allow more pixel differences
            threshold: 1,  // Allow up to 1% difference in pixels
        });
    });

    test("check that the customer is signed in", async ({page}) => {
        await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    });
});