interface PokemonTypeToBackgroundColorMap {
    bug: string,
    dark: string,
    dragon: string,
    electric: string,
    fire: string,
    fairy: string,
    fighting: string,
    flying: string,
    ghost: string,
    grass: string,
    ground: string,
    ice: string,
    normal: string,
    poison: string,
    psychic: string,
    rock: string,
    steel: string,
    water: string
}

const getPokemonTypeColor = (type:string) : string => {
    const typeToColorMap:PokemonTypeToBackgroundColorMap = {
        bug: 'bg-bug',
        dark: 'bg-dark',
        dragon: 'bg-dragon',
        electric: 'bg-electric',
        fire: 'bg-fire',
        fairy: 'bg-fairy',
        fighting: 'bg-fighting',
        flying: 'bg-flying',
        ghost: 'bg-ghost',
        grass: 'bg-grass',
        ground: 'bg-ground',
        ice: 'bg-ice',
        normal: 'bg-normal',
        poison: 'bg-poison',
        psychic: 'bg-psychic',
        rock: 'bg-rock',
        steel: 'bg-steel',
        water: 'bg-water'
    };
    
    return typeToColorMap[type as keyof PokemonTypeToBackgroundColorMap];
}
export default getPokemonTypeColor;