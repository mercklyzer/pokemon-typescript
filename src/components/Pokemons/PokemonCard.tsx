import { useNavigate } from "react-router-dom";
import { IPokemonType } from "../../models/Pokemon/IPokemonType";
import PokemonTypeIcon from "./PokemonTypeIcon";

interface Props {
    id: number | string,
    name: string,
    types: IPokemonType[],
    thumbnail: string,
    onPokemonTypeIconClick: (e:React.MouseEvent<HTMLDivElement, MouseEvent>, type:string) => void
}

const PokemonCard:React.FC<Props> = ({id, name, types, thumbnail, onPokemonTypeIconClick}) => {
    const navigate = useNavigate();

    return (
        <div className="border-2 border-gray-300 p-1 flex flex-col cursor-pointer
            hover:bg-gray-200 duration-200
            md:p-2" 
            onClick={() => navigate(`/pokemons/${id}`)}
            data-test="pokemon-card">
            <div className="flex">
                <div className="flex-1 flex flex-col">
                    <h1 className="font-bold text-zinc-500 text-lg
                        md:text-xl">{id}</h1>
                    <h1 className="capitalize text-zinc-500
                        lg:text-xl">{name}</h1>
                </div>
                <div className="grid gap-0
                    md:gap-2">
                    {types?.map(({n, id}) => <PokemonTypeIcon key={id} type={n} onClick={(e) => onPokemonTypeIconClick(e,n)} />)}
                </div>
            </div>
            
            <img className="p-4 pb-2 object-fit
                xl:p-8" src={thumbnail} alt="Pokemon Thumbnail" />
        </div>
    );
}

export default PokemonCard;