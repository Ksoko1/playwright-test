import { test, expect } from '@playwright/test';

test.describe('group name', () => {

  test.beforeEach(async ({ page }) =>                     
    {   await page.goto('https://www.automationexercise.com/#google_vignette');
      await page.getByRole('button', { name: 'Consent' }).click();        
    
    })      
    
    
    test('visibility check', async ({ page }) => {
      
      await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
      await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();
      await expect(page.getByRole('link', { name: ' Cart' })).toBeVisible();
      await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
      await expect(page.getByRole('link', { name: ' Test Cases' })).toBeVisible();
      await expect(page.getByRole('link', { name: ' API Testing' })).toBeVisible();
      await expect(page.getByRole('link', { name: ' Video Tutorials' })).toBeVisible();
      await page.getByRole('link', { name: ' Contact us' }).click();
    
    });
    test('visibility check_1', async ({ page }) => {
     
      await expect(page.getByRole('link', { name: ' Home' })).toContainText('Home');
    
    });
    
    test('link check_1', async ({ page }) => {
     
      await expect(page.getByRole('link', { name: ' Home' })).toHaveAttribute('href', '/');
      await expect(page.getByRole('link', { name: ' Products' })).toHaveAttribute('href', '/products');
      await expect(page.getByRole('link', { name: ' Cart' })).toHaveAttribute('href', '/view_cart');
      await expect(page.getByRole('link', { name: ' Signup / Login' })).toHaveAttribute('href', '/login');
     
    });
    
    test('link check visibility and text', async ({ page }) => {
     
      await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
      await expect(page.locator('#slider-carousel')).toContainText('AutomationExercise');
     
    });
    
    test('link check visibility and click', async ({ page }) => {
     
    await expect.soft(page.getByRole('link', { name: ' Home' })).toBeVisible();
    await expect.soft(page.locator('#header')).toContainText('Home');
    await expect.soft(page.getByRole('link', { name: ' Home' })).toHaveAttribute('href', '/');
     
    });

})

