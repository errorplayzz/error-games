import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Typing-Speed.css';
import { useGameContext } from '../../context/GameContext';

const RANDOM_QUOTES = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of algorithm design and the craft of debugging errant code.",
    "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.",
    "Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting.",
    "To be, or not to be, that is the question.",
    "All those moments will be lost in time, like tears in rain.",
    "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion."
];

export default function TypingSpeed() {
    const { updateStats } = useGameContext();
    const [quote, setQuote] = useState("");
    const [input, setInput] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [wpm, setWpm] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        setQuote(RANDOM_QUOTES[Math.floor(Math.random() * RANDOM_QUOTES.length)]);
    }, []);

    useEffect(() => {
        let interval;
        if (isStarted && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isStarted) {
            finishGame();
        }
        return () => clearInterval(interval);
    }, [isStarted, timeLeft]);

    const finishGame = () => {
        setIsStarted(false);
        setIsFinished(true);
        const timeSpent = 30 - timeLeft || 1; // prevent divide by 0 if they type really fast
        const wordsTyped = input.trim().split(/\s+/).filter(word => word.length > 0).length;
        const calculatedWpm = Math.round((wordsTyped / timeSpent) * 60);
        setWpm(calculatedWpm);
        updateStats('typing', calculatedWpm);
    };

    const handleInput = (e) => {
        if (!isStarted && !isFinished) {
            setIsStarted(true);
        }
        
        const val = e.target.value;
        setInput(val);

        if (val === quote) {
            finishGame();
        }
    };

    const restartGame = () => {
        setQuote(RANDOM_QUOTES[Math.floor(Math.random() * RANDOM_QUOTES.length)]);
        setInput("");
        setIsStarted(false);
        setIsFinished(false);
        setTimeLeft(30);
        setWpm(0);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Calculate accuracy and render highlighted text
    const getHighlightedText = () => {
        return quote.split('').map((char, index) => {
            let color = "rgba(255, 255, 255, 0.5)"; // default
            if (index < input.length) {
                color = input[index] === char ? "#00ff00" : "#ff0033";
            }
            return <span key={index} style={{ color, textShadow: color !== "rgba(255, 255, 255, 0.5)" ? `0 0 10px ${color}` : "none" }}>{char}</span>;
        });
    };

    return (
        <div className="typing-game" style={{ position: "relative" }}>
            <Link to="/" className="back-button">⬅ Back</Link>
            <div className="header">
                <h1>Typing Speed Test</h1>
            </div>

            <div className="stats-bar">
                <div className="stat">Time: <span className="highlight">{timeLeft}s</span></div>
                {isFinished && <div className="stat">WPM: <span className="highlight">{wpm}</span></div>}
            </div>

            <div className="quote-display">
                {getHighlightedText()}
            </div>

            <textarea 
                ref={inputRef}
                className="typing-input"
                value={input}
                onChange={handleInput}
                disabled={isFinished}
                placeholder="Start typing to begin..."
                autoFocus
            />

            {isFinished && (
                <div className="results">
                    <h2>Time's Up!</h2>
                    <p>Your typing speed is <strong className="highlight">{wpm} WPM</strong></p>
                    <button className="reset-btn" onClick={restartGame}>Try Again</button>
                </div>
            )}
            
            {!isFinished && (
                <button className="reset-btn" onClick={restartGame}>Restart</button>
            )}
        </div>
    );
}
