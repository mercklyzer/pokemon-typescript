/// <reference types="cypress" />

import { HomePage } from "../pages/homePage"
import { PokemonsPage } from "../pages/pokemonsPage";

describe('pokemons page', () => {
    const homePage = new HomePage();
    const pokemonsPage = new PokemonsPage();

    beforeEach(() => {
        cy.visit('/')
        homePage.elements.pokemonsListBtn()
            .click()
    })

    it("Navigated to list of pokemons", () => {
        cy.location('pathname')
            .should('equal', '/pokemons')
    })

    it("Navbar is showing with search bar", () => {
        homePage.elements.navbar()
            .should('be.visible')  
    })

    it("Infinitie Scroll on Pokemons", () => {
        pokemonsPage.elements.pokemonCard().should('have.length', 20)
        cy.wait(500) // wait for images to load (workaround)
        cy.scrollTo('bottom')
        pokemonsPage.elements.pokemonCard().should('have.length', 40)
    })

    it("Search pokemon by type and name", () => {
        pokemonsPage.elements.pokemonFilteredType().should('contain', 'All')
        pokemonsPage.searchPokemon("pikac")
        pokemonsPage.elements.pokemonCard().should('have.length', 1)
        pokemonsPage.clearSearchPokemon()

        pokemonsPage.filterByType('electric')
        pokemonsPage.elements.pokemonFilteredType().should('contain', 'electric')
        pokemonsPage.elements.pokemonCard().should('have.length.at.most', 20)
        pokemonsPage.clearFilters()

        pokemonsPage.filterByType('water')
        pokemonsPage.elements.pokemonFilteredType().should('contain', 'water')
        pokemonsPage.elements.pokemonCard().should('have.length.at.most', 20)
        pokemonsPage.searchPokemon('slow')
        pokemonsPage.elements.pokemonCard().should('have.length', 3)  
        pokemonsPage.clearFilters()     
        
        pokemonsPage.searchPokemon('slowpokemon')
        pokemonsPage.elements.pokemonCard().should('not.exist')
        pokemonsPage.elements.noPokemonsDisplayed().contains('No pokemons to be displayed.').should('be.visible')
    })
})