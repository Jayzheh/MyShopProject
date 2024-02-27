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

  // Add a new state to control whether the add product form is open
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

  // Define a state to hold the available categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryMapping, setCategoryMapping] = useState({});

  useEffect(() => {
    // Fetch products from the API
    fetch('http://localhost/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (data['hydra:member']) {
          setProducts(data['hydra:member']);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));

    // Fetch categories from the API
    fetch('http://localhost/api/categories', {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data['hydra:member']) {
        setCategories(data['hydra:member']);
        console.log('Fetched Categories:', data['hydra:member']);
  
        // Create a mapping from category ID to name
        const newCategoryMapping = {};
        data['hydra:member'].forEach(category => {
          newCategoryMapping[category.id] = category.name;
        });
        setCategoryMapping(newCategoryMapping);
        console.log('Fetched Categories Table', data['hydra:member']);
      }
    })
    .catch((error) => console.error('Error fetching categories:', error));
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

    axios
      .put(`http://localhost/api/products/${editingProductId}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProductId ? { ...response.data } : product
          )
        );
        setEditingProductId(null);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleCancel = () => {
    setEditingProductId(null);
  };

  // ADD PRODUCT
  const handleAddNewClick = () => {
    // Open the add product form when "Add New" is clicked
    setIsAddProductFormOpen(true);
  };

  //CREATE NEW PRODUCT 
  const handleAddProductSubmit = () => {
    const newProduct = {
      ...editFormData,
      price: parseInt(editFormData.price, 10),
      categories: [selectedCategory], // Include the selected category
    };

    axios
      .post('http://localhost/api/products', newProduct, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, response.data]);
        // Reset the form data or close the form
        setEditFormData({
          name: '',
          description: '',
          price: '',
          categories: [],
        });
        // Close the add product form
        setIsAddProductFormOpen(false);
      })
      .catch((error) => {
        console.error('Error adding new product:', error);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCancelAdd = () => {
    // Reset the form data or close the form
    setEditFormData({
      name: '',
      description: '',
      price: '',
      categories: [],
    });
    // Close the add product form
    setIsAddProductFormOpen(false);
  };

    // Function to handle product deletion
    const handleDelete = (productId) => {
      axios
        .delete(`http://localhost/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          // Remove the deleted product from the list
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    };

  return (
    <div>
      <h2>Products</h2>
      <button className='addNew-button' onClick={handleAddNewClick}>Add New</button>

      {isAddProductFormOpen && (
        <div>
          {/* FORM TO ADD STUFF */}
          <h3>Add Product</h3>
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
              type="number"
              name="price"
              value={editFormData.price}
              onChange={handleEditFormChange}
            />
          </div>
          <div>
            <label>Select a Category:</label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category['@id']}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddProductSubmit}>Add Product</button>
          <button onClick={handleCancelAdd}>Cancel</button>
        </div>
      )}

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
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditFormChange}
                    />
                  </td>
                  <td>
                  {product.categories.map((categoryIRI, idx) => {
                    const categoryId = getCategoryID(categoryIRI);
                    const categoryName = categoryMapping[categoryId] || 'Unknown Category'; // Use the mapping
                    return (
                    <span key={idx}>
                      {categoryName}
                      {idx < product.categories.length - 1 ? ', ' : ''}
                      </span>
                      );
                      })}
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
                  {product.categories.map((categoryIRI, idx) => {
                    const categoryId = getCategoryID(categoryIRI);
                    const categoryName = categoryMapping[categoryId] || 'Unknown Category'; // Use the mapping
                    return (
                    <span key={idx}>
                      {categoryName}
                      {idx < product.categories.length - 1 ? ', ' : ''}
                      </span>
                      );
                      })}
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
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




