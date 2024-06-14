// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const Header = () => {
  const [header, setHeader] = useState(null);
  const { isAdmin, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const headerCollection = collection(db, 'headers');
        const headerSnapshot = await getDocs(headerCollection);
        const headerList = headerSnapshot.docs.map(doc => doc.data());
        setHeader(headerList[0]); // Assuming there's only one header document
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };

    fetchHeader();
  }, []);

  if (!header) return <div className="text-center py-10">Loading...Will setup later</div>;

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <img src={header.logo_url} alt="Logo" className="w-16 h-16 mr-4"/>
          <h1 className="text-3xl font-bold">{header.title}</h1>
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {header.nav_links.map(link => (
              <li key={link.label}>
                <a href={link.url} className="text-blue-500 hover:text-blue-700">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 md:mt-0">
          {isAdmin ? (
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Admin Login
            </button>
          )}
        </div>
      </div>
      <AdminLogin show={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header;
