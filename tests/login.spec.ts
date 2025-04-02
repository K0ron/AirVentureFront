import test, { expect } from '@playwright/test';

test('Echec de connexion', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('input[name="email', 'wrong@exemple.com');
  await page.fill('input[name="password', 'wrongpassword');

  await page.click('button[type="submit"]');

  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toHaveText('Identifiants incorrects');
});

test('Login utilisateur avec succès', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:4200/activities');
});

test('Enregistrement réussi', async ({ page }) => {
  await page.goto('http://localhost:4200/register');

  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.fill('input[name="confirmPassword"]', 'Password123!');

  await page.selectOption('select[name="role"]', { label: 'Particulier' });

  await page.check('input[type="checkbox"]');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:4200/activities');
});

test('Enregistrement avec mot de passe non conforme', async ({ page }) => {
  await page.goto('http://localhost:4200/register');

  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'pass');
  await page.fill('input[name="confirmPassword"]', 'pass');

  await page.selectOption('select[name="role"]', { label: 'Particulier' });

  await page.check('input[type="checkbox"]');

  await page.click('button[type="submit"]');

  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toHaveText(
    'Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule, un caractère spécial et un chiffre.'
  );
});
