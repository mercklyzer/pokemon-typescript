
/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * @param value - value of data-test attribute
             * @param optional - optional selector appended to value
             * @param timeout - optional time to retry - default: 4000ms
             * @example getByDataTest('pokemon-card', '.active', 3000)
             */
            getByDataTest(value: string, optional?:string, timeout?:number): Chainable<JQuery<HTMLElement>>
        }
    }
}

export {};
