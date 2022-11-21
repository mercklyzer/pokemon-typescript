/// <reference types="cypress" />

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

    provideCorrectAnswer(interceptName:string) {
        cy.wait(interceptName)
        .then(() => {
            this.elements.pokemonImage()
            .and(img => expect(img[0].naturalHeight).to.be.eq(0))
            this.elements.pokemonImage()
            .and(img => expect(img[0].naturalHeight).to.be.greaterThan(0))
            .then(() => {
                cy.wait(1000)
                this.elements.correctAnswer().click()
            })
        })
    }
}