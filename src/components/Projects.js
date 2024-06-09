// src/components/Projects.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';

const Projects = () => {
  const [projectInfo, setProjectInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching projects data...');
        const data = await fetchDocuments('projects');
        console.log('Data fetched:', data);
        setProjectInfo(data);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      {projectInfo.length > 0 ? (
        projectInfo.map((info) => (
          <p key={info.id} className="text-lg">{info.content}</p>
        ))
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Projects;
