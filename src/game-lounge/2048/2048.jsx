import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './2048.css';
import { useGameContext } from '../../context/GameContext';

const Game2048 = () => {
    const [grid, setGrid] = useState(getInitialGrid());
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const { updateStats } = useGameContext();
    const [rewardGiven, setRewardGiven] = useState(false);

    useEffect(() => {
        if (gameOver && !rewardGiven) {
            updateStats('2048', score);
            setRewardGiven(true);
        }
    }, [gameOver, score, rewardGiven, updateStats]);

    function getInitialGrid() {
        const initialGrid = Array(4).fill().map(() => Array(4).fill(0));
        addRandomTile(initialGrid);
        addRandomTile(initialGrid);
        return initialGrid;
    }

    function addRandomTile(currentGrid) {
        let emptyCells = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
            }
        }
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            currentGrid[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver || gameWon) return;

            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
                move(e.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [grid, gameOver, gameWon]);

    const move = (direction) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        let changed = false;
        let pointsEarned = 0;

        const slideAndMerge = (row) => {
            // Remove zeros
            let filteredRow = row.filter(val => val !== 0);
            
            // Merge adjacent equal tiles
            for (let i = 0; i < filteredRow.length - 1; i++) {
                if (filteredRow[i] === filteredRow[i + 1]) {
                    filteredRow[i] *= 2;
                    pointsEarned += filteredRow[i];
                    filteredRow.splice(i + 1, 1);
                }
            }
            
            // Add zeros back
            while (filteredRow.length < 4) {
                filteredRow.push(0);
            }
            return filteredRow;
        };

        if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
            for (let r = 0; r < 4; r++) {
                let row = newGrid[r];
                if (direction === 'ArrowRight') row.reverse();
                let newRow = slideAndMerge(row);
                if (direction === 'ArrowRight') newRow.reverse();
                if (row.join(',') !== newRow.join(',')) changed = true;
                newGrid[r] = newRow;
            }
        } else if (direction === 'ArrowUp' || direction === 'ArrowDown') {
            for (let c = 0; c < 4; c++) {
                let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
                if (direction === 'ArrowDown') col.reverse();
                let newCol = slideAndMerge(col);
                if (direction === 'ArrowDown') newCol.reverse();
                if (col.join(',') !== newCol.join(',')) changed = true;
                for (let r = 0; r < 4; r++) {
                    newGrid[r][c] = newCol[r];
                }
            }
        }

        if (changed) {
            addRandomTile(newGrid);
            setGrid(newGrid);
            setScore(prev => prev + pointsEarned);
            checkGameState(newGrid);
        }
    };

    const checkGameState = (currentGrid) => {
        // Check for Win
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (currentGrid[r][c] === 2048) {
                    setGameWon(true);
                    return;
                }
            }
        }

        // Check for Game Over (no empty cells and no possible merges)
        let hasEmpty = false;
        let canMerge = false;

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (currentGrid[r][c] === 0) hasEmpty = true;
                if (c < 3 && currentGrid[r][c] === currentGrid[r][c + 1]) canMerge = true;
                if (r < 3 && currentGrid[r][c] === currentGrid[r + 1][c]) canMerge = true;
            }
        }

        if (!hasEmpty && !canMerge) {
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setGrid(getInitialGrid());
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setRewardGiven(false);
    };

    return (
        <div className="game-2048">
            <Link to="/" className="back-button">⬅ Back</Link>
            <h1>2048</h1>
            
            <div className="game-header">
                <div className="score-box">
                    <span>Score</span>
                    <strong>{score}</strong>
                </div>
                <button className="restart-btn" onClick={restartGame}>Restart</button>
            </div>

            <p className="instructions">Use your <strong>Arrow Keys</strong> to merge tiles and reach <strong>2048</strong>!</p>

            <div className="board-container">
                {gameOver && <div className="overlay"><h2>Game Over!</h2></div>}
                {gameWon && <div className="overlay win"><h2>You Win!</h2></div>}
                
                <div className="board">
                    {grid.map((row, rIdx) => 
                        row.map((val, cIdx) => (
                            <div key={`${rIdx}-${cIdx}`} className={`tile tile-${val}`}>
                                {val !== 0 ? val : ''}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Game2048;
