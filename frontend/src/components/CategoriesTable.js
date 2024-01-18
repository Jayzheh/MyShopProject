import React, { useState, useEffect } from 'react';
import './Table.css';

function CategoriesTable() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Retrieve the JWT token from local storage
        const jwtToken = localStorage.getItem('jwtToken'); // Replace 'token' with whatever you

         // Debugging failsafe
         console.log("Retrieved JWT Token:", jwtToken);


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

    //DELETE CATEGORY
    const handleDelete = (categoryId) => {
        // Confirmation dialog
        if (window.confirm("Are you sure you want to delete this category?")) {
            // User confirmed deletion
            const jwtToken = localStorage.getItem('jwtToken'); // Change key name if needed
    
            fetch(`http://localhost/api/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted category from the state
                    setCategories(categories.filter(category => category.id !== categoryId));
                } else {
                    console.error('Error deleting category:', response);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            // User canceled deletion
            console.log("Deletion cancelled");
        }
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
