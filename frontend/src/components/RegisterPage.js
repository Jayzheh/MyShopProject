import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('ROLE_USER');
    const navigate = useNavigate();

    const getTokenAndRegisterUser = () => {
        fetch('http://localhost/authentication_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "abdoulkane119@gmail.com",
                password: "Kyrie2000",
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to retrieve auth token: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const token = data.token;
                registerUser(token);
            })
            .catch(error => {
                console.error('Error fetching auth token:', error);
                alert('Failed to get authentication token');
            });
    };

    const registerUser = (token) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const body = {
            email,
            password,
            fullName: username,
            roles: [role],
        };

        fetch('http://localhost/api/users', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register user');
                }
                return response.json();
            })
            .then(() => {
                alert('Registration successful! Please log in.');
                navigate('/login');
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
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="ROLE_USER">Regular User</option>
                <option value="ROLE_ADMIN">Admin</option>
            </select>
            <button onClick={getTokenAndRegisterUser}>Register</button>
        </div>
    );
}

export default RegisterPage;




