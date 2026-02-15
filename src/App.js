import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { firebaseDB } from './firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import About from './pages/About';
import Login from './pages/Login';
import './App.css';

function App() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const loadFlowers = async () => {
      try {
        // Try to load from Firebase first
        const result = await firebaseDB.getFlowers();
        
        if (result.success) {
          setFlowers(result.flowers);
          localStorage.setItem('flowers', JSON.stringify(result.flowers));
        } else {
          // Fallback to localStorage
          const storedFlowers = localStorage.getItem('flowers');
          if (storedFlowers) {
            setFlowers(JSON.parse(storedFlowers));
          } else {
            // Start with empty array
            setFlowers([]);
            localStorage.setItem('flowers', JSON.stringify([]));
          }
        }
      } catch (error) {
        console.error('Error loading flowers:', error);
        // Fallback to localStorage
        const storedFlowers = localStorage.getItem('flowers');
        if (storedFlowers) {
          setFlowers(JSON.parse(storedFlowers));
        } else {
          // Start with empty array
          setFlowers([]);
          localStorage.setItem('flowers', JSON.stringify([]));
        }
      }
    };

    loadFlowers();
  }, []);

  const addFlower = async (newFlower) => {
    try {
      console.log('Attempting to add flower to Firebase:', newFlower);
      // Try to add to Firebase first
      const result = await firebaseDB.addFlower(newFlower);
      
      if (result.success) {
        console.log('Successfully added to Firebase with ID:', result.id);
        const flowerWithId = { ...newFlower, id: result.id };
        const updatedFlowers = [...flowers, flowerWithId];
        setFlowers(updatedFlowers);
        localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
        return flowerWithId;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error adding flower to Firebase:', error);
      console.log('Falling back to local storage...');
      // Fallback to local storage
      const flowerWithId = { ...newFlower, id: Date.now() };
      const updatedFlowers = [...flowers, flowerWithId];
      setFlowers(updatedFlowers);
      localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
      console.log('Successfully saved to local storage');
      return flowerWithId;
    }
  };

  const updateFlower = async (flowerId, updatedData) => {
    try {
      // Try to update in Firebase first
      const result = await firebaseDB.updateFlower(flowerId, updatedData);
      
      if (result.success) {
        const updatedFlowers = flowers.map(flower =>
          flower.id === flowerId ? { ...flower, ...updatedData } : flower
        );
        setFlowers(updatedFlowers);
        localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error updating flower in Firebase:', error);
      // Fallback to local storage
      const updatedFlowers = flowers.map(flower =>
        flower.id === flowerId ? { ...flower, ...updatedData } : flower
      );
      setFlowers(updatedFlowers);
      localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
    }
  };

  const deleteFlower = async (flowerId) => {
    try {
      // Try to delete from Firebase first
      const result = await firebaseDB.deleteFlower(flowerId);
      
      if (result.success) {
        const updatedFlowers = flowers.filter(flower => flower.id !== flowerId);
        setFlowers(updatedFlowers);
        localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error deleting flower from Firebase:', error);
      // Fallback to local storage
      const updatedFlowers = flowers.filter(flower => flower.id !== flowerId);
      setFlowers(updatedFlowers);
      localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery flowers={flowers} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Upload onAddFlower={addFlower} flowers={flowers} onUpdateFlower={updateFlower} onDeleteFlower={deleteFlower} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
