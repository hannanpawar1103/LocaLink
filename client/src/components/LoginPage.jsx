import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ emailOrUsername: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const loginData = {
                password: credentials.password,
            };

            // Determine if input is an email or username
            if (credentials.emailOrUsername.includes('@')) {
                loginData.email = credentials.emailOrUsername;
            } else {
                loginData.username = credentials.emailOrUsername;
            }

            // Send login data to the backend
            const response = await axios.post('/api/auth/login', loginData);

            // Handle success
            console.log('Login success:', response.data);
            // Redirect or perform other actions here
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r backdrop-blur-md w-1/3">
            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email or Username</label>
                        <input
                            type="text"
                            name="emailOrUsername"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email or username"
                            value={credentials.emailOrUsername}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="mt-4 text-center text-gray-600">Don't have an account? <a href="/api/auth/register" className="text-blue-600 hover:underline">Sign Up</a></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
