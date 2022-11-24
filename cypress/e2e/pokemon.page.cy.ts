/// <reference types="cypress" />

import { PokemonPage } from "../pages/pokemon.page";
import { PokemonsPage } from "../pages/pokemons.page";

describe('Pokemon Page', () => {
    const pokemonsPage = new PokemonsPage();
    const pokemonPage = new PokemonPage();

    beforeEach(() => {
        cy.viewport(1440, 752)
        cy.visit('/pokemons');
        pokemonsPage.searchPokemon('slow')
        pokemonsPage.getNthPokemonCard(0).click()
        pokemonPage.storePathId()
    })

    it("Correct route", () => {
        cy.location('pathname').should('match', /^\/pokemons\/[1-9]{1}\d?\d?/g)
    })

    it("Pokemon Basic Info Exists", () => {
        pokemonPage.verifyBasicInfo()
    })

    it('Pokemon Exists', () => {
        pokemonPage.elements.pokemonName().should('exist')
        pokemonPage.elements.pokemonGenre().should('exist')
        pokemonPage.elements.pokemonImage()
            .should('be.visible')
            .and('have.prop', 'naturalWidth')
            .should('be.greaterThan', 0)
    })

    it('Pokemon Stats Table Exists', () => {
        pokemonPage.verifyStats()
    })
})