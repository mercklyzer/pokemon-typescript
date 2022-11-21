/// <reference types="cypress" />

import { GamePage } from "../pages/game.page";



describe('home page', () => {
    const gamePage = new GamePage();

    beforeEach(() => {
        cy.visit('/game')
        cy.intercept('https://pokeapi.co/api/v2/pokemon/**').as('pokemonRequest')
    })

    it('3 Correct Pokemons and Timeout', () => {
        // cy.wrap(new Array(5)).each(() => {
        //     cy.wait('@pokemonRequest')
        //     cy.wait(1000)
        //     gamePage.elements.correctAnswer().click()
        //     cy.wait(1000)
        // })

        // gamePage.elements.gameOver().should('be.visible')
        // gamePage.elements.currentScore().invoke('text').should('equal', 5) 




        gamePage.provideCorrectAnswer('@pokemonRequest')
        gamePage.provideCorrectAnswer('@pokemonRequest')
        gamePage.provideCorrectAnswer('@pokemonRequest')
        gamePage.provideCorrectAnswer('@pokemonRequest')
        
        cy.wait('@pokemonRequest').then(() => {
            gamePage.elements.pokemonImage()
            .and(img => expect(img[0].naturalHeight).to.be.eq(0))
            gamePage.elements.pokemonImage()
            .and(img => expect(img[0].naturalHeight).to.be.greaterThan(0))
            .then(() => {
                cy.wait(10000)
        })})
        
        // .then(() => cy.wait(1000))
        
        // gamePage.elements.correctAnswer().click()
        // .then(() => cy.wait(1000))
        // .then(() => {
        //     gamePage.elements.correctAnswer().click()
        //     cy.wait(1000)
        // })
        // .then(() => gamePage.elements.correctAnswer().click())
        // .then(() => cy.wait(1000))
        // .then(() => gamePage.elements.currentScore().invoke('text').should('equal', '3'))
        // .then(() => cy.wait(11000))
        // .then(() => gamePage.elements.gameOver().should('is.visible'))
        

    })

})