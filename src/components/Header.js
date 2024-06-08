// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Header = () => {
  const [header, setHeader] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const headerCollection = collection(db, 'headers');
      const headerSnapshot = await getDocs(headerCollection);
      const headerList = headerSnapshot.docs.map(doc => doc.data());
      setHeader(headerList[0]); // Assuming there's only one header document
    };

    fetchHeader();
  }, []);

  if (!header) return <div>Loading...</div>;

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <img src={header.logo_url} alt="Logo" />
        <h1 className="text-3xl font-bold">{header.title}</h1>
        <nav>
          <ul className="flex space-x-4">
            {header.nav_links.map(link => (
              <li key={link.label}><a href={link.url}>{link.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
