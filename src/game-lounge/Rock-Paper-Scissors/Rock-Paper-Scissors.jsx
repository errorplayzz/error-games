import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Rock-Paper-Scissors.css";
import { useGameContext } from "../../context/GameContext";

const choices = ["Rock", "Paper", "Scissors"];

const RockPaperScissors = () => {
  const { updateStats } = useGameContext();
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);
    determineWinner(choice, randomChoice);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a Tie!");
    } else if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setResult("You Win!");
      updateStats('rockpaperscissors', 'win');
    } else {
      setResult("You Lose!");
    }
  };

  return (
    <div className="rps-game" style={{ position: "relative" }}>
      <Link to="/" className="back-button">⬅ Back</Link>
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {userChoice && (
        <div className="results">
          <p>You chose: <strong>{userChoice}</strong></p>
          <p>Computer chose: <strong>{computerChoice}</strong></p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
