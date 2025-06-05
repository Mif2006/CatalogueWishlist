import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Store, User, ShoppingBag, Heart } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-card shadow-lg z-50"
          >
            <div className="p-4 border-b border-gray-100 dark:border-dark-accent flex justify-between items-center">
              <h2 className="text-lg font-serif text-jewelry-dark dark:text-dark-text">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-dark-muted" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                    : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                }`}
              >
                <User size={20} className="text-purple-500 dark:text-purple-400" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handleNavigation('/catalog')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname.startsWith('/catalog')
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                    : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                }`}
              >
                <Store size={20} className="text-purple-500 dark:text-purple-400" />
                <span>Catalog</span>
              </button>
              <button
                onClick={() => handleNavigation('/orders')}
                className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20"
              >
                <ShoppingBag size={20} className="text-purple-500 dark:text-purple-400" />
                <span>Orders</span>
              </button>
              <button
                onClick={() => handleNavigation('/wishlist')}
                className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20"
              >
                <Heart size={20} className="text-purple-500 dark:text-purple-400" />
                <span>Wishlist</span>
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;