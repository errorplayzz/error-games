import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Snake-Game.css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 }); 
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  // Init food
  useEffect(() => {
    setFood(generateFood(INITIAL_SNAKE));
  }, [generateFood]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === " ") {
        setIsPaused((p) => !p);
        event.preventDefault();
        return;
      }
      if (gameOver || isPaused) return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault(); // Stop window scroll
      }

      setDirection((prevDir) => {
        switch (event.key) {
          case "ArrowUp":
            if (prevDir.y === 0) return { x: 0, y: -1 };
            break;
          case "ArrowDown":
            if (prevDir.y === 0) return { x: 0, y: 1 };
            break;
          case "ArrowLeft":
            if (prevDir.x === 0) return { x: -1, y: 0 };
            break;
          case "ArrowRight":
            if (prevDir.x === 0) return { x: 1, y: 0 };
            break;
        }
        return prevDir;
      });
    },
    [gameOver, isPaused]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [moveSnake, speed, gameOver, isPaused]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
  };

  return (
    <div className="snake-game" style={{ position: "relative" }}>
      <Link to="/" className="back-button">⬅ Back</Link>
      <h1>Snake Game</h1>
      <p>Score: {score}</p>
      {gameOver && <p className="game-over">Game Over! Press Restart</p>}
      {isPaused && !gameOver && <p className="paused">Game Paused</p>}
      <div className="grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          const isHead = snake[0].x === col && snake[0].y === row;
          const isBody = snake.some((segment) => segment.x === col && segment.y === row);
          const isFood = food.x === col && food.y === row;

          let cellClass = "cell";
          if (isHead) cellClass += " snake-head";
          else if (isBody) cellClass += " snake";
          else if (isFood) cellClass += " food";

          return <div key={index} className={cellClass} />;
        })}
      </div>
      <div className="controls">
        <button onClick={restartGame}>Restart</button>
        <button onClick={() => setIsPaused(!isPaused)}>{isPaused ? "Resume" : "Pause"}</button>
      </div>
    </div>
  );
};

export default SnakeGame;
