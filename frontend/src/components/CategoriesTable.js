import React, { useState, useEffect } from 'react';
import './Table.css';

function CategoriesTable() {
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '' });

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log("Retrieved JWT Token:", jwtToken);

        fetch('http://localhost/api/categories', {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data['hydra:member']) {
                setCategories(data['hydra:member']);
            }
        })
        .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const startEdit = (category) => {
        setEditingCategoryId(category.id);
        setEditFormData({ name: category.name });
    };

    const handleEditFormChange = (event) => {
        setEditFormData({ ...editFormData, name: event.target.value });
    };

    const handleEditSubmit = (categoryId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch(`http://localhost/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(editFormData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(updatedCategory => {
            setCategories(categories.map(category => category.id === categoryId ? updatedCategory : category));
            setEditingCategoryId(null);
        })
        .catch(error => console.error('Error updating category:', error));
    };

    const handleDelete = (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            const jwtToken = localStorage.getItem('jwtToken');
            fetch(`http://localhost/api/categories/${categoryId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${jwtToken}` }
            })
            .then(response => {
                if (response.ok) {
                    setCategories(categories.filter(category => category.id !== categoryId));
                } else {
                    console.error('Error deleting category:', response);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    };

    const cancelEdit = () => {
        setEditingCategoryId(null);
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
                            <td>
                                {editingCategoryId === category.id ? (
                                    <input 
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditFormChange}
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td>
                                {editingCategoryId === category.id ? (
                                    <>
                                        <button onClick={() => handleEditSubmit(category.id)}>Save</button>
                                        <button onClick={cancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => startEdit(category)}>Edit</button>
                                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesTable;
