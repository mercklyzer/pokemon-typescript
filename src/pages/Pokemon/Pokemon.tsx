import { useParams } from "react-router-dom";
import PokemonBasicInfoTable from "../../components/Pokemon/PokemonBasicInfoTable";
import PokemonStatsTable from "../../components/Pokemon/PokemonStatsTable";
import Padding from "../../components/shared/Padding";
import { usePokemonQuery, usePokemonSpecies } from "../../react-query/pokemonQuery";
import getPokemonGenreColor from "../../utils/getPokemonGenreColor";
import { PokemonDetails } from "../../models/Pokemon/PokemonDetails";
import { Oval } from "react-loader-spinner";

const Pokemon = () => {
    const {id} = useParams();
    const {pokemon:pokemonData, isFetching:isPokemonFetching, isSuccess} = usePokemonQuery(id!);
    const {species, isFetching:isSpeciesFetching, isSuccess:isSpeciesSuccess} = usePokemonSpecies(id!);

    let constructedPokemon!:PokemonDetails;
    if(pokemonData && species){
        constructedPokemon = new PokemonDetails(pokemonData, species);
    }

    return (
        <div className="flex">
            <Padding className="flex w-full ">
                <>
                    {(isPokemonFetching || isSpeciesFetching) && 
                        <div className='flex justify-center items-center w-full'>
                            <Oval
                                height={60}
                                width={60}
                                color="#EF4444"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#2873B9"
                                strokeWidth={3}
                                strokeWidthSecondary={3}
                                />
                        </div>
                    }
                </>
                
                {constructedPokemon && 
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="font-medium text-2xl uppercase text-gray-600
                        md:text-4xl md:font-semibold"
                        data-test="pokemon-name">{constructedPokemon.name}</h1>

                    {constructedPokemon.color && 
                        <span 
                            data-test="pokemon-genre"
                            className={`
                                ${getPokemonGenreColor(constructedPokemon.color)}
                                px-2 rounded-lg text-white mt-1
                                md:mt-2`}>{constructedPokemon.genre}</span>}
                    
                    <div className="flex justify-between w-full flex-col lg:flex-row">

                        <div className="flex items-center w-full justify-center flex-1">
                            <PokemonBasicInfoTable 
                                id={constructedPokemon.id}
                                height={constructedPokemon.height}
                                weight={constructedPokemon.weight}
                                abilities={constructedPokemon.abilities}
                                types={constructedPokemon.types}
                                color={constructedPokemon.color || 'black'}/>
                        </div>

                        <div className="flex flex-1 mb-16 lg:m-0">
                            <img src={constructedPokemon.image}
                                className="object-cover object-center mt-12" alt="Pokemon" data-test="pokemon-image"/>
                        </div>

                        <div className="flex items-center w-full justify-center flex-1 ">
                            <PokemonStatsTable 
                                hp={constructedPokemon.hp} 
                                attack={constructedPokemon.attack} 
                                defense={constructedPokemon.defense} 
                                spAttack={constructedPokemon.spAttack} 
                                spDefense={constructedPokemon.spDefense} 
                                speed={constructedPokemon.speed}
                                id={parseInt(id!)}/>
                        </div>
                    </div>

                    
                </div>}
            </Padding>
        </div>
    );
}

export default Pokemon;