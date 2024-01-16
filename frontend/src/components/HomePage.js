import SearchBar from './searchBar';
import React, { useEffect, useState } from 'react';
import './HomePage.css';

function HomePage() {
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const [products, setProducts] = useState([]);

    const fetchProducts = async (searchParams) => {
        try {
            const url = new URL('http://localhost/api/products');

            // Ajout des paramètres de recherche à l'URL
            Object.keys(searchParams).forEach(key => {
                if (searchParams[key]) {
                    url.searchParams.append(key, searchParams[key]);
                }
            });

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                }
            });

            const data = await response.json();
            if (data && data["hydra:member"]) {
                setProducts(data["hydra:member"]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    };

    const handleSearch = (searchTerm) => {
        // Exemple d'utilisation avec un seul terme de recherche
        const searchParams = {
            'name': searchTerm,
            'description': searchTerm,
            'categories[]': searchTerm,
            'price[between]': searchTerm,
            'price[gt]': searchTerm,
            'price[gte]': searchTerm,
            'price[lt]': searchTerm,
            'price[lte]': searchTerm,
            'order[id]': searchTerm,
            'order[name]': searchTerm,
        };
        fetchProducts(searchParams);
    };

    return (
        <div className="homepage-container">
            <SearchBar onSearch={handleSearch} />
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="product-item">
                            <p className="product-title">{product.name}</p>
                            {/* Ajoutez plus de détails sur le produit ici, comme une description, une image, etc. */}
                        </div>
                    ))
                ) : (
                    <p>Aucun produit trouvé</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;







