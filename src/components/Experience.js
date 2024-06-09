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

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Experience</h2>
      {experienceInfo.length > 0 ? (
        experienceInfo.map((info) => (
          <p key={info.id} className="text-lg">{info.content}</p>
        ))
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Experience;
