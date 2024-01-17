import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Ici, vous devriez envoyer une requête à votre backend pour vérifier les identifiants
            // Cette requête retournera probablement le token JWT que vous devez utiliser pour les requêtes authentifiées
            // Exemple de structure de requête - ajustez en fonction de votre backend
            const response = await fetch('http://localhost/authentication_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Stocker le token JWT pour une utilisation future
                localStorage.setItem('token', data.token); // Ajustez en fonction de la structure de réponse de votre API

                // Rediriger l'utilisateur
                navigate('/admin');
            } else {
                alert(data.message || 'Invalid credentials');
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
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





