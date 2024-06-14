// src/components/About.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments, uploadFile } from '../utils/firestoreUtils';
import { FaLinkedin, FaInstagram, FaTimes, FaDownload } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState([]);
  const [file, setFile] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDocuments('about');
        setAboutInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadFile(file, 'resumes');
        alert('Resume uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload resume');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <img
            src="https://media.licdn.com/dms/image/C4D03AQHBCxycOLTXvA/profile-displayphoto-shrink_200_200/0/1654167793922?e=1723680000&v=beta&t=aM19HVp2fPjZV_1EZUwLQY4QWQrhyNh9ldWx-1bE_2Y"
            alt="Kahar"
            className="w-48 h-48 rounded-full mb-4 md:mb-0 md:mr-6"
          />
          <div className="md:text-left">
            <h1 className="text-4xl font-bold mb-2">
              Hello <span className="inline-block">👋</span> I'm Kahar,
            </h1>
            {aboutInfo.length > 0 ? (
              aboutInfo.map((info) => (
                <h1 key={info.id} className="text-2xl leading-relaxed mb-4">{info.me}</h1>
              ))
            ) : (
              <p className="text-lg text-gray-500">Loading...</p>
            )}
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-gray-700" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-gray-700" />
              </a>
              <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
                <FaTimes className="text-2xl hover:text-gray-700" />
              </a>
            </div>
            <div className="mt-6">
              <a href="#" className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <FaDownload className="mr-2" /> Download Resume
              </a>
            </div>
            {isAdmin && (
              <div className="mt-6">
                <input type="file" onChange={handleFileChange} className="mb-2" />
                <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Upload Resume</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
