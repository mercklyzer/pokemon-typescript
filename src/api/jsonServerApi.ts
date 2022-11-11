import axios from 'axios';
import { IPokemon } from '../models/Pokemon/IPokemon';
import { IPokemonSpecies } from '../models/Species/IPokemonSpecies';

const JSON_SERVER_PORT = parseInt(process.env.REACT_APP_JSON_SERVER_PORT!) || 3500;

const jsonServer = axios.create({
    baseURL: `http://localhost:${JSON_SERVER_PORT}`
});

export const getPokemons = async ():Promise<IPokemon[]> => {
    try {
        const response = await jsonServer.get(`/pokemons`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error("Error in getPokemons API");
    }
}

export const getPokemon = async (id:number | string):Promise<IPokemon> => {
    try {
        const response = await jsonServer.get(`/pokemons/${id}`);
        return response.data;
    } catch (err) {
        throw new Error("Error in getPokemon API");
    }
}

export const getPokemonSpecies = async (id:number | string):Promise<IPokemonSpecies> => {
    try {
        const response = await jsonServer.get(`/species/${id}`);
        return response.data;
    } catch (err) {
        throw new Error("Error in getPokemon API");
    }
}