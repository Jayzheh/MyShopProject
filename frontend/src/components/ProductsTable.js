import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

const jwtToken = localStorage.getItem('jwtToken');

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
  });

  useEffect(() => {
    fetch('http://localhost/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (data['hydra:member']) {
          setProducts(data['hydra:member']);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const getCategoryID = (categoryIRI) => {
    return categoryIRI.split('/').pop();
  };

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categories: product.categories,
    });
  };

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      ...editFormData,
      price: parseInt(editFormData.price, 10),
    };

    axios.put(`http://localhost/api/products/${editingProductId}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
    })
    .then((response) => {
      setProducts(products.map((product) => 
        product.id === editingProductId ? { ...response.data } : product
      ));
      setEditingProductId(null);
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });
  };

  const handleCancel = () => {
    setEditingProductId(null);
  };

  return (
    <div>
      <h2>Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              {editingProductId === product.id ? (
                // Editable fields
                <>
                  <td><input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} /></td>
                  <td><input type="text" name="description" value={editFormData.description} onChange={handleEditFormChange} /></td>
                  <td><input type="number" name="price" value={editFormData.price} onChange={handleEditFormChange} /></td>
                  <td>
                    {/* You can also make categories editable if needed */}
                    {product.categories.map((category, idx) => (
                      <span key={idx}>{getCategoryID(category)}{idx < product.categories.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  <td>
                    <button onClick={handleEditFormSubmit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                // Non-editable fields
                <>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    {product.categories.map((category, idx) => (
                      <span key={idx}>{getCategoryID(category)}{idx < product.categories.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => startEdit(product)}>Edit</button>
                    <button>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;



