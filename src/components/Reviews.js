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

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Logic for submitting review to Firestore
    alert('Review submitted successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <p key={review.id} className="text-lg">{review.content}</p>
          ))
        ) : (
          <p className="text-lg">Loading...</p>
        )}
        <hr className="my-8 border-gray-300" />
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Leave a Review</h2>
          <p className="text-center text-gray-600 mb-4">
            I would love to hear your feedback on my resume and website. What areas do you think I can improve to make my profile more compelling?
          </p>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
            </div>
            <div className="text-left">
              <button type="submit" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
