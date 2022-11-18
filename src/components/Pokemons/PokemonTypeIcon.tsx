import ReactTooltip from "react-tooltip";
import getPokemonTypeColor from "../../utils/getPokemonTypeColor";
import getPokemonTypeShadow from "../../utils/getPokemonTypeShadow";
import { nanoid } from 'nanoid'

interface Props {
    type: string,
    onClick: (e:React.MouseEvent<HTMLDivElement>) => void
}

const PokemonTypeIcon:React.FC<Props> = ({type, onClick}) => {
    const uniqueId = nanoid(5);
    return (
        <div data-test={`pokemon-${type}-icon`} data-tip data-for={`${uniqueId}-${type}-filter-icon`} className={`${getPokemonTypeColor(type)} rounded-full p-1 flex justify-center items-center w-6 h-6 cursor-pointer
            ${getPokemonTypeShadow(type)}
            hover:scale-[1.1] duration-200
            hover:saturate-[200%]
            
            md:w-8 md:h-8 md:p-2`}
            onClick={onClick}>
            <img className="w-full h-full object-fit"
                src={`/images/pokemon_types/${type}.png`} />

            <ReactTooltip id={`${uniqueId}-${type}-filter-icon`} place="top" type="dark" effect="float">
                {type}
            </ReactTooltip>
        </div>
    );
}

export default PokemonTypeIcon;