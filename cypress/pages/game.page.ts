/// <reference types="cypress" />

import { Interception } from "cypress/types/net-stubbing";
import { Navbar, NavbarElements } from "./shared/navbar";

interface GamePageElements {
    pokemonImage: () => Cypress.Chainable;
    correctAnswer: () => Cypress.Chainable;
    wrongAnswers: () => Cypress.Chainable;
    playAgainBtn: () => Cypress.Chainable;
    highestScore: () => Cypress.Chainable;
    currentScore: () => Cypress.Chainable;
    gameOver: () => Cypress.Chainable;
    provideCorrectAnswer: () => Cypress.Chainable;
    loadPokemonImage: () => Cypress.Chainable;

}

type GamePageAllElements = NavbarElements & GamePageElements

export class GamePage extends Navbar{
    elements:GamePageAllElements = {
        ...this.elements,
        pokemonImage: () => cy.getByDataTest('pokemon-image', undefined, 10000),
        correctAnswer: () => cy.getByDataTest('answer', '[data-answer-state="correct"]'),
        wrongAnswers: () => cy.getByDataTest('answer', '[data-answer-state="wrong"]'),
        playAgainBtn: () => cy.getByDataTest('play-again-btn'),
        highestScore: () => cy.getByDataTest('highest-score'),
        currentScore: () => cy.getByDataTest('current-score'),
        gameOver: () => cy.getByDataTest('game-over'),
    }

    provideCorrectAnswer() {
        return this.loadPokemonImage().then(() => this.elements.correctAnswer().click())
    }

    provideWrongAnswer() {
        return this.loadPokemonImage().then(() => this.elements.wrongAnswers().eq(0).click())
    }

    checkGameOver(){
        this.elements.gameOver().should('be.visible')
    }

    playAgain(){
        this.elements.playAgainBtn().click()
    }

    waitForQuizItemTimeOut(){
        const COUNTDOWN_PER_ROUND = 10000;
        cy.wait(COUNTDOWN_PER_ROUND)
    }

    validateScore(scoreType: 'currentScore' | 'highestScore', expectedScore: number){
        this.elements[scoreType]().invoke('text').should('equal', `${expectedScore}`)
    }

    loadPokemonImage(){
        return cy.wait('@pokemonRequest')
        .then(() => {
            this.elements.pokemonImage()
            .and(img => expect(img[0].naturalHeight).to.be.eq(0))
            this.elements.pokemonImage()
            .and(img => expect(img[0].naturalHeight).to.be.greaterThan(0))
            .then(() => {
                cy.wait(1000)
            })
        })
    }
}