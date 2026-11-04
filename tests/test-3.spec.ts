import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/#google_vignette');
  await page.getByRole('button', { name: 'Consent' }).click();
  
});