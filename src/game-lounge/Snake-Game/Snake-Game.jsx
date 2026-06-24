import React, { useState, useEffect, useRef } from "react";
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
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoop = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    startGame();
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameLoop.current);
    };
  }, []);

  useEffect(() => {
    if (!isPaused && !gameOver) {
      gameLoop.current = setInterval(() => {
        setDirection(nextDirection);
        moveSnake();
      }, speed);
    }
    return () => clearInterval(gameLoop.current);
  }, [nextDirection, isPaused, gameOver, speed]);

  function startGame() {
    gameLoop.current = setInterval(() => {
      setDirection(nextDirection);
      moveSnake();
    }, speed);
  }

  function handleKeyPress(event) {
    if (event.key === " ") {
      togglePause();
      return;
    }
    if (isPaused || gameOver) return;

    const { x, y } = direction;

    switch (event.key) {
      case "ArrowUp":
        if (y === 0) setNextDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
        if (y === 0) setNextDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
        if (x === 0) setNextDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
        if (x === 0) setNextDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }

  function togglePause() {
    if (gameOver) return;
    setIsPaused(!isPaused);
  }

  function moveSnake() {
    if (gameOver || isPaused) return;

    const newSnake = [...snake];
    const newHead = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (checkCollision(newHead)) {
      setGameOver(true);
      clearInterval(gameLoop.current);
      return;
    }

    newSnake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood(newSnake));
      setScore(score + 10);
      adjustSpeed();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function checkCollision(head) {
    return (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
  }

  function generateFood(snakeBody) {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  function adjustSpeed() {
    const newSpeed = Math.max(MIN_SPEED, speed - SPEED_INCREMENT);
    setSpeed(newSpeed);
  }

  function restartGame() {
    clearInterval(gameLoop.current);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    startGame();
  }

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
          return (
            <div
              key={index}
              className={`cell ${
                isHead
                  ? "snake-head"
                  : snake.some(segment => segment.x === col && segment.y === row)
                  ? "snake"
                  : food.x === col && food.y === row
                  ? "food"
                  : ""
              }`}
            />
          );
        })}
      </div>
      <div className="controls">
        <button onClick={restartGame}>Restart</button>
        <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
      </div>
    </div>
  );
};

export default SnakeGame;
