import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { firebaseDB } from '../firebase';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { currentUser } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!currentUser) {
      alert('Please login to place an order');
      return;
    }

    setIsCheckingOut(true);
    
    try {
      // Create order data
      const orderData = {
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: currentUser.name,
        items: cartItems,
        total: getCartTotal(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        shippingAddress: {
          // You might want to collect this from a form
          name: currentUser.name,
          email: currentUser.email
        }
      };

      // Try to save to Firebase
      const result = await firebaseDB.addOrder(orderData);
      
      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.id}\nTotal: $${getCartTotal().toFixed(2)}`);
        clearCart();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any beautiful bouquets to your cart yet.
            </p>
            <Link to="/gallery" className="btn-primary inline-block">
              <i className="fas fa-arrow-left mr-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 mb-6 last:mb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <p className="text-flower-rose font-semibold">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-flower-rose">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card mr-2"></i>
                      Place Order
                    </>
                  )}
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full btn-secondary"
                >
                  <i className="fas fa-trash-alt mr-2"></i>
                  Clear Cart
                </button>

                <Link
                  to="/gallery"
                  className="w-full block text-center text-flower-rose hover:text-rose-600 font-medium"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </Link>
              </div>

              {/* User Info */}
              {currentUser && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    <i className="fas fa-user mr-2"></i>
                    Ordering as: {currentUser.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <i className="fas fa-envelope mr-2"></i>
                    {currentUser.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
