import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const BackupLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state on new login attempt
        try {
            console.log('Attempting login with:', email);
            const response = await axios.post('http://localhost/authentication_token', {
                email,
                password
            });
            console.log('Login successful:', response.data);
            
            // Assuming the API returns a JWT token upon successful login
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            setIsLoggedIn(true); // Update isLoggedIn state upon successful login
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded a status 
                console.error('Server Error:', error.response.data);
                setError('Server Error. Please try again later.');
            } else if (error.request) {
                // The request was made but no response
                console.error('Network Error:', error.request);
                setError('Network Error. Please check your internet connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Unexpected Error:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="login-container"> 
            <h1>Backup Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
            {isLoggedIn && (
                <p>
                    Login successful! Go to <Link to="/admin">Admin Page</Link>
                </p>
            )}
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <p>Go back to <Link to="/">Home</Link></p>
        </div>
    );
};

export default BackupLoginPage;