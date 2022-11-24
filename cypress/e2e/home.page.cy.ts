/// <reference types="cypress" />

import { HomePage } from "../pages/home.page"


describe('home page', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        cy.visit('/')
    })

    it('Home page elements are displaying',() => {
        homePage.navbarIsDisplaying()
        homePage.titleIsDisplaying()
        homePage.subtitleIsDisplaying()
        homePage.playGameBtnIsDisplaying()
        homePage.pokemonsListBtnIsDisplaying()

        homePage.elements.pokemonImage({device: 'iphone-xr'})
            .should('be.hidden')
        homePage.elements.pokemonImage({device: 'macbook-13'})
            .should('be.visible')
    })

    // BAD PRACTICE -> resetting a test is expensive. This should be done in unit tests
    // Anti-Pattern: Acting like you're writing unit tests.

    // it('Displaying navbar and only showing pokemon logo', () => {
    //     homePage
    //         .elements.navbar()
    //         .should('be.visible')

    //     homePage.
    //         elements.pokemonLogo()
    //         .should('be.visible')
    // })

    // it('Displaying title - Whos that pokemon', () => {
    //     homePage.elements.title()
    //         .contains("Who's That Pokemon?")
    //         .should('be.visible')
    // })

    // it("Displaying the subtitle", () => {
    //     homePage.elements.subtitle()
    //         .contains("Do you have what it takes to be the next Pokemon Master? Let's put your skills to test! Identify as many pokemons as you can.")
    //         .should('be.visible')
    // })

    // it("Displaying the Game Button", () => {
    //     homePage.elements.playGameBtn()
    //         .should('be.visible')
    // })

    // it("Displaying the Pokemons List Button", () => {
    //     homePage.elements.pokemonsListBtn()
    //         .should('be.visible')
    // })

    // it("Displaying the pokemon image in large screens", () => {
    //     homePage.elements.pokemonImage({width:1024, height:750})
    //         .should('be.visible')
    // })

    // it("Hiding the pokemon image in small screens", () => {
    //     homePage.elements.pokemonImage({device:'iphone-xr'})
    //         .should('be.hidden')
    // })
})