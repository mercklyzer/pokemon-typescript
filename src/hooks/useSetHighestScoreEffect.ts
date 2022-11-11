import { useEffect } from "react";

const useSetHighestScoreEffect = (currentScore:number, highestScore:string|number, setHighestScore:(highestScore:number) => void) => {
    useEffect(() => {
        highestScore = localStorage.getItem("highestScore") || '0';
        if(highestScore !== null){
            highestScore = parseInt(highestScore);
            setHighestScore(highestScore);
        }
    }, [])

    useEffect(() => {
        if(currentScore > highestScore){
            setHighestScore(currentScore);
            localStorage.setItem("highestScore", `${currentScore}`);
        }
    }, [currentScore])
}

export default useSetHighestScoreEffect;