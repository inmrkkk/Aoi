import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnuEjIxlc1gBj8LiGJ6MEqskqQCu6kC2Y",
  authDomain: "gigante-fleur.firebaseapp.com",
  projectId: "gigante-fleur",
  storageBucket: "gigante-fleur.firebasestorage.app",
  messagingSenderId: "201607462908",
  appId: "1:201607462908:web:cb0eba3dcbc9867bf3fc79",
  measurementId: "G-SRCZ3GM2TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication functions
export const firebaseAuth = {
  signIn: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signUp: async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};

// Firestore functions
export const firebaseDB = {
  // Flowers collection
  addFlower: async (flowerData) => {
    try {
      const docRef = await addDoc(collection(db, 'flowers'), flowerData);
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getFlowers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'flowers'));
      const flowers = [];
      querySnapshot.forEach((doc) => {
        flowers.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, flowers };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateFlower: async (flowerId, flowerData) => {
    try {
      await updateDoc(doc(db, 'flowers', flowerId), flowerData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteFlower: async (flowerId) => {
    try {
      await deleteDoc(doc(db, 'flowers', flowerId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Users collection
  addUser: async (userData) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), userData);
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getUser: async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { success: true, user: { id: userDoc.id, ...userDoc.data() } };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Orders collection
  addOrder: async (orderData) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getOrders: async (userId) => {
    try {
      const q = query(collection(db, 'orders'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, orders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Storage functions
export const firebaseStorage = {
  uploadImage: async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export { app, auth, db, storage, analytics };