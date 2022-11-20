import { IPokemonAbility } from "../../models/Pokemon/IPokemonAbility";
import { IPokemonType } from "../../models/Pokemon/IPokemonType";
import getPokemonGenreColor from "../../utils/getPokemonGenreColor";
import PokemonTypeCard from "../shared/PokemonTypeCard";

interface Props {
    id: number | string,
    height: number,
    weight: number,
    abilities: IPokemonAbility[],
    types: IPokemonType[],
    color: string
}

const PokemonBasicInfoTable:React.FC<Props> = ({id, height, weight, abilities, types, color}) => {
    const heightInMeters = getHeightInMeters(height);
    const heightInFeetInches = getHeightInFeetInches(heightInMeters);
    const weightInKilos = getWeightInKilos(weight);
    const weightInPounds = getWeightInPounds(weightInKilos);

    return (
        <div className="flex items-center justify-center bioDiv" data-test="pokemon-basic-info-table">
            <div className="flex inner">           
                <table className="flex">
                    <tbody>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">ID</td>
                            <td className="text-slate-600 font-medium text-md
                                lg:text-lg" data-test="id">#{id}</td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Height</td>
                            <td className="text-slate-600 font-medium text-md
                                lg:text-lg" data-test="height">{heightInMeters}m ({heightInFeetInches})</td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Weight</td>
                            <td className="text-slate-600 font-medium text-md
                                lg:text-lg" data-test="weight">{weightInKilos}kg ({weightInPounds}lbs)</td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Abilities</td>
                            <td className="text-slate-600 font-medium text-md
                                lg:text-lg" data-test="abilities">
                                <div className="flex flex-wrap">
                                    {abilities.map(({n}) => 
                                        <div key={n} className={`${getPokemonGenreColor(color)} mr-2 mb-2 text-white p-1 uppercase text-xs
                                            lg:px-2 lg:py-1 lg:text-lg`}>{n}</div>)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Type</td>
                            <td className="text-slate-600 font-medium text-md
                                lg:text-lg" data-test="type">
                                <div className="flex flex-wrap">
                                    {types.map(({n}) => <PokemonTypeCard className="mb-2" type={n} key={n} />)}
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
}

const getHeightInMeters = (height:number|string):string => (Number(height) * 0.1).toFixed(1);
const getHeightInFeetInches = (heightInMeters:number|string):string => Math.floor(Number(heightInMeters) * 3.2808) + '"' + Math.round(((Number(heightInMeters) * 3.2808) % 1) * 12) + '\'';
const getWeightInKilos = (weight:number|string):string => (Number(weight) * 0.1).toFixed(1);
const getWeightInPounds = (weightInKilos:number|string):string => (Number(weightInKilos) * 2.205).toFixed(1);

export default PokemonBasicInfoTable;