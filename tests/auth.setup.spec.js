import 'dotenv/config';
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('https://test.salesforce.com');

  await page.locator('#username').fill(process.env.SF_USERNAME);
  await page.locator('#password').fill(process.env.SF_PASSWORD);
  await page.locator('#Login').click();

  console.log('Complete email verification if prompted.');

  await page.pause();

  await expect(page).toHaveURL(/lightning/);

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
  console.log('Authentication state saved successfully.');
});
