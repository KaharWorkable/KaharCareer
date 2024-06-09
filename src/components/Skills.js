// src/components/Skills.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching skills data...');
        const data = await fetchDocuments('skills');
        console.log('Data fetched:', data);
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Skills</h2>
      {skills.length > 0 ? (
        skills.map((skill) => (
          <p key={skill.id} className="text-lg">{skill.content}</p>
        ))
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Skills;
