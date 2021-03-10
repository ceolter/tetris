import React, {useCallback} from 'react';

import {createStore} from 'redux';
import {Provider, useDispatch} from "react-redux";
import {todoReducer} from "./todoReducer";
import {AgGridTodo} from "./agGridTodo";
import {ReactTableTodo} from "./reactTableTodo";

let store = createStore(todoReducer)

export function ReduxFun() {
    return (
        <Provider store={store}>
            <TodoComp/>
        </Provider>
    );
}

function TodoComp() {

    const onAdd = useCallback( () => dispatch({type: 'add'}) );
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button onClick={onAdd}>Add</button>
            </div>
            <div style={{display: 'flex'}}>
                <AgGridTodo/>
                <ReactTableTodo/>
            </div>
        </div>
    );
}