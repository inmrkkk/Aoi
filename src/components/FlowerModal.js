import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const FlowerModal = ({ flower, onClose }) => {
  const { addToCart, isInCart } = useCart();
  const { isBuyer } = useAuth();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    addToCart(flower);
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
    message.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${flower.title} added to cart!`;
    document.body.appendChild(message);
    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-times text-gray-600 text-xl"></i>
          </button>

          {/* Image */}
          <div className="h-96 md:h-[500px] overflow-hidden">
            <img
              src={flower.image}
              alt={flower.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{flower.title}</h2>
              <span className="text-3xl font-bold text-flower-rose">{flower.price}</span>
            </div>

            <p className="text-lg text-gray-600 mb-6">{flower.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-flower-pink text-flower-rose px-4 py-2 rounded-full font-medium">
                <i className="fas fa-tag mr-2"></i>{flower.category}
              </span>
              <span className="bg-flower-green text-green-700 px-4 py-2 rounded-full font-medium">
                <i className="fas fa-calendar mr-2"></i>{flower.occasion.replace('-', ' ')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isBuyer() && (
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    isInCart(flower.id)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'btn-primary'
                  }`}
                >
                  {isInCart(flower.id) ? (
                    <><i className="fas fa-check mr-2"></i>In Cart</>
                  ) : (
                    <><i className="fas fa-shopping-cart mr-2"></i>Add to Cart</>
                  )}
                </button>
              )}
              <button className="btn-secondary flex-1">
                <i className="fas fa-heart mr-2"></i>
                Save to Favorites
              </button>
            </div>

            {/* Additional Details */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center">
                  <i className="fas fa-ruler-vertical mr-3 text-flower-rose"></i>
                  <span>Height: Approximately 18-24 inches</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock mr-3 text-flower-rose"></i>
                  <span>Freshness: 5-7 days with proper care</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-spa mr-3 text-flower-rose"></i>
                  <span>Seasonal flowers based on availability</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-truck mr-3 text-flower-rose"></i>
                  <span>Free delivery on orders over $50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerModal;
