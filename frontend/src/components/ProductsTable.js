import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
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

  // MODIFY PRODUCTS
  const startEdit = (product) => {
    setEditingProduct(product);
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

    handleEdit(editingProduct.id, updatedProduct);
    setEditingProduct(null);
  };

  const handleEdit = (productId, updatedProduct) => {
    const jwtToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU1MDQyMjgsImV4cCI6MTcwNTUwNzgyOCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRhbkBkYW4uZGFuIn0.hwfXrbK-HEsN03RvgbsGNxMbPNHdTX4mLKJsS4hlc9o3L4BJKjdKYsUhm4P3dP2WGms-4xmcdhUFlWiK7V8jpgZMVZMbqtkI7g8-Efu9hmezVoJO3L2ZK4K9svMf2uEtT3368mvLDlox4_id37tczN44Mhd587JB1AWPj0D9aNVStXUkDC3_6PLG97Vi6cPZrHC11dCyC-76XSdwcxrknASfKWz0FCiJ6xv9mabnZJ7XB3CwOlmqAABy-9QJLpQAIEd2zvlviZGisK3WtP_EzXxITiKvnpP0THWRvgXYGVLCLYEJMgZQrAMH9pMEwHuR8_8D5yP0JEkylElY0dIMEw'; // Replace withi your actual JWT token

    axios
      .put(`http://localhost/api/products/${productId}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(`Product with ID: ${productId} updated successfully.`, response.data);
        // Update the product in the local state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((error) => {
        console.error('Error updating product:', error.response ? error.response.data : error.message);
      });
  };

  // DELETE PRODUCTS
  const handleDelete = (productId) => {
    // Confirm before deleting
    if (window.confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      // Retrieve the JWT token from environment variables or elsewhere
      const jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU1MDQyMjgsImV4cCI6MTcwNTUwNzgyOCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRhbkBkYW4uZGFuIn0.hwfXrbK-HEsN03RvgbsGNxMbPNHdTX4mLKJsS4hlc9o3L4BJKjdKYsUhm4P3dP2WGms-4xmcdhUFlWiK7V8jpgZMVZMbqtkI7g8-Efu9hmezVoJO3L2ZK4K9svMf2uEtT3368mvLDlox4_id37tczN44Mhd587JB1AWPj0D9aNVStXUkDC3_6PLG97Vi6cPZrHC11dCyC-76XSdwcxrknASfKWz0FCiJ6xv9mabnZJ7XB3CwOlmqAABy-9QJLpQAIEd2zvlviZGisK3WtP_EzXxITiKvnpP0THWRvgXYGVLCLYEJMgZQrAMH9pMEwHuR8_8D5yP0JEkylElY0dIMEw'; // Replace with your actual JWT token

      fetch(`http://localhost/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          console.log('Delete response:', response);
          if (response.ok) {
            // Remove the deleted product from the products state
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            console.log(`Product with ID: ${productId} deleted successfully.`);
          } else {
            console.error('Error deleting product:', response.statusText);
          }
        })
        .catch((error) => console.error('Error:', error));
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product) => (
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
                  <button onClick={() => startEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingProduct && (
        <div>
          <h2>Edit Product</h2>
          <form onSubmit={handleEditFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={editFormData.price}
                onChange={handleEditFormChange}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductsTable;


