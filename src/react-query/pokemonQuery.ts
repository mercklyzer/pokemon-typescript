import { useQuery } from "react-query"
import { getRandomPokemons } from "../api/gameApi";
import { getPokemon, getPokemons, getPokemonSpecies } from "../api/jsonServerApi";
import { IPokemon } from "../models/Pokemon/IPokemon";
import { IPokemonSpecies } from "../models/Species/IPokemonSpecies";
// import { getRandomPokemons } from "../api/pokemonApi";
import leftPad from "../utils/leftPad";

export const usePokemonsQuery = () => {
    const {data:pokemons, isSuccess, isFetching, isLoading, refetch} = useQuery<IPokemon[], Error>(
        ["pokemons"], 
        getPokemons,
        {
            refetchOnWindowFocus: false,
            select: (pokemons) => pokemons.map(pokemon => {
                return {...pokemon, thumbnail: `/images/pokemon_thumbnails/${leftPad(pokemon.id, 3)}.png`}
            }),
            staleTime: Infinity
        });

    return {pokemons, isSuccess, isFetching, isLoading, refetch};
}

export const usePokemonQuery = (id:number | string) => {
    const {isLoading, data:pokemon, isSuccess, isFetching} = useQuery<IPokemon, Error>(
        ["pokemon", id], 
        () => getPokemon(id), 
        {
            refetchOnWindowFocus: false,
            select: (pokemon) => ({...pokemon, thumbnail: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${leftPad(pokemon.id, 3)}.png`})
        });

    return {isLoading, pokemon, isSuccess, isFetching};
}

export const usePokemonSpecies = (id:number | string) => {
    const {isLoading, data:species, isSuccess, isFetching} = useQuery<IPokemonSpecies, Error>(
        ["species", id], 
        () => getPokemonSpecies(id), 
        {
            refetchOnWindowFocus: false,
        });

    return {isLoading, species, isSuccess, isFetching};
}

export const useRandomPokemonsQuery = (size:number, onSuccess:() => void) => {
    const {isLoading, isFetching, data:pokemons, isSuccess, refetch} = useQuery(
        ["randomPokemons"], 
        () => getRandomPokemons(size),
        {refetchOnWindowFocus: false,
        onSuccess: onSuccess});

    return {isLoading, isFetching, pokemons, isSuccess, refetch};
}