// src/utils/errorLogger.js
import { addDocument } from './firestoreUtils';

/**
 * Log an error to Firestore
 * @param {string} category - The category of the error (e.g., "FetchError", "ValidationError")
 * @param {string} message - The error message
 * @param {string} [path] - The file path where the error occurred
 * @param {Object} [additionalInfo] - Any additional information related to the error
 * @returns {Promise<void>}
 */
const logError = async (category, message, path = '', additionalInfo = {}) => {
  try {
    await addDocument('debug_table', {
      category,
      message,
      path,
      additionalInfo
    });
  } catch (error) {
    console.error('Error logging to Firestore:', error);
  }
};

export default logError;
