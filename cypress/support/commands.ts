/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * @param value - value of data-test attribute
             * @param optional - optional selector appended to value
             * @param timeout - optional time to retry - default: 4000ms
             */
            getByDataTest(value: string, optional?:string, timeout?:number): Chainable<any>
        }
    }
}

Cypress.Commands.add('getByDataTest', (value, optional, timeout = 4000) => {
    return cy.get(`[data-test="${value}"]${optional? optional:''}`, { timeout })
})

export { };