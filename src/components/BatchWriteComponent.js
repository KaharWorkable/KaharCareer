// src/components/BatchWriteComponent.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, writeBatch, doc } from 'firebase/firestore';

const BatchWriteComponent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleBatchWrite = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    const headerData = {
      logo_url: "https://5.imimg.com/data5/SELLER/Default/2023/5/309146928/EX/OP/NJ/146320826/logo-design-all-types-of-logo-design.png",
      title: "Kaharuddin Website",
      nav_links: [
        { label: "About", url: "/about" },
        { label: "Skills", url: "/skills" },
        { label: "Experience", url: "/experience" },
        { label: "Projects", url: "/projects" },
        { label: "Reviews", url: "/reviews" },
        { label: "Contact", url: "/contact" }
      ]
    };

    try {
      const batch = writeBatch(db);
      const headerRef = doc(collection(db, 'headers'));
      batch.set(headerRef, headerData);

      await batch.commit();
      setSuccess('Batch write completed successfully!');
    } catch (e) {
      console.error('Error in batch write: ', e);
      setError('Error in batch write: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Batch Write Data</h2>
      <button
        onClick={handleBatchWrite}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Start Batch Write'}
      </button>
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BatchWriteComponent;
