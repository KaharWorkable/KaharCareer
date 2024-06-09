import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8g7L_G05Z1uE929cdeWS6FYW66SPCAXA",
  authDomain: "kaharcareer-db5ff.firebaseapp.com",
  projectId: "kaharcareer-db5ff",
  storageBucket: "kaharcareer-db5ff.appspot.com",
  messagingSenderId: "181875297231",
  appId: "1:181875297231:web:bc87bcab42089d7304e0ba",
  measurementId: "G-H4SD78DNB1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };