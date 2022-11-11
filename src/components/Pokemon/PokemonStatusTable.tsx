import ProgressBar from '@ramonak/react-progress-bar';
import { useState } from 'react';

interface Props {
    hp:        number,
    attack:    number, 
    defense:   number, 
    spAttack:  number,
    spDefense: number, 
    speed:     number, 
    id:        number
}

const PokemonStatusTable:React.FC<Props> = ({hp, attack, defense, spAttack, spDefense, speed, id}) => {
    const [statsType, setStatsType] = useState('base');
    let displayHp!:          number, 
        displayAttack!:      number, 
        displayDefense!:     number, 
        displaySpAttack!:    number, 
        displaySpDefense!:   number, 
        displaySpeed!:       number, 
        displayMax!:         number;
    let total = [hp, attack, defense, spAttack, spDefense, speed].reduce((acc, x) => acc + x, 0);

    if(statsType === 'base'){
        displayHp = hp;
        displayAttack = attack;
        displayDefense = defense;
        displaySpAttack = spAttack;
        displaySpDefense = spDefense;
        displaySpeed = speed;
        displayMax = Math.max(hp, attack, defense, spAttack, spDefense, speed);
    }

    else if(statsType === 'max'){
        [displayHp, displayAttack, displayDefense, displaySpAttack, displaySpDefense, displaySpeed, displayMax] = 
            calculateMaxStats([hp, attack, defense, spAttack, spDefense, speed], id);
    }

    else if(statsType === 'min'){
        [displayHp, displayAttack, displayDefense, displaySpAttack, displaySpDefense, displaySpeed, displayMax] = 
            calculateMinStats([hp, attack, defense, spAttack, spDefense, speed], id);
    }


    return (
        <div className="flex items-center w-full justify-center statsDiv">
            <div className="inner">           
                <table className="">
                    <tbody>
                        <tr>
                            <td></td>
                            <td><button className={`p-1 ${statsType === 'base'? 'bg-blue-700 text-white' : 'border-blue-700 border-2 text-slate-600'} font-semibold rounded-lg mr-6
                                lg:p-2 lg:rounded-2xl`} onClick={() => setStatsType('base')}>Base</button></td>
                            <td><button className={`p-1 ${statsType === 'min'? 'bg-blue-700 text-white' : 'border-blue-700 border-2 text-slate-600'} font-semibold rounded-lg mr-6
                                lg:p-2 lg:rounded-2xl`} onClick={() => setStatsType('min')}>Min</button></td>
                            <td><button className={`p-1 ${statsType === 'max'? 'bg-blue-700 text-white' : 'border-blue-700 border-2 text-slate-600'} font-semibold rounded-lg
                                lg:p-2 lg:rounded-2xl`} onClick={() => setStatsType('max')}>Max</button></td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">HP</td>
                            <td className="text-slate-600 font-medium text-lg" colSpan={3}>
                                <div className="w-full bg-gray-300 rounded-lg overflow-hidden">
                                    <ProgressBar completed={displayHp} maxCompleted={displayMax} customLabel={`${displayHp}`} bgColor='#B8C370' animateOnRender={true}/>    
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Attack</td>
                            <td className="text-slate-600 font-medium text-lg py-2" colSpan={3}>
                                <ProgressBar completed={displayAttack} maxCompleted={displayMax} customLabel={`${displayAttack}`} bgColor='#B8C370' animateOnRender={true}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Defense</td>
                            <td className="text-slate-600 font-medium text-lg py-2" colSpan={3}>
                                <ProgressBar completed={displayDefense} maxCompleted={displayMax} customLabel={`${displayDefense}`} bgColor='#B8C370' animateOnRender={true}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Sp. Attack</td>
                            <td className="text-slate-600 font-medium text-lg py-2" colSpan={3}>
                                <ProgressBar completed={displaySpAttack} maxCompleted={displayMax} customLabel={`${displaySpAttack}`} bgColor='#B8C370' animateOnRender={true}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Sp. Defense</td>
                            <td className="text-slate-600 font-medium text-lg py-2" colSpan={3}>
                                <ProgressBar completed={displaySpDefense} maxCompleted={displayMax} customLabel={`${displaySpDefense}`} bgColor='#B8C370' animateOnRender={true}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Speed</td>
                            <td className="text-slate-600 font-medium text-lg py-2" colSpan={3}>
                                <ProgressBar completed={displaySpeed} maxCompleted={displayMax} customLabel={`${displaySpeed}`} bgColor='#B8C370' animateOnRender={true}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2 py-2 font-bold text-gray-600 text-md 
                                lg:pr-8 lg:text-lg">Total</td>
                            <td className="text-slate-600 font-medium text-lg py-2" colSpan={3}>
                                <span>{total}</span>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            <div className="flex items-center justify-center bioDiv">

        </div>
        </div>
    );
}


const calculateMaxStats = (stats:number[], id:number) => {
    let maxStats = [];
    if (id === 292) { // Shedinja HP
        maxStats[0] = 1;
    } else {
        maxStats[0] = Math.floor((2 * stats[0] + 31 + 63) * 100 / 100 + 100 + 10);
    }
    for (let i = 1; i < 6; i++) {
        maxStats[i] = Math.floor(Math.floor((2 * stats[i] + 31 + 63) * 100 / 100 + 5) * 1.1);
    }

    return [...maxStats, Math.max(...maxStats)];
}

const calculateMinStats = (stats:number[], id:number) => {
    let minStats = []
    if (id === 292) { // Shedinja HP
        minStats[0] = 1;
    } else {
        minStats[0] = Math.floor((2 * stats[0]) * 100 / 100 + 100 + 10);
    }
    for (let i = 1; i < 6; i++) {
      minStats[i] = Math.floor(Math.floor((2 * stats[i]) * 100 / 100 + 5) * 0.9);
    }
    
    return [...minStats, Math.max(...minStats)];
}

export default PokemonStatusTable;