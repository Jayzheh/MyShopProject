import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import logo from '../images/myshop_logo.png';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fonction pour vérifier utilisateur connecté
    const isUserLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    //Trace état de connexion de l'utilisateur
    const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());

    useEffect(() => {
        // Mise à jour de l'état de connexion
        setLoggedIn(isUserLoggedIn());
    });

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleAuthClick = () => {
        if (loggedIn) {
            localStorage.removeItem('token'); // Supprimer le token pour se déconnecter
            setLoggedIn(false);
            navigate('/'); // Rediriger vers la page d'accueil
        } else {
            navigate('/login'); // Naviguer vers la page de connexion
        }
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
                <button className="search-button" type="submit">Search</button>
            </form>
            <button onClick={handleAuthClick} className="login-button">
                {loggedIn ? 'Logout' : 'Login'}
            </button>
        </div>
    );
};

export default SearchBar;



