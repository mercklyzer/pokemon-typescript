interface PokemonTypeToShadowMap {
    bug:      string,
    dark:     string,
    dragon:   string,
    electric: string,
    fire:     string,
    fairy:    string,
    fighting: string,
    flying:   string,
    ghost:    string,
    grass:    string,
    ground:   string,
    ice:      string,
    normal:   string,
    poison:   string,
    psychic:  string,
    rock:     string,
    steel:    string,
    water:    string
}

const getPokemonTypeShadow = (type:string):string => {
    const typeToColorMap:PokemonTypeToShadowMap = {
        bug:      'shadow-bug',
        dark:     'shadow-dark',
        dragon:   'shadow-dragon',
        electric: 'shadow-electric',
        fire:     'shadow-fire',
        fairy:    'shadow-fairy',
        fighting: 'shadow-fighting',
        flying:   'shadow-flying',
        ghost:    'shadow-ghost',
        grass:    'shadow-grass',
        ground:   'shadow-ground',
        ice:      'shadow-ice',
        normal:   'shadow-normal',
        poison:   'shadow-poison',
        psychic:  'shadow-psychic',
        rock:     'shadow-rock',
        steel:    'shadow-steel',
        water:    'shadow-water'
    };

    return typeToColorMap[type as keyof PokemonTypeToShadowMap];
}

export default getPokemonTypeShadow;