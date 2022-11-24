/// <reference types="cypress" />
import { Navbar, NavbarElements } from "./shared/navbar";

type PokemonType =
    | 'bug'
    | 'dark' 
    | 'dragon' 
    | 'electric' 
    | 'fire' 
    | 'fairy' 
    | 'fighting' 
    | 'flying' 
    | 'ghost' 
    | 'grass' 
    | 'ground' 
    | 'ice' 
    | 'normal' 
    | 'poison' 
    | 'psychic' 
    | 'rock' 
    | 'steel' 
    | 'water'
;

interface PokemonsPageElements {
    pokemonCard: () => Cypress.Chainable;
    clearFiltersBtn: () => Cypress.Chainable;
    pokemonTypeFilterIcon: (type: PokemonType) => Cypress.Chainable;
    pokemonFilteredType: () => Cypress.Chainable;
    noPokemonsDisplayed: () => Cypress.Chainable;
};

type PokemonsPageAllElements = NavbarElements & PokemonsPageElements;

export class PokemonsPage extends Navbar {
    elements: PokemonsPageAllElements = {
        ...this.elements,
        pokemonCard: () => cy.get('[data-test="pokemon-card"]'),
        clearFiltersBtn: () => cy.get('[data-test="clear-filters-btn"]'),
        pokemonTypeFilterIcon: (type: PokemonType) => cy.get(`[data-test="pokemon-type-filter"] > [data-test="pokemon-${type}-icon"]`),
        pokemonFilteredType: () => cy.get('[data-test="pokemon-filtered-type"]'),
        noPokemonsDisplayed: () => cy.get('[data-test="no-pokemons-displayed"]')
    }

    clearFilters(){
        this.elements.clearFiltersBtn().click()
    }

    clearSearchPokemon(){
        this.elements.pokemonSearchBox().clear()
    }

    filterByType(type:PokemonType){
        this.elements.pokemonTypeFilterIcon(type).click()
    }

    findPokemonByScrolling(pokemonName:string, maxScroll:number, scrollCtr = 0){
        const DEBOUNCE_TIME = 200
        if(scrollCtr === maxScroll){
            throw new Error("Pokemon does not exist.")
        }

        cy.get(`[data-test="pokemon-card"]`).then(($pokemonCards) => {
            if($pokemonCards.find(`[pokemon-name=${pokemonName}]`).length === 0){
                this.loadPokemonThumbnails()
                cy.wait(DEBOUNCE_TIME + 1000)
                cy.scrollTo('bottom', {duration: 2000})
                this.findPokemonByScrolling(pokemonName, maxScroll, ++scrollCtr)
            }
            else{
                cy.get(`[pokemon-name=${pokemonName}]`).scrollIntoView({duration: 1000}).should('exist')
            }
        })
    }

    loadPokemonThumbnails(){
        return cy.get(`[alt="Pokemon Thumbnail"]`, { timeout: 10000 })
            .and(img => expect((img[0] as HTMLImageElement).naturalHeight).to.be.greaterThan(0))
    }
}