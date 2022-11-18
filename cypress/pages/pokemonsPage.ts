import { Navbar, NavbarElements } from "./navbar";

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
}