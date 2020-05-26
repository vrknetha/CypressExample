// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

// Alternatively you can use CommonJS syntax:
// require('./commands')
/// <reference types="cypress" />
Cypress.Commands.add('login', (username = '******8', password = '****') => {
    cy.get('input[name="Username"]')
    .type(username)
    .get('input[name="Password"]')
    .type(password)
    .get('[type="submit"]')
    .click();
})

Cypress.Cookies.defaults({
    whitelist: ['MMP.Auth.AccessToken',
    'MMP.Auth.LoginToken',
    '__cfduid',
    '__cfduid',
    '__lm',
    '__stripe_mid',
    'clientconnectionid']
  })

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

