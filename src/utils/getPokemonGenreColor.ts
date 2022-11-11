interface PokemonColorToGenreColorMap {
    black:  string,
    red:    string,
    white:  string,
    green:  string,
    yellow: string,
    blue:   string,
    brown:  string,
    pink:   string,
    gray:   string,
    purple: string
}

const getPokemonGenreColor = (type:string) => {
    const pokemonGenreColorMap:PokemonColorToGenreColorMap = {
        black: 'bg-slate-400',
        red: 'bg-red-300',
        white: 'bg-gray-300',
        green: 'bg-green-400',
        yellow: 'bg-yellow-300',
        blue: 'bg-blue-300',
        brown: 'bg-yellow-700',
        pink: 'bg-pink-300',
        gray: 'bg-gray-500',
        purple: 'bg-fuchsia-600'
    };

    return pokemonGenreColorMap[type as keyof PokemonColorToGenreColorMap];
}

export default getPokemonGenreColor;