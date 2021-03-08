import {useRef, useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

export function FunImperativeHandle() {

    const myRef = useRef()

    const callback = useCallback( ()=> {
        myRef.current.increment();
    });

    return (
        <>
            <ChildComp ref={myRef}/>
            <button onClick={callback}>Click Me</button>
        </>
    );
}

function ChildComp(paramsm, ref) {

    const [count, setCount] = useState(1);

    useImperativeHandle( ref, ()=> ({
        increment: ()=> {
            setCount((val)=> val+1 );
        }
    }));

    return (
        <>
            Child<br/>
            Count = {count}
        </>
    );
}

ChildComp = forwardRef(ChildComp);