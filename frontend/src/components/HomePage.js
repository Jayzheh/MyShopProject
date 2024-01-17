import SearchBar from './searchBar';
import React, { useEffect, useState } from 'react';
import './HomePage.css';

function HomePage() {
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Chargement initial des produits
        fetchProducts({});
    }, []);

    const fetchProducts = async (searchParams) => {
        try {
            const url = new URL('http://localhost:3000/api/products'); // Ajout du port 3000

            // Ajout des paramètres de recherche à l'URL
            Object.keys(searchParams).forEach(key => {
                if (searchParams[key]) {
                    url.searchParams.append(key, searchParams[key]);
                }
            });

            console.log(`Fetching: ${url}`); // Pour déboguer l'URL finale

            if (!apiToken) {
                throw new Error('API Token non défini'); // Gérer le cas où le token n'est pas défini
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Pour déboguer la réponse de l'API

            if (data && data["hydra:member"]) {
                setProducts(data["hydra:member"]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    };

    const handleSearch = (searchTerm) => {
        // Modification pour utiliser uniquement le paramètre de recherche pertinent
        // Par exemple, ici, je ne recherche que par nom.
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








