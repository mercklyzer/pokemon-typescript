import axios from 'axios';
import { IGamePokemon } from '../models/Game/IGamePokemon';
import getRandomPokemonIds from '../utils/getRandomPokemonIds';

const gameApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
});

export const getPokemon = async (id:string|number):Promise<IGamePokemon> => {
    try {
        const response = await gameApi.get(`/${id}`);
        return response.data;
    } catch (err) {
        throw new Error("Error in getPokemon API");
    }
}

export const getRandomPokemons = async (size:number):Promise<IGamePokemon[]> => {
    const randomPokemonIds = getRandomPokemonIds(size);

    try {
        const pokemons = await Promise.all(randomPokemonIds.map((id:number) => getPokemon(id)));
        return pokemons;
    } catch(err) {
        throw new Error("Error in getRandomPokemons API");
    }
}