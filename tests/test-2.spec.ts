import { test, expect } from '@playwright/test';

test('test', async ({ 
  page await page.goto('https://www.automationexercise.com/#google_vignette');

await expect(page.getByRole('link', { name: ' Home' })).toContainText('Home');

})

