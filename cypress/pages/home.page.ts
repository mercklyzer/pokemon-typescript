/// <reference types="cypress" />
import { Navbar, NavbarElements } from "./shared/navbar";

interface PokemonImageProps{
    width?:number;
    height?:number;
    device?:Cypress.ViewportPreset;
}

interface HomePageElements {
    title: () => Cypress.Chainable
    subtitle: () => Cypress.Chainable
    playGameBtn: () => Cypress.Chainable
    pokemonsListBtn: () => Cypress.Chainable
    pokemonImage: ({width, height, device}:PokemonImageProps) => Cypress.Chainable
}

type HomePageAllElements = NavbarElements & HomePageElements

export class HomePage extends Navbar{
    elements:HomePageAllElements = {
        ...this.elements,
        title: () => cy.get('[data-test="title"]'),
        subtitle: () => cy.get('[data-test="subtitle"]'),
        playGameBtn: () => cy.get('[data-test="play-game-btn"]'),
        pokemonsListBtn: () =>  cy.get('[data-test="pokemons-list-btn"]'),
        pokemonImage: ({width, height, device}:PokemonImageProps) => {
            if(!width && !height && !device){
                width = Cypress.config('viewportWidth') || 1024;
                height = Cypress.config('viewportHeight') || 768;
            }

            if(!width || !height && device){
                return cy.viewport(device!).get('[data-test="pokemon-image"]')
            }

            return cy.viewport(width!, height!).get('[data-test="pokemon-image"]')
        } 

    }

    titleIsDisplaying(){
        this.elements.title()
            .contains("Who's That Pokemon?")
            .should('be.visible')
    }

    subtitleIsDisplaying(){
        this.elements.subtitle()
            .contains("Do you have what it takes to be the next Pokemon Master? Let's put your skills to test! Identify as many pokemons as you can.")
            .should('be.visible')
    }
    
    playGameBtnIsDisplaying(){
        this.elements.playGameBtn()
            .should('be.visible')
    }

    pokemonsListBtnIsDisplaying(){
        this.elements.pokemonsListBtn()
            .should('be.visible')
    }
    
}