import { IPokemonAbility } from "./IPokemonAbility"
import { IPokemonStat } from "./IPokemonStat"
import { IPokemonType } from "./IPokemonType"

export interface IPokemon {
    id: number | string,
    Ab:IPokemonAbility[],
    BE: number,
    H: number,
    N: string,
    St: IPokemonStat[],
    T: IPokemonType[],
    W: number,
    thumbnail: string
}