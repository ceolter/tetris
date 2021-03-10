import React, {useCallback, useMemo} from 'react';

import {createStore} from 'redux';
import {Provider, useDispatch, useSelector} from "react-redux";
import {AgGridReact} from "ag-grid-react";

const initialState = {
    todos: [],
    todosMap: {}
};

let idSequence = 0;

const todoReducer = (state = initialState, action)=> {

    const updateTodo = (id, callback) => {
        const newList = [...state.todos];
        const oldItem = state.todosMap[id];
        const newItem = {...oldItem};
        callback(newItem);
        const indexOfItem = state.todos.indexOf(oldItem);
        newList[indexOfItem] = newItem;
        const newMap = {...state.todosMap};
        newMap[id] = newItem;
        return [newList, newMap];
    };

    switch (action.type) {
        case 'add': {
            const newId = idSequence++;
            const newItem = {
                id: newId,
                complete: false,
                description: 'new item'
            };
            const newMap = {...state.todosMap};
            newMap[newId] = newItem;
            return {...state, todos: [...state.todos, newItem], todosMap: newMap};
        }
        case 'updateDescription': {
            const id = action.payload.id;
            const newDescription = action.payload.value;
            const [newList, newMap] = updateTodo(id, todo => todo.description = newDescription);
            return {...state, todos: newList, todosMap: newMap};
        }
        case 'setComplete': {
            const id = action.payload.id;
            const newComplete = action.payload.value;
            const [newList, newMap] = updateTodo(id, todo => todo.complete = newComplete);
            return {...state, todos: newList, todosMap: newMap};
        }
        default: {
            return state
        }
    }
};

let store = createStore(todoReducer)

export function ReduxFun() {
    return (
        <Provider store={store}>
            <ReduxFunChild/>
        </Provider>
    );
}

function ReduxFunChild() {

    const todos = useSelector( state => state.todos );
    const dispatch = useDispatch();

    const onAdd = useCallback( () => dispatch({type: 'add'}) );
    const getRowNodeId = useCallback( data => data.id );

    const onCompleteClicked = useCallback( (id, newValue) => {
        dispatch({type: 'setComplete', payload: {id, value: newValue}});
    } );

    const descriptionValueSetter = useCallback( params =>
        dispatch({type: 'updateDescription', payload: {value: params.newValue, id: params.data.id}})
    );

    const completeFormatter = useCallback( params => '' + params.value );

    const columnDefs = useMemo( () => [
        {
            field: 'complete',
            width: 100,
            valueFormatter: completeFormatter,
            cellRendererFramework: function CompleteCellRenderer(props) {
                const onClick = useCallback(
                    onCompleteClicked.bind(this, props.data.id, !props.data.complete)
                );
                return (
                    <span onClick={onClick}>{props.value ? '\u2714' : '\u2716'}</span>
                );
            }
        },
        {
            field: 'description',
            width: 200,
            editable: true,
            valueSetter: descriptionValueSetter
        },
    ]);

    return (
        <div>
            <div>
                <button onClick={onAdd}>Add</button>
            </div>
            <div style={{width: '500px', height: '500px'}}>
                <AgGridReact
                    style={{width: '100%', height: '100%'}}
                    columnDefs={columnDefs}
                    rowData={todos}
                    getRowNodeId={getRowNodeId}
                    immutableData={true}
                    className={'ag-theme-alpine'}/>
            </div>
        </div>
    );
}
