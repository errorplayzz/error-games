import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import './leaderboard.css';
import backgroundVideo from '../assets/144259-784302971_medium.mp4';

export default function Leaderboard() {
    const { user } = useGameContext();
    const [activeTab, setActiveTab] = useState('global');

    // Mock data for other players
    const mockGlobalPlayers = [
        { username: "NeonKnight", score: 15200, level: 32 },
        { username: "CyberSamurai", score: 14850, level: 30 },
        { username: "PixelQueen", score: 13900, level: 28 },
        { username: "RetroMaster", score: 12000, level: 24 },
        { username: "GlitchHunter", score: 11500, level: 23 },
    ];

    const mockWeeklyPlayers = [
        { username: "PixelQueen", score: 4500, level: 28 },
        { username: "NeonKnight", score: 4200, level: 32 },
        { username: "GlitchHunter", score: 3800, level: 23 },
    ];

    const mockFriends = [
        { username: "RetroMaster", score: 12000, level: 24 },
        { username: "GlitchHunter", score: 11500, level: 23 },
    ];

    // Build the final array based on active tab and inject current user if they exist
    const buildLeaderboard = () => {
        let baseData = [];
        if (activeTab === 'global') baseData = [...mockGlobalPlayers];
        if (activeTab === 'weekly') baseData = [...mockWeeklyPlayers];
        if (activeTab === 'friends') baseData = [...mockFriends];

        if (user) {
            // Inject user
            const userEntry = {
                username: user.name + " (You)",
                score: user.xp,
                level: user.level,
                isUser: true
            };
            baseData.push(userEntry);
        }

        // Sort by score descending
        return baseData.sort((a, b) => b.score - a.score);
    };

    const leaderboardData = buildLeaderboard();

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
                    <h1>Hall of Fame</h1>

                    <div className="tabs">
                        <button className={`tab-btn ${activeTab === 'global' ? 'active' : ''}`} onClick={() => setActiveTab('global')}>Global</button>
                        <button className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`} onClick={() => setActiveTab('weekly')}>Weekly</button>
                        <button className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => setActiveTab('friends')}>Friends</button>
                    </div>

                    {/* Top Players Section */}
                    <div className="top-players">
                        <h2>Top Players</h2>
                        <div className="podium">
                            {leaderboardData.slice(0, 3).map((player, index) => (
                                <div key={index} className={`podium-place place-${index + 1} ${player.isUser ? 'user-highlight' : ''}`}>
                                    <div className="trophy-icon">🏆</div>
                                    <span className="player-name">{player.username}</span>
                                    <span className="player-score">{player.score} XP</span>
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
                                    <th>Level</th>
                                    <th>Total XP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((entry, index) => (
                                    <tr key={index} className={entry.isUser ? 'user-row' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{entry.username}</td>
                                        <td>{entry.level}</td>
                                        <td>{entry.score} XP</td>
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
