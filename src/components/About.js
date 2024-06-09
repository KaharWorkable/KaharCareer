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
      <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {aboutInfo.length > 0 ? (
          aboutInfo.map((info) => (
            <p key={info.id} className="text-lg text-gray-700 leading-relaxed mb-4"><strong>{info.me}</strong></p>
          ))
        ) : (
          <p className="text-lg text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default About;