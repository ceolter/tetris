import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, {useRef, useEffect, useMemo, useCallback, useState} from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {ROW_COUNT} from "./boardEffect";

export function AgDashboard(props) {

    const cols = useMemo(createCols, []);

    const [selectedRows, setSelectedRows] = useState([]);

    const frameworkComponents = useMemo(()=> ({
        myCellRenderer: MyCellRenderer
    }), []);

    function createCols() {
        return Array(ROW_COUNT).fill(0).map( (ignore, index) => ({
            field: 'row' + index,
            headerName: index,
            valueGetter: (params) => {
                const row = params.data['row' + index];
                const res = row.reduce( ((a ,b) => a + b), 0)
                return res;
            },
            width: 50,
            resizable: true,
            cellRenderer: 'myCellRenderer'
        }));
    }

    const getRowId = useCallback( (data)=> {
            return data.key;
    }, []);

    return (
        <div className="t-dashboard">
            {selectedRows.map( row => <div>Selected Row: id = {row.key}</div>)}
            <AgGridReact className="t-ag-grid ag-theme-alpine"
                         immutableData={true}
                         rowData={props.rowData}
                         getRowNodeId={getRowId}
                         rowSelection="multiple"
                         frameworkComponents={frameworkComponents}
                         onSelectionChanged={ (e)=> setSelectedRows(e.api.getSelectedRows())}
            >
                {cols.map( (colDef) => <AgGridColumn key={colDef.field} {...colDef}/>)}
            </AgGridReact>
        </div>
    );

}

export function MyCellRenderer(props) {

    // console.log('render');
    return (
        <span>{props.value}</span>
    );

}