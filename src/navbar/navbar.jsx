import React from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';
import logoImage from "../assets/cooltext475698341786778removebg-preview.png";




export default function NavBar() {
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
            </div>
        </nav>
    );
}
