import React, {useState, useContext} from 'react';

export const GlobalContext = React.createContext('light');

export function ContextFun() {

    const [color, setColor] = useState(1)

    return (
        <GlobalContext.Provider value={color}>
            <ChildComp/>
            <ChildFunc/>
            <button onClick={ ()=> {
                setColor( old => old + 1);
            }}>Push</button>
        </GlobalContext.Provider>
    );
}

class ChildComp extends React.Component {
    render() {
        return (
            <GlobalContext.Consumer>
                {
                    value => (
                        <>
                            ChildComp value = <span>{value}</span>
                        </>
                    )
                }
            </GlobalContext.Consumer>
        );
    }
}

function ChildFunc() {

    const value = useContext(GlobalContext);

    return (
        <>
            ChildFunc value = <span>{value}</span>
        </>
    );
}
