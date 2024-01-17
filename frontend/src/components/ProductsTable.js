import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', description: '', price: '' });


  useEffect(() => {
    fetch('http://localhost/api/products')
      .then(response => response.json())
      .then(data => {
        if (data['hydra:member']) {
          setProducts(data['hydra:member']);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const getCategoryID = (categoryIRI) => {
    return categoryIRI.split('/').pop();
  };

  //MODIFY PRODUCTS
  const startEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({ name: product.name, description: product.description, price: product.price });
  };

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      ...editingProduct,
      ...editFormData
    };

    handleEdit(editingProduct.id, updatedProduct);
    setEditingProduct(null);
  };

  const handleEdit = (productId, updatedProduct) => {
    const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU1MDA0NjIsImV4cCI6MTcwNTUwNDA2Miwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRhbkBkYW4uZGFuIn0.X9aehXTNha1HLMPLYAffD2xj31Z5ABDfifHso7D9i4way6AY3Q5-Pg5q3QxyOeS7OJB-Jy8HL7Z6Y-BfodY1vVA9-BoTruFNo263QIZOQwCi2sDeR4cPlcjyDtYeeI5IAJymfFlP3Zy5sj3AfAO2br_AxcNl5h_W4rlEhFPCHFWQeLsHwIRzRU_IfYOIqzaEGg2FeemekQ5CT_4Xn6DBubuGd_6Ha6M_Duy_bY4Mezxe77BXVEYwF1Vj9sS_U_MDqd6oBEOSamZaPmFmfOGUD4_WgBgpWr4GGMeDtZMKvPpW8HvtR3-_kkDXf5IFDN8DC3qzaIm78Rggdt5NVnNdTA";
  
    axios.put(`http://localhost/api/products/${productId}`, updatedProduct, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(`Product with ID: ${productId} updated successfully.`, response.data);
      // Update the product in the local state
      setProducts(products.map(product => 
        product.id === productId ? { ...product, ...updatedProduct } : product
      ));
    })
    .catch(error => {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    });
  };

//DELETE PRODUCTS
  const handleDelete = (productId) => {
    // Confirm before deleting
    if (window.confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      // Retrieve the JWT token from environment variables
      const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  
      fetch(`http://localhost/api/products/${productId}`, { // Adjust the URL to your API endpoint
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwtToken}`, // Include the JWT token in the 
          }
      })
      .then(response => {
        console.log('Delete response:', response);
        if (response.ok) {
          // Remove the deleted product from the products state
          setProducts(products.filter(product => product.id !== productId));
          console.log(`Product with ID: ${productId} deleted successfully.`);
        } else {
          console.error('Error deleting product:', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  };  
  
  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Actions</th> {/* Added Actions header */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                {product.categories.map((category, idx) => (
                  <span key={idx}>{getCategoryID(category)}{idx < product.categories.length - 1 ? ', ' : ''}</span>
                ))}
              </td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button> {/* Edit button */}
                <button onClick={() => handleDelete(product.id)}>Delete</button> {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;


