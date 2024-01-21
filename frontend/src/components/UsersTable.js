import React, { useState, useEffect } from 'react';
import './Table.css';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ fullName: '', email: '', password: '' });
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');

        fetch('http://localhost/api/users', {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data['hydra:member']) {
                setUsers(data['hydra:member']);
            }
        })
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setEditFormData({ fullName: user.fullName, email: user.email, password: '' });
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSaveClick = (userId) => {
        const jwtToken = localStorage.getItem('jwtToken');

        fetch(`http://localhost/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(editFormData)
        })
        .then(response => response.json())
        .then(updatedUser => {
            setUsers(prevUsers => prevUsers.map(user => (user.id === userId ? updatedUser : user)));
            setEditingUserId(null);
        })
        .catch(error => console.error('Error updating user:', error));
    };

    const handleDeleteClick = (userId) => {
        const jwtToken = localStorage.getItem('jwtToken');

        fetch(`http://localhost/api/users/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        })
        .catch(error => console.error('Error deleting user:', error));
    };

    const handleAddNewClick = () => {
        setIsAddUserFormOpen(true);
    };

    const handleAddUserSubmit = () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const newUser = {
            fullName: editFormData.fullName,
            email: editFormData.email,
            roles: ["ROLE_ADMIN", "ROLE_USER"], // Assign both roles
            password: editFormData.password // Use the password entered in the form
        };

        fetch('http://localhost/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(addedUser => {
            setUsers(prevUsers => [...prevUsers, addedUser]);
            setEditFormData({ fullName: '', email: '', password: '' }); // Clear the form fields
            setIsAddUserFormOpen(false);
        })
        .catch(error => console.error('Error adding new user:', error));
    };

    const handleCancelAddUser = () => {
        setEditFormData({ fullName: '', email: '', password: '' }); // Clear the form fields
        setIsAddUserFormOpen(false);
    };

    return (
        <div>
            <h2>Users</h2>
            <button className='addNew-button' onClick={handleAddNewClick}>Add New</button>

            {isAddUserFormOpen && (
                <div>
                    <h3>Add User</h3>
                    <div>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={editFormData.fullName}
                            onChange={handleEditFormChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleEditFormChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={editFormData.password}
                            onChange={handleEditFormChange}
                        />
                    </div>
                    <div>
                        <button onClick={handleAddUserSubmit}>Add User</button>
                        <button onClick={handleCancelAddUser}>Cancel</button>
                    </div>
                </div>
            )}

            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th> {/* Add Roles column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input 
                                        type="text"
                                        name="fullName"
                                        value={editFormData.fullName}
                                        onChange={handleEditFormChange}
                                    />
                                ) : (
                                    user.fullName
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleEditFormChange}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>{user.roles.join(', ')}</td> {/* Display user roles */}
                            <td>
                                {editingUserId === user.id ? (
                                    <button onClick={() => handleSaveClick(user.id)}>Save</button>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEditClick(user)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;










