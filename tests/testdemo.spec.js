import { test, expect } from '@playwright/test';

test('Create 10 Leads with different phone numbers and status', async ({ page }) => {

    // Login is assumed using storageState
    await page.goto('/lightning/page/home');
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    for (let i = 1; i <= 10; i++) {

        const leadName = `TestLead-${i}`;
        const phone = `98765432${String(i).padStart(2, '0')}`;
        const status = i % 2 === 0 ? 'New' : 'In Progress';

        // Open New Lead page
        

        // Last Name
        await page.getByLabel('Last Name').fill(leadName);

        // Company
        await page.getByLabel('Company').fill('Automation Company');

        // Phone
        await page.getByRole('textbox', { name: 'Phone', exact: true }).fill(phone);

        // Lead Status
        await page.getByRole('combobox', { name: 'Lead Status' }).waitFor({
        state: 'visible'
        });

        await page.getByRole('combobox', { name: 'Lead Status' }).click();

        // Save
        if (i < 10) {
         await page.getByRole('button', { name: 'Save & New', exact: true }).click();
        } 
        else {
         await page.getByRole('button', { name: 'Save', exact: true }).click();
        }

        // Verify Lead Created
        // await expect(page.getByText(`${leadName}`)).toBeVisible();

        console.log(`✅ ${leadName} created | Phone: ${phone} | Status: ${status}`);
    }
    
});
