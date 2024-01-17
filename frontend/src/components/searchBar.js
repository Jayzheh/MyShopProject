import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="search-bar-container">
      <div className="logo-and-title">
        <img src="path_to_your_logo.png" alt="Logo" className="logo" />
        <span className="shop-title">MyShop</span>
      </div>
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
          placeholder="Search..." 
          className="search-input"
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <button onClick={handleLoginClick} className="login-button">Login</button>
    </div>
  );
};

export default SearchBar;


