/// <reference types="cypress" />

import { PokemonPage } from "../pages/pokemon.page";
import { PokemonsPage } from "../pages/pokemons.page";

const { _, $ } = Cypress;

describe('Pokemon Page', () => {
    const pokemonsPage = new PokemonsPage();
    const pokemonPage = new PokemonPage();

    beforeEach(() => {
        // cy.viewport(1440, 752)
        cy.visit('/pokemons');
        pokemonsPage.searchPokemon('slow')
        pokemonsPage.elements.pokemonCard().eq(0).click()
        cy.location('pathname').as('path')
        cy.get('@path').then(path => {
            let id = (path as unknown as string).split('/').at(-1)
            cy.wrap({id}).as('pathId')
        })
    })

    it("Correct route", () => {
        cy.get('@path')
            .should('match', /^\/pokemons\/[1-9]{1}\d?\d?/g)
    })

    it("Pokemon Basic Info Exists", () => {
        pokemonPage.verifyBasicInfo()
        


        pokemonPage.elements.id().invoke('text')
            .then(text => {
                const cleanId = text.replace('#', '')
                cy.get('@pathId').then(pathId => {
                    expect(cleanId).to.be.eq((pathId as any).id)
                })
            })

        pokemonPage.elements.height().should('contain', 'm')
        pokemonPage.elements.weight()
            .should('contain', 'lbs')
            .and('contain', 'kg')

        pokemonPage.elements.abilities().should('have.length.at.least', 1)
        pokemonPage.elements.type().should('have.length.at.least', 1)        
    })

    it('Pokemon Exists', () => {
        pokemonPage.elements.pokemonName().should('exist')
        pokemonPage.elements.pokemonGenre().should('exist')
        pokemonPage.elements.pokemonImage()
            .should('be.visible')
            // img is a list
            .and(img => expect(img[0].naturalHeight).to.be.greaterThan(0))
            // Another Syntax:
            // .and('have.prop', 'naturalWidth')
            // .should('be.greaterThan', 0)
    })

    it('Pokemon Stats Table Exists', () => {
        pokemonPage.verifyStats()
    })
})