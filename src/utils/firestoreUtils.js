// src/utils/firestoreUtils.js
import { db, storage } from '../firebaseConfig'; // Ensure storage is imported
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions

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

/**
 * Fetch a single document from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} docId - The ID of the document to fetch
 * @returns {Promise<Object>} - The fetched document
 */
export const fetchDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} folder - The folder in storage to upload the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadFile = async (file, folder) => {
  try {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    
    // Optionally, store the file URL in Firestore
    await addDoc(collection(db, folder), { url: fileURL, created_at: new Date().toISOString() });

    return fileURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
