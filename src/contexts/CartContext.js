import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (!loading) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  const addToCart = (flower, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === flower.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...flower, quantity }];
      }
    });
  };

  const removeFromCart = (flowerId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== flowerId));
  };

  const updateQuantity = (flowerId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(flowerId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === flowerId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (flowerId) => {
    return cartItems.some(item => item.id === flowerId);
  };

  const getQuantity = (flowerId) => {
    const item = cartItems.find(item => item.id === flowerId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    getQuantity,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};
