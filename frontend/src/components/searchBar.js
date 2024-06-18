import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import logo from '../images/myshop_logo.png';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    //Debouncing to reduce excissive API calls 
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

    // Fonction pour vérifier utilisateur connecté
    const isUserLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    //Trace état de connexion de l'utilisateur
    const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());

    //Adjusted by Dan to track login state 
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

    const handleAuthClick = () => {
        if (loggedIn) {
            localStorage.removeItem('token'); 
            setLoggedIn(false);
            navigate('/'); 
        } else {
            navigate('/login'); 
        }
    };

    // DAN HERE Debug to check token state and button state
    useEffect(() => {
        console.log('LoggedIn state:', loggedIn);
        console.log('JWT Token:', localStorage.getItem('jwtToken'));
    }, [loggedIn]);

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
            <button onClick={handleAuthClick} className="login-button">
                {loggedIn ? 'Logout' : 'Login'}
            </button>
        </div>
    );
};

export default SearchBar;



