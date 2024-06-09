// src/App.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Reviews = lazy(() => import('./components/Reviews'));
const Contact = lazy(() => import('./components/Contact'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminTools = lazy(() => import('./components/AdminTools'));
const BatchWriteComponent = lazy(() => import("./components/BatchWriteComponent"));

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:8000/routes/admin?check=true');
        if (response.data.status === 'success') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setError('Failed to check admin status');
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">{error}</div>;
  console.log(isAdmin);
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleLogin} />} />
            <Route path="/admin/tools" element={isAdmin ? <AdminTools /> : <Navigate to="/admin/login" />} />
            <Route path="/" element={<Navigate to="/about" />} />
          </Routes>
          {isAdmin && <BatchWriteComponent />}
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
