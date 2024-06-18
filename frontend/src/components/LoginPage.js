import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const headers = {
            'Content-Type': 'application/json',
        };

        fetch('http://localhost/authentication_token', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const token = data.token;
                localStorage.setItem('jwtToken', token);

                console.log('Token stored:', token);
                navigate('/admin');
            })
            .catch(error => {
                alert('Login failed: ' + error.message);
            });
    };

    // Debug DAN Additional useEffect to check local storage and log it
    React.useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        console.log('JWT Token in localStorage:', storedToken);
    }, []);

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








