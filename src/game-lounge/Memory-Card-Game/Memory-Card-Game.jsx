import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Memory-Card-Game.css";

const initialCards = [
  "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉",
  "🍓", "🍓", "🥝", "🥝", "🍒", "🍒", "🍍", "🍍"
];

const shuffleCards = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryCardGame = () => {
  const [cards, setCards] = useState(shuffleCards([...initialCards]));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }, [flipped]);

  const handleClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped([...flipped, index]);
    }
  };

  const checkMatch = () => {
    const [first, second] = flipped;
    if (cards[first] === cards[second]) {
      setMatched([...matched, first, second]);
    }
    setFlipped([]);
    setMoves(moves + 1);
  };

  const restartGame = () => {
    setCards(shuffleCards([...initialCards]));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="memory-card-game" style={{ position: "relative" }}>
      <Link to="/" className="back-button">⬅ Back</Link>
      <h1>Memory Card Game</h1>
      <p>Moves: {moves}</p>
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(index) ? "flipped" : ""}`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </div>
        ))}
      </div>
      {matched.length === cards.length && <p className="win-message">🎉 You Won in {moves} Moves!</p>}
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default MemoryCardGame;
