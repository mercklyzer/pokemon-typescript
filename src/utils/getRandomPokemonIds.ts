import getRandomIdFromInterval from "./getRandomIdFromInterval";

const LOWEST_POKEMON_ID = parseInt(process.env.REACT_APP_LOWEST_POKEMON_ID!);
const HIGHEST_POKEMON_ID = parseInt(process.env.REACT_APP_HIGHEST_POKEMON_ID!);

const getRandomPokemonIds = (size:number):number[] => {
    let randomPokemonIds = [];
    
    while(randomPokemonIds.length !== size){
        const newId = getRandomIdFromInterval(LOWEST_POKEMON_ID, HIGHEST_POKEMON_ID);
        if(randomPokemonIds.indexOf(newId) === -1){
            randomPokemonIds.push(newId);
        } 
    }

    return randomPokemonIds;
}

export default getRandomPokemonIds;