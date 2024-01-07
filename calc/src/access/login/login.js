// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../utils/context/authentication';
import './login.css';
import apiUrl from '../../utils/config/apiUrl';

const LoginForm = () => {
    const navigate = useNavigate();

    const { authState, login } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSuccess = () => {
        navigate('/calculator');
    };

    // Handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}access/login/`, {
                username,
                password,
            });
            console.log(response.data)
            login(response.data);
            handleLoginSuccess(response.data);
            
            // Handle successful login here, for example, update state or redirect
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Handle the error as needed
        }
    };

    return (
        <div className="login-auth-container">
            <div className="login-auth-card">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className='redirect-to-register'>
                        <a href="/access/register">Don't have an account? Sign Up</a>
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
