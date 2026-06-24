import React, { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    // Default initial user data
    const initialUserData = {
        name: "Guest Player",
        xp: 0,
        level: 1,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
        achievements: [],
        dailyChallenges: [
            { id: 1, game: "Snake", goal: "Score 100 in Snake", target: 100, progress: 0, completed: false, xpReward: 50 },
            { id: 2, game: "Maze", goal: "Solve 3 Mazes", target: 3, progress: 0, completed: false, xpReward: 100 },
        ],
        stats: {
            tictactoeWins: 0,
            snakeHighScore: 0,
            mazeSolved: 0,
            rockPaperScissorsWins: 0,
            numberGuessingWins: 0,
            memoryGameWins: 0,
            game2048HighScore: 0
        }
    };

    // Load from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('errorGameUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save to local storage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('errorGameUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('errorGameUser');
        }
    }, [user]);

    const login = () => {
        // Mock login
        setUser({
            ...initialUserData,
            name: "Error Gamer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ErrorGamer"
        });
    };

    const logout = () => {
        setUser(null);
    };

    const updateStats = (game, result) => {
        if (!user) return;
        
        setUser(prev => {
            let newStats = { ...prev.stats };
            let newChallenges = JSON.parse(JSON.stringify(prev.dailyChallenges));
            let newAchievements = [...prev.achievements];
            let newXp = prev.xp + 10; // Base XP for finishing a game
            let newLevel = prev.level;

            const awardXP = (amount) => {
                newXp += amount;
                while (newXp >= newLevel * 500) {
                    newXp -= newLevel * 500;
                    newLevel++;
                    alert(`🎉 LEVEL UP! You reached Level ${newLevel}!`);
                }
            };

            const checkAchievement = (current, target, name) => {
                if (current >= target && !newAchievements.includes(name)) {
                    newAchievements.push(name);
                    awardXP(200);
                    alert(`🏆 ACHIEVEMENT UNLOCKED: ${name} (+200 XP)`);
                }
            };

            const updateChallenge = (gameName, amount) => {
                const challenge = newChallenges.find(c => c.game === gameName);
                if (challenge && !challenge.completed) {
                    if (gameName === 'Snake') {
                        if (amount > challenge.progress) challenge.progress = amount; 
                    } else {
                        challenge.progress += amount;
                    }
                    if (challenge.progress >= challenge.target) {
                        challenge.completed = true;
                        awardXP(challenge.xpReward);
                        alert(`🎯 DAILY CHALLENGE COMPLETED: ${challenge.goal} (+${challenge.xpReward} XP)`);
                    }
                }
            };

            // Process Game Results
            if (game === 'tictactoe' && result === 'win') {
                newStats.tictactoeWins++;
                awardXP(40);
                checkAchievement(newStats.tictactoeWins, 10, "Tic Tac Toe Master");
            }
            if (game === 'snake') {
                if (result > newStats.snakeHighScore) newStats.snakeHighScore = result;
                awardXP(Math.floor(result / 10)); // 1 XP per 10 score
                checkAchievement(result, 100, "Snake Charmer");
                updateChallenge("Snake", result);
            }
            if (game === 'maze') {
                newStats.mazeSolved++;
                awardXP(50);
                updateChallenge("Maze", 1);
            }
            if (game === 'rockpaperscissors' && result === 'win') {
                newStats.rockPaperScissorsWins++;
                awardXP(20);
            }
            if (game === '2048') {
                if (result > newStats.game2048HighScore) newStats.game2048HighScore = result;
                awardXP(Math.floor(result / 100)); // 1 XP per 100 score
                checkAchievement(result, 2048, "2048 God");
            }

            return { 
                ...prev, 
                stats: newStats, 
                dailyChallenges: newChallenges,
                achievements: newAchievements,
                xp: newXp,
                level: newLevel
            };
        });
    };

    return (
        <GameContext.Provider value={{ user, login, logout, updateStats }}>
            {children}
        </GameContext.Provider>
    );
};
