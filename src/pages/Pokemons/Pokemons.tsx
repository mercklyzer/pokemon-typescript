import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'react-router-dom';
import PokemonCard from "../../components/Pokemons/PokemonCard";
import PokemonTypeIcon from '../../components/Pokemons/PokemonTypeIcon';
import Padding from "../../components/shared/Padding";
import PokemonTypeCard from '../../components/shared/PokemonTypeCard';
import { IPokemon } from '../../models/Pokemon/IPokemon';
import { usePokemonsQuery } from "../../react-query/pokemonQuery";
import paginateList from '../../utils/paginateList';
import { Oval } from "react-loader-spinner";
import useDebounce from '../../hooks/useDebounce';

const NUMBER_OF_POKEMONS_PER_PAGE:number = 20;
const POKEMON_TYPES:string[] = [
    'bug','dark','dragon','electric','fire','fairy','fighting','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water'
];

const Pokemons:React.FC = () => {
    const { ref, inView } = useInView();
    const debouncedInView = useDebounce<boolean>(inView, 200);
    const [nextPage, setNextPage] = useState<number>(1);
    const {pokemons, isSuccess, isFetching} = usePokemonsQuery();
    const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);
    const [displayedPokemons, setDisplayedPokemons] = useState<IPokemon[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const pokemonTypeFilter = searchParams.get("type") || '';
    const pokemonNameFilter = searchParams.get("name") || '';

    const appendNewPage = (list:IPokemon[]) => {
        const newPage = paginateList<IPokemon>(list, NUMBER_OF_POKEMONS_PER_PAGE, nextPage);
        setNextPage(currentPage => currentPage + 1);
        setDisplayedPokemons((prevPokemons) => [...prevPokemons, ...newPage]);
    }

    const displayNewPage = (list:IPokemon[]) => {
        const newPage = paginateList<IPokemon>(list, NUMBER_OF_POKEMONS_PER_PAGE, 1);
        setDisplayedPokemons([...newPage]);
        setNextPage(2);
    }

    useEffect(() => {
        if(debouncedInView && isSuccess){
            if(pokemonTypeFilter === '' && pokemonNameFilter === ''){
                appendNewPage(pokemons!);
            }
            else{
                appendNewPage(filteredPokemons);
            }
        }

    }, [debouncedInView, isSuccess]);

    useEffect(() => {
        if(isSuccess){
            let renderPokemons:IPokemon[];
            const pokemonsByName = pokemons?.filter(pokemon => pokemon["N"].includes(pokemonNameFilter)) || [];
            renderPokemons = pokemonsByName;

            if(pokemonTypeFilter !== ''){
                const pokemonsByType = pokemonsByName?.filter(pokemon => pokemon["T"].filter(type => type.n.includes(pokemonTypeFilter)).length)
                renderPokemons = pokemonsByType;
            }

            setFilteredPokemons(renderPokemons);
            displayNewPage(renderPokemons);
            window.scrollTo(0, 0);
        }

        searchParams.set("type", pokemonTypeFilter);
        searchParams.set("name", pokemonNameFilter);
        setSearchParams(searchParams);
    }, [pokemonTypeFilter, pokemonNameFilter, isSuccess]);

    const clearFilters = () => {
        searchParams.set("name", "");
        searchParams.set("type", "");
        setSearchParams(searchParams);
    }

    const handlePokemonTypeIconClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, type:string):void => {
        e.stopPropagation();
        searchParams.set("type", type);
        setSearchParams(searchParams);
    }

    return (
        <Padding>
            <div className='flex justify-center'>
                <div data-test="pokemon-type-filter" className='grid grid-cols-6 gap-x-4 gap-y-2
                    sm:grid-cols-8
                    lg:grid-cols-9'>
                    {POKEMON_TYPES.map((type) => <PokemonTypeIcon key={type} type={type} onClick={(e) => handlePokemonTypeIconClick(e, type)}/>)}
                </div>
            </div>
            <div className='flex justify-center items-center mt-4'>
                <button onClick={() => clearFilters()} data-test="clear-filters-btn"
                    className="bg-black text-white rounded-xl px-2 py-1
                        md:px-4 lg:py-2 lg:rounded-2xl">Clear Filters</button>
            </div>
            <div className='flex my-4 items-center' data-test="pokemon-filtered-type">
                <span className='mr-2 text-gray-600 font-bold text-lg'>Type: </span>
                {pokemonTypeFilter !== ''? <PokemonTypeCard type={pokemonTypeFilter}/>: <span className='text-gray-600 text-lg'>All</span>}
            </div>
            <div className="grid grid-cols-2
                sm:grid-cols-4
                md:grid-cols-4
                lg:grid-cols-6
                xl:grid-cols-8
                2xl:grid-cols-14">
                {displayedPokemons?.map(({id, N, thumbnail, T}) => {
                    return <PokemonCard key={id} id={id} name={N} types={T} thumbnail={thumbnail} onPokemonTypeIconClick={handlePokemonTypeIconClick}/>
                })}
            </div>
        
            <div className='flex justify-center items-center w-full'>
                {isSuccess && displayedPokemons.length === 0 && <div data-test="no-pokemons-displayed">No pokemons to be displayed.</div>}
                {isFetching && <Oval
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
                    />}
            </div>
            
            <>
                {displayedPokemons.length > 0 && <button className='h-0 overflow-hidden' ref={ref}>Fetch more</button>}
            </>
        </Padding>
    );
}

export default Pokemons;