import { test, expect } from "@playwright/test";

test("Page d'accueil", async ({ page }) => {
    await page.goto("http://localhost:3009/");
    console.log("Page chargée :", await page.content()); // Affiche le HTML de la page

    // Vérification du titre
    await expect(page).toHaveTitle("Super Blog");

    // Vérification du contenu
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Bienvenue sur Super Blog");

    // Correction du texte du lien
    const postsLink = page.locator("a", { hasText: "Voir la liste des articles" });
    await expect(postsLink).toBeVisible({ timeout: 10000 });
});
