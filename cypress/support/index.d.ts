/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        Login(username: string, password: string): Chainable<void>
    }
}