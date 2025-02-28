import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // Attendre que le serveur soit disponible
    await page.goto("http://localhost:3009/");
    await expect(page).toHaveTitle(/Super Blog/);
});

test("Page d'accueil", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Bienvenue sur Super Blog");
});
