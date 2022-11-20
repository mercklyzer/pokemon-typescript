export interface NavbarElements {
    navbar: () => Cypress.Chainable;
    pokemonLogo: () => Cypress.Chainable;
    pokemonSearchBox: () => Cypress.Chainable;
}

export class Navbar {
    elements: NavbarElements = {
        navbar: () => cy.get('nav'),
        pokemonLogo: () => cy.get('nav [data-test="pokemon-logo"]'),
        pokemonSearchBox: () => cy.get('nav [data-test="search-pokemon"]')
    }

    searchPokemon(pokemon:string) {
        this.elements.pokemonSearchBox()
            .type(pokemon)
    }
}