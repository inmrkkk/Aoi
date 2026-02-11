import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAdmin } = useAuth();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-flower-pink to-flower-rose">
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Fresh Bouquets
            <br />
            <span className="text-flower-rose">Delivered With Love</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Hand-crafted arrangements made with the freshest flowers, perfect for every occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery" className="btn-primary inline-block text-center">
              <i className="fas fa-images mr-2"></i>
              View Gallery
            </Link>
            {isAdmin() && (
              <Link to="/upload" className="btn-secondary inline-block text-center">
                <i className="fas fa-upload mr-2"></i>
                Upload Design
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-flower-rose to-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Brighten Someone's Day?
          </h2>
          <p className="text-xl text-white mb-8">
            Browse our gallery or create your own custom bouquet
          </p>
          <Link to="/gallery" className="btn-primary bg-white text-flower-rose hover:bg-gray-100">
            <i className="fas fa-arrow-right mr-2"></i>
            Explore Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
