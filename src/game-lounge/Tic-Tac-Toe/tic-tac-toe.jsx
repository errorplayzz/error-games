import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./tic-tac-toe.css";
import backgroundVideo from '../../assets/144259-784302971_medium.mp4';

const TicTacToe = () => { 
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game-container" style={{ position: "relative" }}>
      <Link to="/" className="back-button">⬅ Back</Link>
      {/* <video 
                autoPlay 
                muted 
                loop 
                id="background-video"
                className="background-video"
                playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video> */}
      <div className="header"><h1>Tic-Tac-Toe</h1></div>
      <div className="board">
        {board.map((cell, index) => (
          <button 
            key={index} 
            className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ""}`} 
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}

      </div>
      <p className="status">
        {winner 
          ? `Winner: ${winner}` 
          : isDraw 
          ? "Game Draw!" 
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </p>
      <button className="reset-btn" onClick={handleReset}>Reset Game</button>
    </div>
  );
};

// Function to check winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;


