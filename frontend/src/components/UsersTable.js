import React, { useState, useEffect } from 'react';
import './Table.css';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            const fetchUsers = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch('http://localhost/api/users');
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const data = await response.json();
                    setUsers(data['hydra:member']);
                    localStorage.setItem('users', JSON.stringify(data['hydra:member']));
                } catch (error) {
                    setError(error.message);
                }
                setIsLoading(false);
            };

            fetchUsers();
        }
    }, []);

    // ... Rest of your component
};

export default UsersTable;




            
