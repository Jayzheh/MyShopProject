import React, { useState } from 'react'; 
import SearchBar from './searchBar'; 
import './adminPage.css';
import ProductsTable from './ProductsTable';
import CategoriesTable from './CategoriesTable';
import UsersTable from './UsersTable';

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
        return <CategoriesTable /> ; // Replace with your Categories component
      case 'Users':
        return <UsersTable />; // Replace with your Users component
      default:
        return <ProductsTable />;
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
