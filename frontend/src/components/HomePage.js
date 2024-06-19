import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar'; // Assurez-vous que la casse est correcte
import './HomePage.css';
import { Link } from "react-router-dom";

// Move fetchProducts outside_of HomePage component
const fetchProducts = async (searchParams) => {
    const url = new URL(process.env.REACT_APP_API_URL + '/products');
    Object.keys(searchParams).forEach(key => {
        if (searchParams[key]) {
            url.searchParams.append(key, searchParams[key]);
        }
    });

    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        headers.append('Authorization', `Bearer ${storedToken}`);
    }

    // Explicitly cast headers to HeadersInit
    const response = await fetch(url.toString(), { headers: headers as HeadersInit });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data["hydra:description"] || "Une erreur s'est produite");
    }

    return data["hydra:member"] || [];
};

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const products = await fetchProducts({});
                setProducts(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts().then(r => {});
    }, []);

    const handleSearch = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            const products = await fetchProducts({ 'name': searchTerm });
            setProducts(products);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
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
