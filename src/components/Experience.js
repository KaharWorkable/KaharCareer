// src/components/Experience.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';

const Experience = () => {
  const [experienceInfo, setExperienceInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching experience data...');
        const data = await fetchDocuments('experience');
        console.log('Data fetched:', data);
        setExperienceInfo(data);
      } catch (error) {
        console.error('Error fetching experience data:', error);
      }
    };

    getData();
  }, []);

  const highlightTextBeforeColon = (text) => {
    const parts = text.split(':');
    return (
      <>
        <span className="font-semibold text-gray-800">{parts[0]}</span>
        {parts[1] ? `: ${parts[1]}` : ''}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Work Experience</h2>
      {experienceInfo.length > 0 ? (
        experienceInfo.map((info) => (
          <div key={info.id} className="mb-8 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800">{info.company}</h3>
            <p className="text-lg italic text-gray-600">{info.role}</p>
            <p className="text-lg text-gray-600">{info.duration}</p>
            <ul className="list-disc ml-6 mt-4 text-gray-700">
              {info.details.map((detail, index) => (
                <li key={index} className="text-lg mb-2">{highlightTextBeforeColon(detail)}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-lg text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Experience;
