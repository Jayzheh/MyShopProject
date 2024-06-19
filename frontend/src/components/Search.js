import React, { useState, useEffect } from 'react';
import './searchBar.css';
import logo from '../images/myshop_logo.png';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
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
    };

    return (
        <div className="search-bar-container">
            <div className="logo-and-title">
                <img src={logo} alt="Logo" className="logo" />
                <span className="shop-title">MyShop</span>
            </div>
            <form className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="search-input"
                />
            </form>
        </div>
    );
};

export default Search;
