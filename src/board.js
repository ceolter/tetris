import React, { memo, useEffect, useRef } from 'react';
import {useBoard} from "./boardEffect";

export function Board (props) {

    const [display, score, onKeyDown] = useBoard();
    const eBoard = useRef();

    useEffect(focusBoard, []);
    useEffect(passRowData, [display]);

    function passRowData() {
        props.addRowData(display);
    }

    function focusBoard() {
        eBoard.current.focus();
    }

    return (
        <div ref={eBoard} className={'t-board'} tabIndex={0} onKeyDown={ onKeyDown }>
            <div>
                <span className="t-score-label">Score:</span>
                <span className="t-score-label">{score.toLocaleString()}</span>
            </div>
            {display.map( (row, index) => <RowMemo row={row} key={index}/>)}
        </div>
    );
}

function Row(props) {
    return (
        <span className='t-row'>
            {props.row.map( (cell, index) => <CellMemo cell={cell} key={index}/>)}
        </span>
    );
}

function Cell(props) {
    const count = useRef(0);

    count.current++;

    const value = props.cell ? props.cell : 0;
    return (
        <span className={`t-cell t-cell-${value}`}></span>
    );
}

const CellMemo = memo(Cell);

const RowMemo = memo(Row);

export const BoardMemo = memo(Board);
