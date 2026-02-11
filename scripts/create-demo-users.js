// Script to create demo users in Firebase
// Run this script once to create the demo accounts

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

const demoUsers = [
  {
    email: 'admin@bloomblossom.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    email: 'buyer@bloomblossom.com',
    password: 'buyer123',
    name: 'John Buyer',
    role: 'buyer'
  }
];

async function createDemoUsers() {
  console.log('Creating demo users...');
  
  for (const user of demoUsers) {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log(`✅ Created user: ${user.email}`);
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid
      });
      
      console.log(`✅ Saved user data for: ${user.email}`);
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  User already exists: ${user.email}`);
      } else {
        console.error(`❌ Error creating user ${user.email}:`, error.message);
      }
    }
  }
  
  console.log('Demo user creation complete!');
  console.log('\nYou can now login with:');
  console.log('🔑 Admin: admin@bloomblossom.com / admin123');
  console.log('🛒 Buyer: buyer@bloomblossom.com / buyer123');
}

// Run the function
createDemoUsers().then(() => {
  console.log('\nScript completed. You can now start the application.');
}).catch(error => {
  console.error('Script failed:', error);
});
