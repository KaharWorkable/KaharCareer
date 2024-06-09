// src/components/About.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching data...');
        const data = await fetchDocuments('about');
        console.log('Data fetched:', data);
        setAboutInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      {aboutInfo.length > 0 ? (
        aboutInfo.map((info) => (
          <p key={info.id} className="text-lg">{info.me}</p>
        ))
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default About;