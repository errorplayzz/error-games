import React from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';
import logoImage from "../assets/error game logo.png";
import { useGameContext } from "../context/GameContext";




export default function NavBar() {
    const { user, login, logout } = useGameContext();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo-link">
                    <img src={logoImage} alt="Game Logo" className="nav-logo" />
                </Link>
            </div>

            <div className="navbar-center">
                <input type="text" placeholder="Search.." className="search-input" />
            </div>
            
            <div className="navbar-right">
                <Link to="/leaderboard" className="leaderboard-button">
                    <i className="fas fa-trophy"></i> Leaderboard
                </Link>

                {user ? (
                    <div className="user-profile-nav">
                        <Link to="/profile" className="profile-link">
                            <img src={user.avatar} alt="Avatar" className="nav-avatar" />
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-level">Lvl {user.level}</span>
                            </div>
                        </Link>
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <button onClick={login} className="login-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" className="google-icon" />
                        Login with Google
                    </button>
                )}
            </div>
        </nav>
    );
}
