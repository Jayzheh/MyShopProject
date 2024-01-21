import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const headers = new Headers({
                    'Content-Type': 'application/json'
                });

                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    headers.append('Authorization', `Bearer ${storedToken}`);
                }

                const response = await fetch(`http://localhost/api/products/${productId}`, { headers });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Could not fetch product');
                }
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="product-details-container">
            {product && (
                <div>
                    <h1>{product.name}</h1>
                    {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                    <p className="product-price">Price: ${product.price}</p>
                    <p>{product.description}</p>
                    {/* Autres détails du produit */}
                </div>
            )}
        </div>
    );
}

export default ProductDetails;




