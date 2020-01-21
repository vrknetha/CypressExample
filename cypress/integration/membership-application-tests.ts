/// <reference types="Cypress" />
describe('Validating membership application forms', () => {
    before(() => {
        cy.visit('/auth?ReturnUrl=%2fa')
            .login();
    });

    it('shoud navigate to membership application form', () => {
        cy.visit('/ap/Membership/Application/zLwZVDPA');
    });
    it('should have the business membership type as default', () => {
        cy.get('span[class="col-md-12"] > span:nth-child(2)')
            .should('have.text', 'Business Membership');
    });

    it('should have $16.67 as monthly charge for business membership', () => {
        cy.get('span[class="col-md-12"] > span:nth-child(3)')
            .should('have.text', 'Starting at $16.67 Monthly');
    });

    it('should have $25.00 as one time fee', () => {
        cy.get('span[class="col-md-12"] > span:nth-child(4)')
            .should('have.text', '$25.00 One-Time Fee');
    });

    it('should have the price of level where one time is $10.00 and $40.00 as monthly', () => {
        cy.get('span[class="col-md-12"] > span:nth-child(5)')
            .should('have.text', '+ Price of Level Selected (Price Range: $10.00 - $40.00 Monthly)');
    });

    it('should have four membership type levels', () => {
        cy.get('[name="MembershipLevelId"] > option')
            .should('have.length', 4);
    });

    it('the first membership type level should have name as platinum, $40.00 as montly fees and $8.00 as one time registration-fee', () => {
        cy.get('[name="MembershipLevelId"] > option:nth-child(1)')
            .should('have.text', 'Platinum: $40.00 Monthly + $8.00 One-Time Registration Fee');
    });

    it('the second membership type level should have name as gold, $30.00 as montly fees and $6.00 as one time registration-fee', () => {
        cy.get('[name="MembershipLevelId"] > option:nth-child(2)')
            .should('have.text', 'Gold: $30.00 Monthly + $6.00 One-Time Registration Fee');
    });

    it('the third membership type level should have name as silver, $20.00 as montly fees and $4.00 as one time registration-fee', () => {
        cy.get('[name="MembershipLevelId"] > option:nth-child(3)')
            .should('have.text', 'Silver: $20.00 Monthly + $4.00 One-Time Registration Fee');
    });

    it('the fourth membership type level should have name as bronze, $10.00 as montly fees and $2.00 as one time registration-fee', () => {
        cy.get('[name="MembershipLevelId"] > option:nth-child(4)')
            .should('have.text', 'Bronze: $10.00 Monthly + $2.00 One-Time Registration Fee');
    });

    it('should have view membership terms url', () => {
        cy.get('.col-sm-12 > div.col-sm-4')
            .should('have.contain.text', 'View Membership Terms')
            .should('have.prop', 'href');
    });

    it('should navigate to next page once fill in the required details', () => {
        cy.get('[name="ContactSignUp.FirstName"]')
            .type('Cari')
            .get('[name="ContactSignUp.LastName"]')
            .type('Haberkorn')
            .get('[name="ContactSignUp.Email"]')
            .type('cari1@mailinator.com')
            .get('[name="ContactSignUp.OrganizationName"]')
            .type('Cari Software Solutions')
            .get('[value="Next"]')
            .click()
            .url()
            .should('include', '?contactIds');
    });

    it('should show main website field and it should required field', () => {
        cy.get('label[for="MembershipContacts_1__Website"]').should('have.attr', 'data-required', 'True')
            .get('input[id="MembershipContacts_1__Website"]').should('have.attr', 'data-required', 'True');
    });

    it('should show established date but it should not be a required field', () => {
        cy.get('label[for="MembershipContacts_1__EstablishDate"]').should('have.attr', 'data-required', 'False')
            .get('input[id="MembershipContacts_1__EstablishDate"]').should('have.attr', 'data-required', 'False');
    });

    it('should display business address fields but not required', () => {
        cy.get('label[for="MembershipAddressFields_0__Address1"]').should('have.attr', 'data-required', 'False')
            .get('input[id="MembershipAddressFields_0__Address1"]').should('have.attr', 'data-required', 'False')
            .get('label[for="MembershipAddressFields_0__City"]').should('have.attr', 'data-required', 'False')
            .get('input[id="MembershipAddressFields_0__City"]').should('have.attr', 'data-required', 'False')
            .get('label[for="MembershipAddressFields_0__CountryId"]').should('have.attr', 'data-required', 'False')
            .get('select[id="MembershipAddressFields_0__CountryId"]').should('have.attr', 'data-required', 'False')
            .get('label[for="MembershipAddressFields_0__StateProvince"]').should('have.attr', 'data-required', 'False')
            .get('select[id="MembershipAddressFields_0__StateProvince"]').should('have.attr', 'data-required', 'False')
            .get('label[for="MembershipAddressFields_0__PostalCode"]').should('have.attr', 'data-required', 'False')
            .get('input[id="MembershipAddressFields_0__PostalCode"]').should('have.attr', 'data-required', 'False');
    });

    it('should display main phone number field but not required', () => {
        cy.get('label[for="MembershipPhones_0__PhoneNumber"]').should('have.attr', 'data-required', 'False');
    });

    it('should display the business category with required as 1 and limit to 3', () => {
        cy.get('input[class="select2-search__field"]').should('have.attr', 'placeholder', 'Select category items (Required: 1, Limit: 3)');
    });

    it('should verify that invoice me option only available for semi-anually and annually', () => {
        cy.get('table[class="table table-striped"] > tbody > tr > td').should('have.length', 5)
            .get('input[value="Monthly"]').check().get('.mn-row.invoice-me').as('invoiceButton').should('have.attr', 'style', 'display: none;')
            .get('input[value = "Quarterly"]').check().get('@invoiceButton').should('have.attr', 'style', 'display: none;')
            .get('input[value = "Semiannually"]').check().get('@invoiceButton').should('have.attr', 'style', 'display: block;')
            .get('input[value = "Annually"]').check().get('@invoiceButton').should('have.attr', 'style', 'display: block;');
    });

    it('should show the accurate values in the invoice me option', () => {
        cy.get('.col-lg-12 > div:nth-child(2)').as('feeContainer').eq(0).should('have.text', '480.00')
            .get('@feeContainer').eq(1).should('have.text', '200.00')
            .get('@feeContainer').eq(2).should('have.text', '0.00')
            .get('@feeContainer').eq(3).should('have.text', '15.00')
            .get('@feeContainer').eq(4).should('have.text', '10.00')
            .get('@feeContainer').eq(5).should('have.text', '4.00')
            .get('@feeContainer').eq(6).should('have.text', '4.00')
            .get('@feeContainer').eq(7).should('have.text', '713.00');
    });

    it('should fill the required details to complete the application', () => {
        cy.get('input[id="MembershipContacts_1__Website"]').clear().type('https://www.google.com')
            .get('input[name="MembershipContacts[1].EstablishDate"]').type('2020-03-22')
            // tslint:disable-next-line:max-line-length
            .get('input[class="select2-search__field"]').click().get('.select2-results__option').as('resultOptions').eq(0).click()
            .get('input[type="radio"][value="Invoice"]').click()
            .get('input[name="CustomFields[0].Value"]').type('20')
            .get('input[value="Join"]').click()
            .url().should('contain', 'Confirm');
    });
});