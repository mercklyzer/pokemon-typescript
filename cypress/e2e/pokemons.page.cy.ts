/// <reference types="cypress" />

import { HomePage } from "../pages/home.page"
import { PokemonsPage } from "../pages/pokemons.page";

describe('pokemons page', () => {
    const homePage = new HomePage();
    const pokemonsPage = new PokemonsPage();
    const POKEMON_TO_SEARCH = 'grimer';

    beforeEach(() => {
        cy.visit('/')
        homePage.elements.pokemonsListBtn()
            .click()        
    })

    it.only("Navigated to list of pokemons", () => {
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

    it.only("Search pokemon using infinite scroll", () => {
        cy.pause()
        // pokemonsPage.loadPokemonThumbnails()
        pokemonsPage.findPokemonByScrolling(POKEMON_TO_SEARCH, 10)
        cy.pause()
    })

    it.only("FAILED search pokemon using infinite scroll", () => {
        cy.pause()
        pokemonsPage.loadPokemonThumbnails()
        pokemonsPage.findPokemonByScrolling(POKEMON_TO_SEARCH, 2, undefined, false)
        cy.pause()
    })

    it.only("Filter pokemon by type", () => {
        cy.pause()
        pokemonsPage.filterByType('water')
        pokemonsPage.elements.pokemonFilteredType().should('contain', 'water')

        pokemonsPage.elements.pokemonCard().should('have.length.greaterThan', 0)
            .each((pokemon) => {
                expect(pokemon).attr('pokemon-types').contain('water')
            })
        cy.pause()
        
    })

    it("Search pokemon by name", () => {
        pokemonsPage.searchPokemon("pikac")
        pokemonsPage.elements.pokemonCard().should('have.length', 1)
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
    })

    it.only("No pokemon to display", () => {
        pokemonsPage.searchPokemon('slowpokemon')
        pokemonsPage.elements.pokemonCard().should('not.exist')
        pokemonsPage.elements.noPokemonsDisplayed().contains('No pokemons to be displayed.').should('be.visible')
    })
})