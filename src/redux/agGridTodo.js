import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useMemo} from "react";
import {AgGridReact} from "ag-grid-react";

export function AgGridTodo() {

    const todos = useSelector( state => state.todos );
    const dispatch = useDispatch();

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
        <div style={{width: '500px', height: '500px'}}>
            <AgGridReact
                style={{width: '100%', height: '100%'}}
                columnDefs={columnDefs}
                rowData={todos}
                getRowNodeId={getRowNodeId}
                immutableData={true}
                className={'ag-theme-alpine'}/>
        </div>
    );
}
