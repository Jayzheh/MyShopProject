import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your page components here
import HomePage from './components/HomePage'; 
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'; 
import AdminPage from './components/AdminPage';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Abdoul Page */}
          <Route path="/products/:productId" element={<ProductDetails />} /> {/* Abdoul Page */}
          <Route path="/login" element={<LoginPage />} /> {/* Abdoul et Dan Page */}
          <Route path="/register" element={<RegisterPage />} /> {/* Abdoul et Dan Page */}
          <Route path="/admin" element={<AdminPage />} /> {/* Dan Page */}
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
