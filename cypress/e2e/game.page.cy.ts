/// <reference types="cypress" />

import { GamePage } from "../pages/game.page";

describe('home page', () => {
    const gamePage = new GamePage();

    beforeEach(() => {
        cy.visit('/game')
        cy.intercept('https://pokeapi.co/api/v2/pokemon/**').as('pokemonRequest')
    })

    it('3 Correct Pokemons and Timeout', () => {
        gamePage.provideCorrectAnswer()
        gamePage.provideCorrectAnswer()
        gamePage.provideCorrectAnswer()
        
        gamePage.loadPokemonImage()
        gamePage.waitForQuizItemTimeOut()
        gamePage.checkGameOver()
        gamePage.validateScore("currentScore", 3)   
    })

    it('3 Correct Pokemons and 1 Wrong Pokemon', () => {
        gamePage.provideCorrectAnswer()
        gamePage.provideCorrectAnswer()
        gamePage.provideCorrectAnswer()

        gamePage.provideWrongAnswer()

        gamePage.checkGameOver()
        gamePage.validateScore("currentScore", 3)
    })

    it('1 Correct Pokemon, 1 Wrong Pokemon, Play Again, 1 Wrong Pokemon', () => {
        gamePage.provideCorrectAnswer()
        gamePage.provideWrongAnswer()

        gamePage.checkGameOver()
        gamePage.validateScore('highestScore', 1)
        gamePage.validateScore('currentScore', 1)

        gamePage.playAgain()

        gamePage.provideWrongAnswer()
        gamePage.validateScore('highestScore', 1)
        gamePage.validateScore('currentScore', 0)
    })

    it.only('Persistent Highest Score,', () => {
        gamePage.provideCorrectAnswer()
        gamePage.provideCorrectAnswer()
        gamePage.provideCorrectAnswer()

        gamePage.validateScore('highestScore', 3)
        gamePage.validateScore('currentScore', 3)
        
        cy.wait(1000)
        cy.reload()

        gamePage.validateScore('highestScore', 3)
        gamePage.validateScore('currentScore', 0)
    })

})