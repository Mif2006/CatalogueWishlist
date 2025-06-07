import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: string, quantity: number, selectedSize?: string) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      // Find the item to check stock limits
      const item = state.items.find(cartItem => cartItem.id === id);
      if (item && selectedSize && item.sizes) {
        const availableStock = item.sizes[selectedSize] || 0;
        const maxQuantity = Math.min(quantity, availableStock);
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: maxQuantity } });
      } else {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
      }
    }
  };
  
  return (
    <>
      <button 
        className="relative p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
        aria-label="Shopping Cart"
      >
        <ShoppingCart size={20} />
        {state.items.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-gradient text-white text-xs font-medium rounded-full flex items-center justify-center shadow-lg">
            {state.items.length}
          </span>
        )}
      </button>
      
      <AnimatePresence>
        {state.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full max-w-[400px] bg-white dark:bg-dark-card shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-accent flex justify-between items-center bg-white dark:bg-dark-card">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="text-purple-500 dark:text-purple-400" size={24} />
                  <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text">
                    Shopping Cart {state.items.length > 0 && `(${state.items.length})`}
                  </h2>
                </div>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} className="text-gray-500 dark:text-dark-muted" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-6">
                  <div className="space-y-4">
                    {state.items.map(item => {
                      const availableStock = item.selectedSize && item.sizes ? item.sizes[item.selectedSize] || 0 : 10;
                      const isAtMaxStock = item.quantity >= availableStock;
                      
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex space-x-4 bg-gray-50 dark:bg-dark-accent/30 p-4 rounded-xl border border-gray-100 dark:border-dark-accent"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-dark-card shadow-md">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-jewelry-dark dark:text-dark-text text-sm mb-1 truncate">
                              {item.name}
                            </h3>
                            {item.selectedSize && (
                              <p className="text-xs text-gray-500 dark:text-dark-muted mb-1">
                                Size: {item.selectedSize}
                              </p>
                            )}
                            <p className="text-purple-500 dark:text-purple-400 font-medium text-lg mb-3">
                              ₽{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} className="text-gray-500 dark:text-dark-muted" />
                                </button>
                                <span className="w-8 text-center font-medium text-jewelry-dark dark:text-dark-text text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                                  disabled={isAtMaxStock}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isAtMaxStock 
                                      ? 'opacity-50 cursor-not-allowed' 
                                      : 'hover:bg-gray-100 dark:hover:bg-dark-accent'
                                  }`}
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} className="text-gray-500 dark:text-dark-muted" />
                                </button>
                              </div>
                              <button
                                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 hover:text-red-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            {item.selectedSize && item.sizes && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 dark:text-dark-muted">
                                  {availableStock > 0 ? (
                                    <span className="text-green-600 dark:text-green-400">
                                      {availableStock} available
                                    </span>
                                  ) : (
                                    <span className="text-red-500 dark:text-red-400">
                                      Out of stock
                                    </span>
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    {state.items.length === 0 && (
                      <div className="text-center py-12">
                        <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300 dark:text-dark-accent" />
                        <p className="text-gray-500 dark:text-dark-muted text-lg">Your cart is empty</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="px-6 py-6 border-t border-gray-100 dark:border-dark-accent bg-white dark:bg-dark-card">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-jewelry-dark dark:text-dark-text text-lg">Total</span>
                    <span className="text-2xl font-serif text-purple-500 dark:text-purple-400">
                      ₽{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button className="w-full py-4 bg-purple-gradient rounded-xl text-white font-medium text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;