// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Modal from './Modal';

const AdminLogin = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use the GitHub Pages URL for the backend
      const response = await axios.get('https://kaharworkable.github.io/kaharcareerbackend/routes/admin', { params: { check: 'true' } });
      if (response.data.status === 'success') {
        await login(email, password);
        alert('Logged in successfully!');
        window.location.reload(); // Refresh the page on successful login
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </Modal>
  );
};

export default AdminLogin;
