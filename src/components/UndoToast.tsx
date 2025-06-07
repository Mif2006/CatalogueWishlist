import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const UndoToast: React.FC = () => {
  const { state, dispatch } = useCart();
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (state.removedItem) {
      setTimeLeft(3);
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.removedItem]);

  const handleUndo = () => {
    dispatch({ type: 'UNDO_REMOVE' });
  };

  const handleDismiss = () => {
    dispatch({ type: 'CLEAR_REMOVED_ITEM' });
  };

  if (!state.removedItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
      >
        <div className="bg-white dark:bg-dark-card shadow-2xl rounded-xl border border-gray-200 dark:border-dark-accent overflow-hidden">
          {/* Progress bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3, ease: 'linear' }}
            className="h-1 bg-purple-500 dark:bg-purple-400"
          />
          
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-dark-accent">
                <img
                  src={state.removedItem.item.imageUrl}
                  alt={state.removedItem.item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-jewelry-dark dark:text-dark-text truncate">
                  Removed "{state.removedItem.item.name}"
                  {state.removedItem.item.selectedSize && (
                    <span className="text-gray-500 dark:text-dark-muted ml-1">
                      (Size: {state.removedItem.item.selectedSize})
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">
                  Undo in {timeLeft} second{timeLeft !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUndo}
                  className="px-3 py-1.5 bg-purple-gradient rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center space-x-1"
                >
                  <Undo2 size={14} />
                  <span>Undo</span>
                </motion.button>
                
                <button
                  onClick={handleDismiss}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
                >
                  <X size={16} className="text-gray-500 dark:text-dark-muted" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UndoToast;