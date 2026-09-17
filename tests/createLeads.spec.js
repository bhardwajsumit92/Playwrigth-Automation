import { test } from '@playwright/test';
import { LeadPage } from '../pages/LeadPage';

test('Create 10 Leads', async ({ page }) => {

    const leadPage = new LeadPage(page);

    await page.goto('/lightning/page/home');

    await leadPage.createMultipleLeads(10);
    
});
