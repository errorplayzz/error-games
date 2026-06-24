import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Number Guessing-Game.css";

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("Please enter a number between 1 and 100.");
      return;
    }
    setAttempts(attempts + 1);
    if (userGuess === targetNumber) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} tries.`);
    } else if (userGuess < targetNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }
  };

  const restartGame = () => {
    setTargetNumber(getRandomNumber());
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <div className="number-guessing-game" style={{ position: "relative" }}>
      <Link to="/" className="back-button">⬅ Back</Link>
      <h1>Number Guessing Game</h1>
      <p>Guess a number between 1 and 100:</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Guess</button>
      <p className="message">{message}</p>
      {message.includes("Correct") && <button onClick={restartGame}>Play Again</button>}
    </div>
  );
};

export default NumberGuessingGame;
