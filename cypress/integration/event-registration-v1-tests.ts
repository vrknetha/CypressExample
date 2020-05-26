/// <reference types="Cypress" />
describe('Register an event using V1', () => {
    before(() => {
        cy.visit('/auth?ReturnUrl=%2fa')
            .login();
    });
});