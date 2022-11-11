import { useEffect, useRef, useState } from "react";

const useCountdown = (initialTime:number)
    :[timeRemaining:number, setTimeRemaining:(time:number)=>void, clearCountdown:()=>void] => {
        const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
        const countdownRef = useRef<NodeJS.Timer>();

        useEffect(() => {
            countdownRef.current = setInterval(() => {
                if(timeRemaining > 0){
                    setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
                }
                else{
                    clearCountdown();
                }
            }, 1000);

            return clearCountdown;
        }, [timeRemaining])

        const clearCountdown = () => clearInterval(countdownRef.current);
        return [timeRemaining, setTimeRemaining, clearCountdown];
}

export default useCountdown;