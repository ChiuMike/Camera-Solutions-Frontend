import {useRef, useEffect} from 'react';

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<Func extends SomeFunction>(func: Func) {

    const timer = useRef<Timer>();

    useEffect(() => {
        return () => {
            if (!timer.current) return;
            clearTimeout(timer.current);
        };
    }, []);

    const debouncedFunction = ((...args) => {
        const newTimer = setTimeout(() => {
            func(...args);
        }, 1000);
        if(timer.current)
            clearTimeout(timer.current);
            timer.current = newTimer;

    }) as Func;

  return debouncedFunction;
}