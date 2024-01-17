import React, { useState } from 'react'; 
import SearchBar from './searchBar'; 
import './adminPage.css';
import ProductsTable from './ProductsTable';

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState('Products'); // State to track active menu

  const handleSearch = (searchTerm) => {
    console.log('Search Term:', searchTerm);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'Products':
        return  <ProductsTable />; ; // Products component should render here
      case 'Categories':
        return <div>Categories Table</div>; // Replace with your Categories component
      case 'Users':
        return <div>Users Table</div>; // Replace with your Users component
      default:
        return <div>Products Table</div>;
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h1>MyShop Admin Panel</h1>
      <div className="menu">
        <button onClick={() => setActiveMenu('Products')}>Products</button>
        <button onClick={() => setActiveMenu('Categories')}>Categories</button>
        <button onClick={() => setActiveMenu('Users')}>Users</button>
      </div>
      {renderContent()}
    </div>
  );
}

export default AdminPage;
