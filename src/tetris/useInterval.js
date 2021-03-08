import React, {useEffect, useRef} from 'react';

export function useInterval(callback, delay) {

    const callbackRef = useRef();

    useEffect( ()=> {
        callbackRef.current = callback;
    }, [callback]);

    useEffect( ()=> {
        const interval = setInterval(()=> callbackRef.current(), delay);
        return ()=> clearInterval(interval);
    }, [delay]);

}