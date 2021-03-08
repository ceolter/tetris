import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BoardMemo} from "./board";
import {AgDashboard} from "./agDashboard";
import {RtDashboard} from "./rtDashboard";
import {RtOlympicWinners} from "./rtOlympicWinners";

function Game() {

    const [rowData, setRowData] = useState([]);

    const rowStamp = useRef(0);

    const [color, setColor] = useState(1);

/*    const addRowData = useMemo(()=> (item)=> {
        setRowData( (old)=> {
            const record = {};
            item.forEach( (row,i) => record['row'+i] = row);
            record.key = rowStamp.current++;
            return old.concat([record]);
        } );
    }, []);*/

/*
    const addRowData = useRef((item)=> {
        setRowData( (old)=> {
            const record = {};
            item.forEach( (row,i) => record['row'+i] = row);
            record.key = rowStamp.current++;
            return old.concat([record]);
        } );
    });
*/

    const addRowData = useCallback((item)=> {
        setRowData( (old)=> {
            const record = {};
            item.forEach( (row,i) => record['row'+i] = row);
            record.key = rowStamp.current++;
            return old.concat([record]);
        } );
    }, []);

/*
    const addRowData = (item)=> {
        setRowData( (old)=> {
            const record = {};
            item.forEach( (row,i) => record['row'+i] = row);
            record.key = rowStamp.current++;
            return old.concat([record]);
        } );
    };
*/

    return (
        <div className="t-parent">
            <BoardMemo addRowData={addRowData}/>
            {/*<AgDashboard rowData={rowData}/>*/}
            {/*<RtDashboard rowData={rowData}/>*/}
            {/*<RtOlympicWinners/>*/}
            {/*<ContextFun/>*/}
        </div>
    );
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
