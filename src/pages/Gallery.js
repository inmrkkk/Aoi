import React, { useState, useEffect } from 'react';
import FlowerModal from '../components/FlowerModal';
import { useAuth } from '../contexts/AuthContext';

const Gallery = ({ flowers }) => {
  const [filteredFlowers, setFilteredFlowers] = useState(flowers);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    let filtered = flowers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(flower =>
        flower.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flower.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFlowers(filtered);
  }, [flowers, searchTerm]);

  const openModal = (flower) => {
    setSelectedFlower(flower);
  };

  const closeModal = () => {
    setSelectedFlower(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Beautiful Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our hand-crafted bouquets, perfect for every special moment
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Search Bar */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bouquets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flower-rose"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredFlowers.length} {filteredFlowers.length === 1 ? 'bouquet' : 'bouquets'}
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredFlowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlowers.map((flower) => (
              <div
                key={flower.id}
                onClick={() => openModal(flower)}
                className="flower-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={flower.image}
                    alt={flower.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{flower.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{flower.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-flower-rose">{flower.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-upload text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bouquets yet</h3>
            <p className="text-gray-500 mb-4">Be the first to upload a beautiful bouquet design!</p>
            {isAdmin() ? (
              <button
                onClick={() => window.location.href = '/upload'}
                className="btn-primary inline-block"
              >
                <i className="fas fa-upload mr-2"></i>
                Upload Your First Bouquet
              </button>
            ) : (
              <p className="text-sm text-gray-400">Admin users can upload bouquets</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedFlower && (
        <FlowerModal flower={selectedFlower} onClose={closeModal} />
      )}
    </div>
  );
};

export default Gallery;
