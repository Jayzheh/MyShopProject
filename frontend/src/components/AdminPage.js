import React from 'react';
import SearchBar from './searchBar'; // Import the SearchBar component

function AdminPage() {
  const handleSearch = (searchTerm) => {
    // Implement what should happen when a search is executed
    console.log('Search Term:', searchTerm);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} /> {/* Include the SearchBar at the top */}
      <h1>Admin Page</h1>
      {/* Rest of the admin page content */}
    </div>
  );
}

export default AdminPage;
