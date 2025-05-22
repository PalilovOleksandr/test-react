import { useEffect, useState } from "react";


export default function Timer() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
            console.log(`Interval - ${Date.now()}`);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    return <p>TimerBox - {time.toLocaleTimeString()}</p>
}