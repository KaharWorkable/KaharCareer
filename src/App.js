// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import Footer from './components/Footer';

// Use lazy for components
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
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Header />
          <div className="flex-grow">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/tools" element={<AdminTools />} />
                <Route path="/" element={<Navigate to="/about" />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
