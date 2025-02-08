import { test, expect} from "@playwright/test";

test("Home page", async ({ page }) => {
    await page.goto("http://practicesoftwaretesting.com/");
    // Ensure the sind in link is present
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

    //Check the title of the page
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

    //Check the count of items displayed on the page
    const productGrid = page.locator(".col-md-9");
    await page.locator('.card.skeleton').first().waitFor({ state: 'detached', timeout: 10000 });
    await expect(productGrid.getByRole("link")).toHaveCount(9);

    //Search for "Thor Hammer" and check the result
    await page.getByTestId("search-query").fill("Slip Joint Pliers");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Slip Joint Pliers")).toBeVisible();
});