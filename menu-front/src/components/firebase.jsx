import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4hiOfkYxHXWn66UJuCYlFDjTP7AGwbmo",
  authDomain: "heladera-familiar.firebaseapp.com",
  projectId: "heladera-familiar",
  storageBucket: "heladera-familiar.firebasestorage.app",
  messagingSenderId: "93717137953",
  appId: "1:93717137953:web:181e9944b0320dc6f9f160"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
