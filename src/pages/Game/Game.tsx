import Padding from "../../components/shared/Padding";
import { useRandomPokemonsQuery } from "../../react-query/pokemonQuery";
import SelectAnswerButton from "../../components/Game/SelectAnswerButton";
import useCountdown from "../../hooks/useCountdown";
import { useEffect, useState } from "react";
import useSetHighestScoreEffect from "../../hooks/useSetHighestScoreEffect";
import shuffleList from "../../utils/shuffleList";
import { IGamePokemon } from "../../models/Game/IGamePokemon";
import { Oval } from "react-loader-spinner";

const POKEMON_OPTIONS_SIZE = parseInt(process.env.REACT_APP_POKEMON_OPTIONS_SIZE!);
const INITIAL_COUNTDOWN_TIME = parseInt(process.env.REACT_APP_INITIAL_COUNTDOWN_TIME!);

const Game:React.FC = () => {
    const [timeRemaining, setTimeRemaining, clearCountdown] = useCountdown(INITIAL_COUNTDOWN_TIME);
    const [highestScore, setHighestScore] = useState<number>(0);
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [isShowPokemon, setIsShowPokemon] = useState<boolean>(false);
    const [isAnswersClickable, setIsAnswersClickable] = useState<boolean>(true);
    const isGameOver = timeRemaining === 0;
    
    let {isFetching, isSuccess, pokemons, refetch} = useRandomPokemonsQuery(
        POKEMON_OPTIONS_SIZE,
        () => setIsShowPokemon(false));

    // not a state since no UI is dependent on this. they are dependent on correctPokemon and options
    // incorrectPokemons is only a part of options
    let incorrectPokemons; 
    let [correctPokemon, setCorrectPokemon] = useState<IGamePokemon | null>(null);
    let [options, setOptions] = useState<IGamePokemon[] | null>(null);

    useEffect(() => {
        if(!isFetching && isSuccess && pokemons){ 
            console.log(pokemons[0].name);
            setCorrectPokemon(pokemons[0]);
            
            let newIncorrectPokemons = [];
            for(let i = 1; i < pokemons.length; i++){
                newIncorrectPokemons.push(pokemons[i]);
            }
            let newOptions = [
                {name: pokemons[0].name, id:pokemons[0].id}, 
                ...newIncorrectPokemons.map(pokemon => ({name: pokemon.name, id: pokemon.id}))
            ];
            newOptions = shuffleList<IGamePokemon>(newOptions);

            incorrectPokemons = newIncorrectPokemons;
            setOptions(newOptions);
            setTimeRemaining(INITIAL_COUNTDOWN_TIME);
        }

    }, [isFetching, isSuccess]);

    useSetHighestScoreEffect(currentScore, highestScore, setHighestScore);

    const handleAnswerClick = (answer:string):void => {
        setIsAnswersClickable(false);
        setSelectedAnswer(answer);
        if(answer === correctPokemon?.name){
            setCurrentScore(prevScore => prevScore + 1);
            setIsShowPokemon(true);
            clearCountdown();
            
            setTimeout(() => {
                goToNextPokemon();
            }, 3000);
            
        }
        else{
            setTimeRemaining(0); // automatically concludes game over
        }
    }

    const goToNextPokemon = () => {
        refetch();
        setIsAnswersClickable(true);
        //resetting timer is done in useeffect since it is dependent on !isFetching (= true if API call is done)
    }

    const handlePlayAgain = () => {
        goToNextPokemon();
        setCurrentScore(0);
    }

    return (
        <div className="min-h-[calc(100vh-60px)]">
            <Padding className="h-full">
                <div className="flex justify-center items-center flex-col h-full">
                    <h1 className="font-bold text-2xl mb-4
                        md:text-4xl md:mb-8">
                        Who's That Pokemon?
                    </h1>

                    <div className="p-6 bg-green-primary rounded-lg relative mt-6">
                        {isSuccess && correctPokemon && <>
                            <div className="px-4 py-2 top-0 left-1/2 bg-red-500 absolute rounded-full -translate-x-1/2 -translate-y-1/2 text-white">{timeRemaining}</div>
                            {correctPokemon.sprites && !isFetching && <img className={`w-60 ${isGameOver || isShowPokemon? '': 'brightness-0'}`} src={correctPokemon.sprites["front_default"]} alt="Pokemon to guess"/>}
                            </>
                        }
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

                    <div className="mt-6 flex items-center flex-col">
                        {isGameOver && <h1 className="text-2xl font-bold mb-2">Game Over!</h1>}
                        <h2>Highest Score: {highestScore}</h2>
                        <h2>Current Score: {currentScore}</h2>
                        {isGameOver && <button className="mt-4 px-4 py-2 bg-black text-white rounded-xl text-sm
                            md:text-lg" onClick={handlePlayAgain}>Play Again</button>}
                    </div>

                    <div className="grid grid-rows-2 grid-cols-2 gap-6 mt-6">
                        {correctPokemon && options?.map(({id, name}) => <SelectAnswerButton 
                            key={id}
                            answer={name}
                            isGameOver={isGameOver}
                            isAnswersClickable={isAnswersClickable}
                            isCorrect={name === correctPokemon!.name}
                            selectedAnswer={selectedAnswer}
                            onClick={handleAnswerClick}/>)
                        }
                    </div>
                </div>
            </Padding>
        </div>
    );
}

export default Game;