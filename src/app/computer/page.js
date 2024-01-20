"use client"

import Board from "@/components/Board";
import React, { useState, useEffect } from 'react';
import { convertToMatrix, evaluate, bestMove } from "@/script/evaluate";

const cross = 1, circle = -1, empty = 0;

const initialBoardState = (order) => {
    return Array.from({ length: order * order }, (_, index) => empty);
};

const Page = () => {
    const [_order, _setOrder] = useState(3);
    const [_turn, _setTurn] = useState(cross);

    useEffect(() => {
        // Extract query parameters from window.location.search
        const urlParams = new URLSearchParams(window.location.search);
        
        // Get the values for _order and _turn, or use default values
        const orderParam = urlParams.get('_order') || 3;
        const turnParam = urlParams.get('_turn') || 'cross';

        // Set the state based on the query parameters
        _setOrder(orderParam);
        _setTurn(turnParam === 'cross' ? cross : circle);
    }, []);

    const [order, setOrder] = useState(3);
    const [size, setSize] = useState(500);
    const [boardState, setBoard] = useState(() => initialBoardState(3))
    const [turn, setTurn] = useState(cross)
    const [gameState, setGameState] = useState({ cross_score: 0, circle_score: 0, stillGoing: true })

    // Update boardState and reset gameState when order changes
    useEffect(() => {
        setBoard(initialBoardState(order));
        setTurn(cross); // Reset turn to cross
        setGameState(evaluate(order, initialBoardState(order)));
    }, [order]);
    useEffect(() => {
        setGameState(evaluate(order, convertToMatrix(order, boardState)));
    }, [boardState]);
    useEffect(() => {
        setOrder(_order)
    }, [_order]);
    useEffect(() => {
        if (turn === _turn)
        {
            const b = convertToMatrix( order,boardState);
            handleBoardUpdate(bestMove(b , order, turn));
        }
    }, [turn]);

    // Define the onChange functions
    const handleOrderChange = (num_order) => {
        if (num_order >= 3) {
            setOrder(num_order, () => {
                // This callback ensures that the state has been updated when evaluating the game state
                const newBoardState = initialBoardState(num_order);
                setBoardState(newBoardState);
                setTurn(cross);
                setGameState(evaluate(num_order, newBoardState));
            });
        } else {
            console.error("order of tictactoe must be equal or greater than 3");
        }
    };
    const handleSizeChange = (num_size) => {
        setSize(num_size);
    };
    const handleBoardUpdate = (index) => {
        // Check if the clicked cell is empty
        if (boardState[index] === empty) {
            // Create a new array with the updated board state
            const newBoard = [...boardState];
            newBoard[index] = turn;

            // Update the board state
            setBoard(newBoard);

            // Switch turns
            setTurn(turn === cross ? circle : cross);
        }
    };

    return (
        <div>
            <div>
                <Board order={order} size={size} turn={turn} boardState={boardState} handleBoardUpdate={handleBoardUpdate} />
                <div style={styles.gameState}>
                    <h2>Game State</h2>
                    <p>Cross Score: {gameState.cross_score}</p>
                    <p>Circle Score: {gameState.circle_score}</p>
                    <p>Still Going: {gameState.stillGoing.toString()}</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    board: {
        alignItems: 'center',
    },
    gameState: {
        display: 'inline-block'
    },
};

export default Page;