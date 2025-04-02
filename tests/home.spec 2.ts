import { test, expect } from '@playwright/test';

test("La page d'accueil devrait contenir un titre", async ({ page }) => {
  await page.goto('http://localhost:4200/home'); // Remplace par ton URL Angular
  await expect(page.locator('p')).toContainText('les meilleurs expériences autour de vous'); // Ajuste selon ton contenu
});
