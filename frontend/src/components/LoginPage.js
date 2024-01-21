import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Declare jwtToken and initialize it with the token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    console.log('jwtToken:', jwtToken);

    const handleLogin = () => {
        fetch('http://localhost/authentication_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`, // Add jwtToken to headers
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('jwtToken', data.jwtToken);

            // Use jwtToken here
            navigate('/admin');
        })
        .catch(error => {
            alert('Login failed: ' + error.message);
        });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}

export default LoginPage;








