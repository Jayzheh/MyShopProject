import SearchBar from './searchBar';
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from "react-router-dom";
import Search from './Search';
import BackupLoginPage from './BackupLoginPage';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showBackupLogin, setShowBackupLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwtToken') ? true : false)

    useEffect(() => {
        // Initial product fetch
        console.log(localStorage.getItem('jwtToken'))
        fetchProducts({});
    }, [
        localStorage.getItem('jwtToken')
    ]);

    const fetchProducts = async (searchParams) => {
        try {
            setLoading(true);
            setError(null);

            const url = new URL('http://localhost/api/products');

            // Append search parameters to the URL
            Object.keys(searchParams).forEach(key => {
                if (searchParams[key]) {
                    url.searchParams.append(key, searchParams[key]);
                }
            });

            // Request headers setup
            const headers = new Headers({
                'Content-Type': 'application/json'
            });

            // Add JWT token if available
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                headers.append('Authorization', `Bearer ${storedToken}`);
            }

            const response = await fetch(url, { headers });

            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (data && data["hydra:member"]) {
                setProducts(data["hydra:member"]);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        console.log("Search Term in handleSearch:", searchTerm);
        const searchParams = searchTerm ? { 'name': searchTerm } : {};
        fetchProducts(searchParams);
    };

    const handleAuthClick = () => {
        setShowBackupLogin(true); // Open login pop-up
    };

    const handleCloseBackupLogin = () => {
        setShowBackupLogin(false); // Close login pop-up
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // Remove token from localStorage
        setLoggedIn(false); // Update logged-in state
    };

    useEffect(() => {
        console.log("Token stored in localStorage:", localStorage.getItem('jwtToken'));
    }, [loggedIn]);

    return (
        <div className="homepage-container">
            <div className="top-bar">
                <h2 className="products-title">Nos produits</h2>
                {loggedIn == true ? (
                    <button onClick={handleLogout} className="login-button">
                        Logout
                    </button>
                ) : (
                    <button onClick={handleAuthClick} className="login-button">
                        Login
                    </button>
                )}
            </div>
            <Search onSearch={handleSearch} />
            {loading && <p>Chargement en cours...</p>}
            {error && <p>Erreur: {error}</p>}
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Link to={`/products/${product.id}`} key={product.id} className="product-item">
                            <div>
                                <p className="product-title">{product.name}</p>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">{product.price} USD</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Aucun produit trouvé</p>
                )}
            </div>
            {/* Popup for BackupLoginPage */}
            {showBackupLogin && (
                <div className="popup-container">
                    <div className="popup-content">
                        <span className="close-popup" onClick={handleCloseBackupLogin}>
                            &times;
                        </span>
                        <BackupLoginPage />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;









