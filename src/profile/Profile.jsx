import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Link, Navigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    const { user } = useGameContext();

    if (!user) {
        return <Navigate to="/" />;
    }

    const xpForNextLevel = user.level * 500;
    const progressPercentage = (user.xp / xpForNextLevel) * 100;

    return (
        <div className="profile-page">
            <Link to="/" className="back-button">⬅ Back</Link>
            
            <div className="profile-header">
                <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <div className="level-badge">Level {user.level}</div>
                </div>
            </div>

            <div className="xp-container">
                <div className="xp-text">
                    <span>XP Progress</span>
                    <span>{user.xp} / {xpForNextLevel} XP</span>
                </div>
                <div className="xp-bar-bg">
                    <div className="xp-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <div className="profile-content">
                <div className="stats-section">
                    <h2>Game Statistics</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span>Tic Tac Toe Wins</span>
                            <strong>{user.stats.tictactoeWins}</strong>
                        </div>
                        <div className="stat-card">
                            <span>Snake High Score</span>
                            <strong>{user.stats.snakeHighScore}</strong>
                        </div>
                        <div className="stat-card">
                            <span>Mazes Solved</span>
                            <strong>{user.stats.mazeSolved}</strong>
                        </div>
                        <div className="stat-card">
                            <span>RPS Wins</span>
                            <strong>{user.stats.rockPaperScissorsWins}</strong>
                        </div>
                        <div className="stat-card">
                            <span>2048 High Score</span>
                            <strong>{user.stats.game2048HighScore}</strong>
                        </div>
                    </div>
                </div>

                <div className="achievements-section">
                    <h2>Unlocked Achievements</h2>
                    {user.achievements.length === 0 ? (
                        <p className="no-data">No achievements unlocked yet. Go play some games!</p>
                    ) : (
                        <div className="achievements-grid">
                            {user.achievements.map((ach, idx) => (
                                <div key={idx} className="achievement-card">
                                    <span className="trophy">🏆</span>
                                    <span>{ach}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
