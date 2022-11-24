/// <reference types="cypress" />

import { HomePage } from "../pages/home.page"
import { PokemonsPage } from "../pages/pokemons.page";

describe('pokemons page', () => {
    const homePage = new HomePage();
    const pokemonsPage = new PokemonsPage();

    beforeEach(() => {
        cy.visit('/')
        homePage.elements.pokemonsListBtn()
            .click()

        cy.intercept('http://localhost:3500/pokemons**').as('pokemonsRequest')
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
        cy.scrollTo('bottom', {duration: 2000})
        pokemonsPage.elements.pokemonCard().should('have.length', 40)
    })

    it("Search pokemon using infinite scroll", () => {
        pokemonsPage.loadPokemonThumbnails()
        pokemonsPage.findPokemonByScrolling('grimer', 10)
    })

    it.only("FAILED search pokemon using infinite scroll", () => {
        pokemonsPage.loadPokemonThumbnails()
        pokemonsPage.findPokemonByScrolling('grimer', 2, undefined, true)
    })

    it("Filter pokemon by type", () => {
        pokemonsPage.filterByType('electric')
        pokemonsPage.elements.pokemonFilteredType().should('contain', 'electric')
        
        pokemonsPage.elements.pokemonCard().should(pokemon => {
            expect(pokemon).to.have.length.greaterThan(0)
            expect(pokemon).to.have.length.lessThan(21)
        }).each((pokemon) => {
            expect(pokemon).attr('pokemon-types').contain('electric')
        })

        pokemonsPage.filterByType('water')
        pokemonsPage.elements.pokemonFilteredType().should('contain', 'water')

        pokemonsPage.elements.pokemonCard().should(pokemon => {
            expect(pokemon).to.have.length.greaterThan(0)
            expect(pokemon).to.have.length.lessThan(21)
        }).each((pokemon) => {
            expect(pokemon).attr('pokemon-types').contain('water')
        })
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
    })

    it("No pokemon to display", () => {
        pokemonsPage.searchPokemon('slowpokemon')
        pokemonsPage.elements.pokemonCard().should('not.exist')
        pokemonsPage.elements.noPokemonsDisplayed().contains('No pokemons to be displayed.').should('be.visible')
    })
})