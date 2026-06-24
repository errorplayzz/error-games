import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Maze-Solver.css";

const SIZE = 10; // Maze size (10x10 grid)
const WALL = 1;
const PATH = 0;

const generateMaze = () => {
  const maze = Array(SIZE)
    .fill(null)
    .map(() =>
      Array(SIZE)
        .fill(null)
        .map(() => (Math.random() > 0.7 ? WALL : PATH))
    );
  maze[0][0] = PATH; // Start point
  maze[SIZE - 1][SIZE - 1] = PATH; // End point
  return maze;
};

const MazeSolver = () => {
  const [maze, setMaze] = useState(generateMaze());
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [solvedPath, setSolvedPath] = useState([]);
  const [message, setMessage] = useState("");

  const startNewMaze = () => {
    setMaze(generateMaze());
    setPlayerPos({ x: 0, y: 0 });
    setSolvedPath([]);
    setMessage("");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (playerPos.x === SIZE - 1 && playerPos.y === SIZE - 1) return; // Block move if won
      
      const { x, y } = playerPos;
      let newX = x;
      let newY = y;

      if (event.key === "ArrowUp" && y > 0) newY--;
      if (event.key === "ArrowDown" && y < SIZE - 1) newY++;
      if (event.key === "ArrowLeft" && x > 0) newX--;
      if (event.key === "ArrowRight" && x < SIZE - 1) newX++;

      if (maze[newY][newX] !== WALL) {
        setPlayerPos({ x: newX, y: newY });
        if (newX === SIZE - 1 && newY === SIZE - 1) {
          setMessage("🎉 You won! You reached the end!");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, maze]);

  const solveMaze = () => {
    const visited = Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(false));

    const path = [];
    const found = dfs(playerPos.x, playerPos.y, path, visited);

    if (found) {
      setSolvedPath(path);
      setMessage("");
    } else {
      setMessage("This maze is unsolvable! Try a new one.");
    }
  };

  const dfs = (x, y, path, visited) => {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE || maze[y][x] === WALL || visited[y][x]) {
      return false;
    }

    visited[y][x] = true;
    path.push({ x, y });

    if (x === SIZE - 1 && y === SIZE - 1) return true; // Goal reached

    const directions = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 },
    ];

    for (let { dx, dy } of directions) {
      if (dfs(x + dx, y + dy, path, visited)) return true;
    }

    path.pop(); // Backtrack
    return false;
  };

  return (
    <div className="maze-solver" style={{ position: "relative" }}>
      <Link to="/" className="back-button">⬅ Back</Link>
      <h1>Maze Solver</h1>
      <div className="maze">
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            let className = "cell";
            if (cell === WALL) className += " wall";
            if (playerPos.x === colIndex && playerPos.y === rowIndex) className += " player";
            if (solvedPath.some((p) => p.x === colIndex && p.y === rowIndex)) className += " path";
            return <div key={`${rowIndex}-${colIndex}`} className={className}></div>;
          })
        )}
      </div>
      {message && <p className="message" style={{marginBottom: "15px"}}>{message}</p>}
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={solveMaze}>Solve Maze</button>
        <button onClick={startNewMaze}>New Maze</button>
      </div>
    </div>
  );
};

export default MazeSolver;
