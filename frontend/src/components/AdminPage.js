import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './adminPage.css';
import ProductsTable from './ProductsTable';
import CategoriesTable from './CategoriesTable';
import UsersTable from './UsersTable';
import Search from './Search';

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
      <Search onSearch={handleSearch} />
      <h1>MyShop Admin Panel</h1>
      <div className="menu">
        <button onClick={() => setActiveMenu('Products')}>Products</button>
        <button onClick={() => setActiveMenu('Categories')}>Categories</button>
        <button onClick={() => setActiveMenu('Users')}>Users</button>
      </div>
      {renderContent()}
      <Link to="/"> 
        <button className='homeButton'>Home</button>
      </Link>
    </div>
  );
}

export default AdminPage;
