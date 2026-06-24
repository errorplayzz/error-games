import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './navbar/navbar';
import Leaderboard from './leaderborad/leaderboard';
import Home from './home/Home';
import TicTacToe from './game-lounge/Tic-Tac-Toe/tic-tac-toe';
import MemoryCardGame from './game-lounge/Memory-Card-Game/Memory-Card-Game';
import SnakeGame from './game-lounge/Snake-Game/Snake-Game';
import RockPaperScissors from './game-lounge/Rock-Paper-Scissors/Rock-Paper-Scissors';
import NumberGuessingGame from './game-lounge/Number Guessing-Game/Number Guessing-Game';
import MazeSolver from './game-lounge/Maze-Solver/Maze-Solver';
import Game2048 from './game-lounge/2048/2048';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/MemoryCardGame" element={<MemoryCardGame />} />
          <Route path="/SnakeGame" element={<SnakeGame />} />
          <Route path="/RockPaperScissors" element={<RockPaperScissors />} />
          <Route path="/NumberGuessingGame" element={<NumberGuessingGame />} />
          <Route path="/MazeSolver" element={<MazeSolver />} />
          <Route path="/2048" element={<Game2048 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
