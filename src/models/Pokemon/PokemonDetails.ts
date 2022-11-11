import { IPokemonSpecies } from "../Species/IPokemonSpecies";
import { IPokemon } from "./IPokemon";
import { IPokemonAbility } from "./IPokemonAbility";
import { IPokemonType } from "./IPokemonType";

export class PokemonDetails {
    id:string | number;
    name:string;
    image:string;

    height:number;
    weight:number;
    types:IPokemonType[];
    abilities:IPokemonAbility[];

    hp:number;
    attack:number;
    defense:number;
    spAttack:number;
    spDefense:number;
    speed:number;

    color:string;
    genre:string;

    constructor(pokemon:IPokemon, species:IPokemonSpecies){
        this.id = pokemon.id,
        this.name = pokemon.N,
        this.image = pokemon.thumbnail,
        
        this.height = pokemon.H,
        this.weight = pokemon.W,
        this.types = pokemon.T,
        this.abilities = pokemon.Ab,
        
        this.hp = pokemon.St[0]['bs'], 
        this.attack = pokemon.St[1]['bs'], 
        this.defense = pokemon.St[2]['bs'], 
        this.spAttack = pokemon.St[3]['bs'], 
        this.spDefense = pokemon.St[4]['bs'],
        this.speed = pokemon.St[5]['bs'],

        this.color = species.Co,
        this.genre = species.G
    }
}