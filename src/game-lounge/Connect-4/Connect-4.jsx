import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Connect-4.css';
import { useGameContext } from '../../context/GameContext';

const ROWS = 6;
const COLS = 7;

export default function Connect4() {
    const { updateStats } = useGameContext();
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true); // Player 1 is Red, Player 2 is Yellow
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [rewardGiven, setRewardGiven] = useState(false);

    useEffect(() => {
        if (winner && !rewardGiven) {
            updateStats('connect4', 'win');
            setRewardGiven(true);
        }
    }, [winner, rewardGiven, updateStats]);

    const checkWin = (board, row, col, player) => {
        const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1] // Horizontal, Vertical, Diagonal 1, Diagonal 2
        ];

        for (let [dr, dc] of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
                const r = row + dr * i;
                const c = col + dc * i;
                if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player) break;
                count++;
            }
            for (let i = 1; i < 4; i++) {
                const r = row - dr * i;
                const c = col - dc * i;
                if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player) break;
                count++;
            }
            if (count >= 4) return true;
        }
        return false;
    };

    const dropPiece = (colIndex) => {
        if (winner || isDraw) return;

        let rowIndex = -1;
        for (let r = ROWS - 1; r >= 0; r--) {
            if (!board[r][colIndex]) {
                rowIndex = r;
                break;
            }
        }

        if (rowIndex === -1) return; // Column is full

        const newBoard = board.map(row => [...row]);
        const currentPlayer = isPlayer1Turn ? 'R' : 'Y';
        newBoard[rowIndex][colIndex] = currentPlayer;

        setBoard(newBoard);

        if (checkWin(newBoard, rowIndex, colIndex, currentPlayer)) {
            setWinner(currentPlayer);
        } else if (newBoard.every(row => row.every(cell => cell !== null))) {
            setIsDraw(true);
        } else {
            setIsPlayer1Turn(!isPlayer1Turn);
        }
    };

    const handleReset = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
        setIsPlayer1Turn(true);
        setWinner(null);
        setIsDraw(false);
        setRewardGiven(false);
    };

    return (
        <div className="connect4-game" style={{ position: "relative" }}>
            <Link to="/" className="back-button">⬅ Back</Link>
            <div className="header">
                <h1>Connect 4</h1>
            </div>

            <div className="status-box">
                {winner ? (
                    <span className={`winner-text ${winner === 'R' ? 'text-red' : 'text-yellow'}`}>
                        {winner === 'R' ? 'Red' : 'Yellow'} Wins! 🎉
                    </span>
                ) : isDraw ? (
                    <span>It's a Draw!</span>
                ) : (
                    <span className={`turn-indicator ${isPlayer1Turn ? 'text-red' : 'text-yellow'}`}>
                        {isPlayer1Turn ? "Red's Turn" : "Yellow's Turn"}
                    </span>
                )}
            </div>

            <div className="board-container">
                <div className="connect4-board">
                    {board.map((row, rIndex) => (
                        row.map((cell, cIndex) => (
                            <div 
                                key={`${rIndex}-${cIndex}`} 
                                className="connect4-cell" 
                                onClick={() => dropPiece(cIndex)}
                            >
                                <div className={`token ${cell === 'R' ? 'red' : cell === 'Y' ? 'yellow' : ''}`}></div>
                            </div>
                        ))
                    ))}
                </div>
            </div>

            <button className="reset-btn" onClick={handleReset}>Restart Game</button>
        </div>
    );
}
