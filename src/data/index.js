const pokemons = require('./pokemons.json');
const species = require('./species.json');

module.exports = () => ({
    pokemons: [...pokemons.pokemons],
    species: [...species["pokemon-species"]],
});