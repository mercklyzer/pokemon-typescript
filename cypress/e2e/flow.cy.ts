import { HomePage } from "../pages/home.page"
import { PokemonPage } from "../pages/pokemon.page"
import { PokemonsPage } from "../pages/pokemons.page"

describe('User Flow', () => {
    const homePage = new HomePage()
    const pokemonsPage = new PokemonsPage()
    const pokemonPage = new PokemonPage()

    beforeEach(() => {
        cy.visit('/')
    })

    it('Homepage to Pokemon Details', () => {
        homePage.elements.pokemonsListBtn().click()
        cy.location('pathname').should('equal', '/pokemons')

        pokemonsPage.searchPokemon('zapdos')
        cy.location('search').should('eq', '?type=&name=zapdos')
        pokemonsPage.elements.pokemonCard('zapdos').should('exist').click()

        cy.location('pathname').should('match', /^\/pokemons\/[1-9]{1}\d?\d?/g)
        pokemonPage.verifyBasicInfo()
        pokemonPage.verifyStats()
    })
})