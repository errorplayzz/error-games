import React from 'react';
import { useGameContext } from '../context/GameContext';
import './DailyChallenges.css';

export default function DailyChallenges() {
    const { user } = useGameContext();

    if (!user) return null; // Only show if logged in

    return (
        <div className="daily-challenges-container">
            <h2>🎯 Daily Challenges</h2>
            <div className="challenges-grid">
                {user.dailyChallenges.map(challenge => (
                    <div key={challenge.id} className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
                        <div className="challenge-info">
                            <h3>{challenge.goal}</h3>
                            <span className="xp-reward">+{challenge.xpReward} XP</span>
                        </div>
                        <div className="challenge-progress">
                            <div className="progress-text">
                                {challenge.completed ? 'Completed!' : `${challenge.progress} / ${challenge.target}`}
                            </div>
                            <div className="progress-bar-bg">
                                <div 
                                    className="progress-bar-fill" 
                                    style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
