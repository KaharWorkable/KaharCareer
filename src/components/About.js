// src/components/About.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';
import { FaLinkedin, FaInstagram, FaTimes } from 'react-icons/fa';

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-500 text-white">
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <img
            src="https://media.licdn.com/dms/image/C4D03AQHBCxycOLTXvA/profile-displayphoto-shrink_200_200/0/1654167793922?e=1723680000&v=beta&t=aM19HVp2fPjZV_1EZUwLQY4QWQrhyNh9ldWx-1bE_2Y" // Replace with the path to your image
            alt="Kahar"
            className="w-512 h-512 rounded-full mb-64 md:mb-0 md:mr-24"
          />
          <div className="md:text-left">
            <h1 className="text-4xl font-bold mb-2">
              Hello <span className="inline-block">👋</span> I'm Kahar,
            </h1>
            {aboutInfo.length > 0 ? (
              aboutInfo.map((info) => (
                <h1 key={info.id} className="text-3xl leading-relaxed mb-4">{info.me}</h1>
              ))
            ) : (
              <p className="text-lg text-gray-500">Loading...</p>
            )}
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
                <FaTimes className="text-2xl hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
