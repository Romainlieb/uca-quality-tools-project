import { test, expect } from "@playwright/test";

test.describe("Gestion des articles", () => {
    test("Liste des articles", async ({ page }) => {
        await page.goto("http://localhost:3009/posts");

        // Vérification du titre
        const heading = page.locator("h1");
        await expect(heading).toHaveText("Liste des articles");

        // Vérification du bouton de création
        const createButton = page.locator("a", { hasText: "Nouvel article" });
        await expect(createButton).toBeVisible({ timeout: 10000 });
    });

    test("Création et modification d'un article", async ({ page }) => {
        // Création
        await page.goto("http://localhost:3009/posts/new");
        await page.fill('input[name="title"]', "Mon article");
        await page.fill('textarea[name="content"]', "Contenu de l'article");
        await page.fill('input[name="author"]', "John Doe");
        await page.click('button[type="submit"]');

        // Vérification dans la liste
        await page.waitForURL("http://localhost:3009/posts");
        const article = page.locator("article", { hasText: "Mon article" }).first();
        await expect(article).toBeVisible();

        // Modification
        const modifyLink = page.locator("article", { hasText: "Mon article" }).locator("a", { hasText: "Modifier" }).first();
        await modifyLink.click();
        await page.waitForSelector('input[name="title"]');
        await page.fill('input[name="title"]', "Article modifié");
        await page.click('button[type="submit"]');

        // Vérification de la modification
        await page.waitForURL(/\/posts\/\d+/);
        const updatedTitle = page.locator("h1");
        await expect(updatedTitle).toHaveText("Article modifié", { timeout: 10000 });
    });
});
