import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundVideo from '../assets/144259-784302971_medium.mp4';
import tictactoeImage from '../assets/game-lounge/unnamed.png';
import MemoryCardGame from '../assets/game-lounge/playing-ace-cards-neon-sign_1262-14775.avif';
import rockpaperscissorsImage from "../assets/game-lounge/rock-paper-scissors-neon-icons-vector.jpg";
import numberguessinggameImage from "../assets/game-lounge/images.jpg";
import mazesolverImage from "../assets/game-lounge/istockphoto-1759350191-612x612.jpg";
import snakegameImage from "../assets/game-lounge/649576793c3fe77db6244f98-faxfsign-snake-shaped-neon-sign-green.jpg";
import game2048Image from "../assets/game-lounge/2048-icon.png";
import DailyChallenges from "./DailyChallenges";

export default function Home() {
    return (
        <div className="home-container">
            <video autoPlay muted loop className="background-video">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="header">
                <h1 className="glowing-text">Play your favorite games</h1>
            </div>
            
            <DailyChallenges />

            <div className="games-grid">
                <Link to="/tictactoe" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={tictactoeImage} alt="Tic Tac Toe" />
                        </div>
                        <h3>Tic Tac Toe</h3>
                    </div>
                </Link>

                <Link to="/MemoryCardGame" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={MemoryCardGame} alt="Memory Card Game" />
                        </div>
                        <h3>Memory Card Game</h3>
                    </div>
                </Link>

                <Link to="/rockpaperscissors" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={rockpaperscissorsImage} alt="Rock Paper Scissors" />
                        </div>
                        <h3>Rock Paper Scissors</h3>
                    </div>
                </Link>

                <Link to="/numberguessinggame" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={numberguessinggameImage} alt="Number Guessing Game" />
                        </div>
                        <h3>Number Guessing Game</h3>
                    </div>
                </Link>

                <Link to="/mazesolver" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={mazesolverImage} alt="Maze Solver" />
                        </div>
                        <h3>Maze Solver</h3>
                    </div>
                </Link>

                <Link to="/snakegame" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={snakegameImage} alt="Snake Game" />
                        </div>
                        <h3>Snake Game</h3>
                    </div>
                </Link>

                <Link to="/2048" className="game-card-link">
                    <div className="game-card">
                        <div className="game-image-wrapper">
                            <img src={game2048Image} alt="2048 Game" />
                        </div>
                        <h3>2048</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
} 