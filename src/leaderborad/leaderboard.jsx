import React from 'react';
import './leaderboard.css';
import backgroundVideo from '../assets/144259-784302971_medium.mp4';

export default function Leaderboard() {
    const leaderboardData = [
        { rank: 1, username: "John Doe", score: 95, time: "2:45", game: "Letter Game", date: "2024-03-15" },
        { rank: 2, username: "Jane Smith", score: 92, time: "3:12", game: "Word Game", date: "2024-03-14" },
        { rank: 3, username: "Alex Brown", score: 89, time: "3:30", game: "Letter Game", date: "2024-03-13" },
    ];

    return (
        <div className="leaderboard-page">
            <video 
                autoPlay 
                muted 
                loop 
                id="background-video"
                className="background-video"
                playsInline
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>
            
            <div className="leaderboard-container">
                <div className="content-wrapper">
                    <h1>Error Game Leaderboard</h1>

                    {/* Top Players Section */}
                    <div className="top-players">
                        <h2>Top Players</h2>
                        <div className="podium">
                            {leaderboardData.slice(0, 3).map((player, index) => (
                                <div key={index} className={`podium-place place-${index + 1}`}>
                                    <div className="trophy-icon">🏆</div>
                                    <span className="player-name">{player.username}</span>
                                    <span className="player-score">{player.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scores Table */}
                    <div className="score-table">
                        <h2>Detailed Rankings</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>Game</th>
                                    <th>Score</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.rank}</td>
                                        <td>{entry.username}</td>
                                        <td>{entry.game}</td>
                                        <td>{entry.score}</td>
                                        <td>{entry.time}</td>
                                        <td>{entry.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
