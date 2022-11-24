/// <reference types="cypress" />
import { Navbar, NavbarElements } from "./shared/navbar"

interface PokemonPageElements {
    basicInfo: () => Cypress.Chainable;
    id: () => Cypress.Chainable;
    height: () => Cypress.Chainable;
    weight: () => Cypress.Chainable;
    abilities: () => Cypress.Chainable;
    type: () => Cypress.Chainable;

    pokemonName: () => Cypress.Chainable;
    pokemonGenre: () => Cypress.Chainable;
    pokemonImage: () => Cypress.Chainable;

    hpHeader: () => Cypress.Chainable;
    attackHeader: () => Cypress.Chainable;
    defenseHeader: () => Cypress.Chainable;
    spAttackHeader: () => Cypress.Chainable;
    spDefenseHeader: () => Cypress.Chainable;
    speedHeader: () => Cypress.Chainable;
    totalHeader: () => Cypress.Chainable;
    hpValue: () => Cypress.Chainable;
    attackValue: () => Cypress.Chainable;
    defenseValue: () => Cypress.Chainable;
    spAttackValue: () => Cypress.Chainable;
    spDefenseValue: () => Cypress.Chainable;
    speedValue: () => Cypress.Chainable;
    totalValue: () => Cypress.Chainable;

    baseBtn: () => Cypress.Chainable;
    minBtn: () => Cypress.Chainable;
    maxBtn: () => Cypress.Chainable;

};

type PokemonPageAllElements = NavbarElements & PokemonPageElements;
type NumberField = 
    | 'hpValue'
    | 'attackValue'
    | 'defenseValue'
    | 'spAttackValue'
    | 'spDefenseValue'
    | 'speedValue'
    | 'totalValue';


export class PokemonPage extends Navbar {
    elements: PokemonPageAllElements = {
        ...this.elements,
        basicInfo: () => cy.get('[data-test="pokemon-basic-info-table"]'),
        id: () => cy.get('[data-test="id"]'),
        height: () => cy.get('[data-test="height"]'),
        weight: () => cy.get('[data-test="weight"]'),
        abilities: () => cy.get('[data-test="abilities"]'),
        type: () => cy.get('[data-test="type"]'),

        pokemonName: () => cy.get('[data-test="pokemon-name"]'),
        pokemonGenre: () => cy.get('[data-test="pokemon-genre"]'),
        pokemonImage: () => cy.get('[data-test="pokemon-image"]'),

        hpHeader: () => cy.get('[data-test="hp"] td:first-child'),
        attackHeader: () => cy.get('[data-test="attack"] td:first-child'),
        defenseHeader: () => cy.get('[data-test="defense"] td:first-child'),
        spAttackHeader: () => cy.get('[data-test="spAttack"] td:first-child'),
        spDefenseHeader: () => cy.get('[data-test="spDefense"] td:first-child'),
        speedHeader: () => cy.get('[data-test="speed"] td:first-child'),
        totalHeader: () => cy.get('[data-test="total"] td:first-child'),

        hpValue: () => cy.get('[data-test="hp"] td:last-child span'),
        attackValue: () => cy.get('[data-test="attack"] td:last-child span'),
        defenseValue: () => cy.get('[data-test="defense"] td:last-child span'),
        spAttackValue: () => cy.get('[data-test="spAttack"] td:last-child span'),
        spDefenseValue: () => cy.get('[data-test="spDefense"] td:last-child span'),
        speedValue: () => cy.get('[data-test="speed"] td:last-child span'),
        totalValue: () => cy.get('[data-test="total"] td:last-child span'),

        baseBtn: () => cy.get('[data-test="base-btn"]'),
        minBtn: () => cy.get('[data-test="min-btn"]'),
        maxBtn: () => cy.get('[data-test="max-btn"]'),
    }

    shouldBeANumber(field:NumberField){
        this.elements[field]()
            .should('exist')
            .invoke('text')
            .then(text => expect(Number(text)).to.be.a('number'))
            // .should('match', /^([1-9]\d*|0)$/g) -> another way to assert number
    }

    statsShouldBeNumbers(){
        const statsValueFields:NumberField[] = ['hpValue','attackValue','defenseValue','spAttackValue','spDefenseValue','speedValue','totalValue'];
        statsValueFields.forEach(field => this.shouldBeANumber(field))
    }

    verifyBasicInfo(){
        this.elements.basicInfo()
            .should($info => {
                expect($info).to.contain('ID')
                expect($info).to.contain('Height')
                expect($info).to.contain('Weight')
                expect($info).to.contain('Abilities')
                expect($info).to.contain('Type')
            })
        
        // ^Another syntax:
            // .should('contain', 'ID')
            // .should('contain', 'Height')
            // .should('contain', 'Weight')
            // .should('contain', 'Abilities')
            // .should('contain', 'Type')

        // ^Another syntax:
            // .should('contain', 'ID')
            // .and('contain', 'Height')
            // .and('contain', 'Weight')
            // .and('contain', 'Abilities')
            // .and('contain', 'Type')
    }

    verifyStats(){
        this.elements.hpHeader().should('exist')
        this.statsShouldBeNumbers();

        this.elements.minBtn().click()
        cy.wait(3000)
        this.statsShouldBeNumbers();

        this.elements.maxBtn().click()
        cy.wait(3000)
        this.statsShouldBeNumbers();

        this.elements.baseBtn().click()
        cy.wait(3000)
        this.statsShouldBeNumbers();
    }
}