import React, { useState, useEffect } from 'react';
import './searchBar.css';
import logo from '../images/myshop_logo.png';
import BackupLoginPage from './BackupLoginPage';
import { Link } from 'react-router-dom'; 

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [showBackupLogin, setShowBackupLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

    // Debouncing to reduce excessive API calls 
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        onSearch(debouncedTerm);
    }, [debouncedTerm]);

    // Function to check if user is logged in
    const isUserLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    // Track login state of the user
    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(isUserLoggedIn());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    const handleCloseBackupLogin = () => {
        setShowBackupLogin(false);
    };

    return (
        <div className="search-bar-container">
            <div className="logo-and-title">
                <img src={logo} alt="Logo" className="logo" />
                <span className="shop-title">MyShop</span>
            </div>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="search-input"
                />
                {/* <button className="search-button" type="submit">Search</button> */}
            </form>
            {loggedIn && (
                <button onClick={handleLogout} className="login-button">
                    Logout
                </button>
            )}

            {/* Popup for BackupLoginPage */}
            {showBackupLogin && (
                <div className="popup-container">
                    <div className="popup-content">
                        <span className="close-popup" onClick={handleCloseBackupLogin}>
                            &times;
                        </span>
                        <BackupLoginPage setLoggedIn={setLoggedIn} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
