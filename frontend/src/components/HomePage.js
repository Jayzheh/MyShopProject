import SearchBar from './searchBar';
import React, { useEffect, useState } from 'react';
import './HomePage.css';

function HomePage() {
    const apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU1MDEwNzcsImV4cCI6MTcwNTUwNDY3Nywicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFiZG91bGthbmUxMTlAZ21haWwuY29tIn0.HK7VmYoPgoJkHUKOeAbFeKEqlMcD-8YAWaE7b7GaQDSPgyydW1JHldd6zcstYd1Y9jQjHhusAX1QVNdOTgC3xNDwJ6iS34OWTHwF5a7LDNIgWr1Z2kw-YiPy5ep-oJ-H_J7iSIxQBYao95hyJkg2fqhiEfSMulnbxMRV7SmZYcbheCe6Z4Vg6iiv0S-xTS92eLXbxoTzQ7XwQHgtj_B1YZT3mgeFpOh1o9EJA4yw2tdbyyoNIsbh9W48ms4vUsWrqETEsEBMLMnKvGaxolo98L5ZtwjDC9tis_aSz3ikQC2wtdyULwGtiQ-55bdXzuEUhbEzUvO90aitiXgaiUTEUQ"; // Access environment variable
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

            if (!apiToken) {
                throw new Error('API Token non défini'); // Gérer le cas où le token n'est pas défini
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            });

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










