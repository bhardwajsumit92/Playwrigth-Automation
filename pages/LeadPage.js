import { expect } from '@playwright/test';

export class LeadPage {

    constructor(page) {
        this.page = page;

        this.leadsTab = page.getByRole('link', { name: 'Leads' });
        this.newButton = page.getByRole('button', { name: 'New' });
        this.nextButton = page.getByRole('button', { name: 'Next' });

        this.lastName = page.getByLabel('Last Name');
        this.company = page.getByLabel('Company / Business Name');
        this.phone = page.getByRole('textbox', { name: 'Phone', exact: true });

        this.statusDropdown = page.getByRole('combobox', { name: 'Lead Status' });

        this.save = page.getByRole('button', {
             name: 'Save',
             exact: true
            
        });
        this.saveAndNew = this.saveAndNew = page.getByRole('button', {
             name: 'Save & New',
             exact: true
        });
    }

    async openNewLead() {

        await this.leadsTab.click();

        await this.newButton.click();

        // Buyer Record Type
        await this.page.getByRole('radio', { name: 'Buyer' }).check();

        await this.nextButton.click();

        await expect(this.lastName).toBeVisible();
    }

    async createLead(leadName, phone, status, lastLead = false) {

        await this.lastName.fill(leadName);

        await this.company.fill('Automation Company');

        await this.phone.fill(phone);

        await this.statusDropdown.waitFor({
        state: 'visible'
        });

        await this.page.getByRole('combobox', { name: 'Lead Status' }).click();

        if (lastLead) {

            await this.save.click();
            const toast = this.page.locator('.toastMessage');
            // await expect(toast).toContainText(
            //     `Lead "${leadName}" was created.`
            // );

        } else {

            await this.saveAndNew.click();

            // Buyer Record Type page appears again
            await this.page.getByRole('radio', { name: 'Buyer' }).check();

            await this.nextButton.click();

            await expect(this.lastName).toBeVisible();
        }
    }

    async createMultipleLeads(total) {

        await this.openNewLead();

        for (let i = 1; i <= total; i++) {

            const leadName = `TestLead-${i}`;
            const phone = `98765432${String(i).padStart(2, '0')}`;

            const status =
                i % 2 === 0
                    ? 'New'
                    : 'In Progress';

            await this.createLead(
                leadName,
                phone,
                status,
                i === total
            );

            console.log(
                `Created ${leadName} | ${phone} | ${status}`
            );
            console.log(await this.page.url());
        }
    }

}
