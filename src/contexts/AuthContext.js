import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseAuth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage first
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isDemo) {
        // If it's a demo user, set it directly and skip Firebase auth listener
        setCurrentUser(user);
        setLoading(false);
        return;
      }
    }

    // Listen for Firebase auth state changes (only for real Firebase users)
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, get additional user data from Firestore
        try {
          // For now, create user object from Firebase auth
          const userData = {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: 'admin', // Only admin role available
            avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email.split('@')[0])}&background=e91e63&color=fff`
          };
          setCurrentUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // User is signed out (only clear if not a demo user)
        const currentUserData = localStorage.getItem('currentUser');
        if (!currentUserData || !JSON.parse(currentUserData).isDemo) {
          setCurrentUser(null);
          localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password, role) => {
    try {
      const result = await firebaseAuth.signIn(email, password);
      
      if (result.success) {
        // Create user object with role
        const user = {
          id: result.user.uid,
          email: result.user.email,
          role: role || 'admin',
          name: result.user.displayName || email.split('@')[0],
          avatar: result.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.user.displayName || email.split('@')[0])}&background=e91e63&color=fff`
        };
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        // Check if it's a demo credential and Firebase auth fails
        const demoCredentials = [
          { email: 'admin@gigantefleur.com', password: 'admin123', role: 'admin', name: 'Admin User' }
        ];
        
        const demoUser = demoCredentials.find(cred => cred.email === email && cred.password === password);
        
        if (demoUser) {
          const user = {
            id: `demo_${demoUser.role}_${Date.now()}`,
            email: demoUser.email,
            role: demoUser.role,
            name: demoUser.name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(demoUser.name)}&background=e91e63&color=fff`,
            isDemo: true
          };
          
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return { success: true, user };
        }
        
        return { success: false, error: result.error || 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name, role) => {
    try {
      const result = await firebaseAuth.signUp(email, password);
      
      if (result.success) {
        // Create user object with role
        const user = {
          id: result.user.uid,
          email: result.user.email,
          role: role || 'admin',
          name: name || result.user.displayName || email.split('@')[0],
          avatar: result.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=e91e63&color=fff`
        };
        
        // Optionally save additional user data to Firestore
        // await firebaseDB.addUser(user);
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await firebaseAuth.signOut();
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if Firebase logout fails
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const isBuyer = () => {
    // No buyer role exists - always return false
    return false;
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin,
    isBuyer,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
