import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        const queryParams = new URLSearchParams({ username, email, password }).toString();
        const url = `http://localhost/api/users?${queryParams}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Registration successful! Please log in.');
                navigate('/LoginPage');
            })
            .catch(error => {
                alert('Registration failed: ' + error.message);
            });
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;


