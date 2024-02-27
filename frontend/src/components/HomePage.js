import SearchBar from './searchBar';
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import {Link} from "react-router-dom";

function HomePage() {
    //const apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU1NzU2ODAsImV4cCI6MTcwNTU3OTI4MCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRhbkBkYW4uZGFuIn0.fUFrU5Q7zbsbpxjcffnXlitu49lwPk40uxlWsbN9xmmM48HYfE8wC35GDmFUvAoxlTH9AvG5Gprya-MpPbb33nlOSwsRaZ2QdMCTPr67RA6Y5JPnQfRvRKmjg5gQdgXO1z0aJ2PLqYz0CqWToYWj1cqggPPuDoJoEu2eojDxvS7ynv3UwaRl3bFqUCS34mnw5qtQgKzL-AD0FU9o23evVyaNGYOR36vzP9ybzQI4sqYhqaBdv5hqowsZG2ckgkOlRNoakrAN6Ym7EfPwRzvCouJPcfRXOIw8t6idefl-j54sRtklxNM7uMf6H0mBE66aDgi6kXvzZ_4hhIsMCMnfCw"; // Access environment variable
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Chargement initial des produits
        fetchProducts({});
    }, []);

    const fetchProducts = async (searchParams) => {
        try {
            setLoading(true);
            setError(null);

            const url = new URL('http://localhost/api/products');

            // Ajout des paramètres de recherche à l'URL
            Object.keys(searchParams).forEach(key => {
                if (searchParams[key]) {
                    url.searchParams.append(key, searchParams[key]);
                }
            });

            // Préparation des en-têtes de la requête
            const headers = new Headers({
                'Content-Type': 'application/json'
            });

            // Ajouter le token JWT s'il est disponible
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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        // Modification pour utiliser uniquement le paramètre de recherche pertinent
        const searchParams = {
            'name': searchTerm
            // Vous pouvez ajouter d'autres paramètres si nécessaire
        };
        fetchProducts(searchParams);
    };

    return (
    <div className="homepage-container">
        <SearchBar onSearch={handleSearch} />
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
    </div>
    );
}

export default HomePage;










