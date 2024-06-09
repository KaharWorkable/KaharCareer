// src/components/Reviews.js
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/firestoreUtils';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching reviews data...');
        const data = await fetchDocuments('reviews');
        console.log('Data fetched:', data);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <p key={review.id} className="text-lg">{review.content}</p>
        ))
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Reviews;
