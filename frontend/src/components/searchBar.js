import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to /login route when login button is clicked
  };

  return (
    <div>
      <img src="path_to_your_logo.png" alt="Logo" /> {/* Add your logo here */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
          placeholder="Search..." 
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleLoginClick}>Login</button> {/* Login button */}
    </div>
  );
};

export default SearchBar;


