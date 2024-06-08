// src/utils/firestoreUtils.js
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';

/**
 * Add a document to a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {Object} data - The data to add
 * @returns {Promise<void>}
 */
export const addDocument = async (collectionName, data) => {
  try {
    const timestamp = new Date().toISOString();
    await addDoc(collection(db, collectionName), {
      ...data,
      created_at: timestamp,
      updated_at: timestamp
    });
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
  }
};

/**
 * Update a document in a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} id - The ID of the document to update
 * @param {Object} data - The data to update
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, id, data) => {
  try {
    const timestamp = new Date().toISOString();
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updated_at: timestamp
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
  }
};

/**
 * Delete a document from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} id - The ID of the document to delete
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
  }
};

/**
 * Fetch all documents from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @returns {Promise<Array>}
 */
export const fetchDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    return [];
  }
};
