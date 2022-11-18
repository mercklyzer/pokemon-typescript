/// <reference types="cypress" />
describe('pokemons page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-test="pokemons list button"]')
            .click()
    })

    it("Navigated to list of pokemons", () => {
        cy.location('pathname')
            .should('equal', '/pokemons')
    })

    it("Navbar is showing with search bar", () => {
        
    })
})