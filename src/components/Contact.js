// src/components/Contact.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching contact data...');
        const data = await fetchDocuments('contact');
        console.log('Data fetched:', data);
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      {contactInfo.length > 0 ? (
        contactInfo.map((info) => (
          <p key={info.id} className="text-lg">{info.content}</p>
        ))
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Contact;
