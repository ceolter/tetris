import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from "./tetris/board";

function Game() {
    return (
        <>
            <div className='t-instructions'>
                <h1>Play Tetris!</h1>
                <p>
                    This is a Tiny Tetris application written in React using less than 200 lines of code.
                </p>
            </div>
            <div className="t-parent">
                <Board />
            </div>
        </>
    );
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
