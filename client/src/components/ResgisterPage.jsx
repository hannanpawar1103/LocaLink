import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("password", userData.password);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },                     
      });   

      console.log("Registration success:", response.data);
      // Redirect to login page or dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-1/3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600">Avatar</label>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?
          </p>
          <Link to="/api/auth/login">
            <p className="text-center text-indigo-600 hover:underline">Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
