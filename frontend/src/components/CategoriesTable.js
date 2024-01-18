import React, { useState, useEffect } from 'react';
import './Table.css';

//const jwtToken = process.env.REACT_APP_JWT_TOKEN;
const jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU1Njg5NzEsImV4cCI6MTcwNTU3MjU3MSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRhbkBkYW4uZGFuIn0.PYNMle6J6rvLUDWA9eG48LXXhBxoVTQo-LqhgRHjiiscGxQQXwKNKBX3K4-RF4TedlCfnwOkuWZB2h5HqXQSV5lUe6-wBlayRLb3UZtQjbs0d16SwIJBZTfMmcUabsFityFbAbQoPAmOl6ysSkY1WCwH3zkSOCGPrz9tTtuw-CrnFPtOjP69lgpY7D5wy-_QZgMn1_6-tXEVCWlunIUIzB1ve_1pRjrha7qzbn58dyKE9ZJJtT1R7ou5auiYGD0mMpvg_H2QO5owcIH4OCdK6HuyeAyJY7HavkqtPtjOmck7HljSSGNryj1128CyjXSP2ZYSI0SH7qnCuwyjzcqC1A';

function CategoriesTable() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/categories', {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data['hydra:member']) {
                setCategories(data['hydra:member']);
            }
        })
        .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Placeholder functions for edit and delete actions
    const startEdit = (category) => {
        // Implement edit functionality
    };

    const handleDelete = (categoryId) => {
        // Implement delete functionality
    };

    return (
        <div>
            <h2>Categories</h2>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <button className="edit-button" onClick={() => startEdit(category)}>Edit</button>
                                <button onClick={() => handleDelete(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesTable;


