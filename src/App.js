// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import AdminTools from './components/AdminTools';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check admin authentication status on component mount
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:8000/routes/admin.php?check=true');
        setIsAdmin(response.data.status === 'success');
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  // Handle admin login
  const handleLogin = () => {
    setIsAdmin(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isAdmin && <li><Link to="/admin/tools">Admin Tools</Link></li>}
          </ul>
        </nav>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/skills" component={Skills} />
          <Route path="/experience" component={Experience} />
          <Route path="/projects" component={Projects} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin/login">
            {isAdmin ? <Redirect to="/admin" /> : <AdminLogin onLogin={handleLogin} />}
          </Route>
          <Route path="/admin/tools">
            {isAdmin ? <AdminTools /> : <Redirect to="/admin/login" />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
