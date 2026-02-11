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

      {/* Features Section */}
      <section className="py-20 bg-flower-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Gigante Fleur?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're passionate about creating beautiful moments with our hand-crafted floral arrangements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-flower-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fresh & Premium</h3>
              <p className="text-gray-600">
                Only the finest, freshest flowers selected daily for our arrangements
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-flower-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-truck text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery available for orders placed before 2 PM
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-flower-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Made with Love</h3>
              <p className="text-gray-600">
                Each arrangement is hand-crafted with care and attention to detail
              </p>
            </div>
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
