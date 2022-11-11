import getPokemonTypeColor from "../../utils/getPokemonTypeColor";
import getPokemonTypeShadow from "../../utils/getPokemonTypeShadow";

interface Props {
    type: string,
    className?: string
}

const PokemonTypeCard:React.FC<Props> = ({type, className}) => {
    return (
        <div className={`flex justify-center items-center rounded-xl px-2 py-1 mr-2 ${className}
            ${getPokemonTypeColor(type)} ${getPokemonTypeShadow(type)}
            lg:px-4`}>
                <span className="text-white capitalize mr-4">{type}</span>
                <img className="w-5" 
                    src={`/images/pokemon_types/${type}.png`} />
        </div>
    );
}

export default PokemonTypeCard;