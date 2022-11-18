interface PokemonImageProps{
    width?:number;
    height?:number;
    device?:Cypress.ViewportPreset;
}

export class HomePage {
    elements = {
        navbar: () => cy.get('nav'),
        pokemonLogo: () => cy.get('nav [data-test="pokemon logo"]'),
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
    
}