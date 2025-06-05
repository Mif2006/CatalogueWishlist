import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { X, Store, User, ShoppingBag, Heart } from 'lucide-react';
import Navbar from './Navbar';
import MinimizedNavbar from './MinimizedNavbar';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, setDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMinimizedNavVisible, setIsMinimizedNavVisible] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname.startsWith('/catalog') ? 'catalog' : 'dashboard';

  useEffect(() => {
    const handleScroll = () => {
      setIsMinimizedNavVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-jewelry-cream dark:bg-dark-bg overflow-x-hidden transition-colors duration-300">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage={currentPage}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        hasEnteredSite={true}
      />
      
      <MinimizedNavbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isVisible={isMinimizedNavVisible}
      />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-dark-muted" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => {
                    window.location.href = '/dashboard';
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === 'dashboard'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                      : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <User size={20} className="text-purple-500 dark:text-purple-400" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    window.location.href = '/catalog';
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === 'catalog'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300'
                      : 'text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <Store size={20} className="text-purple-500 dark:text-purple-400" />
                  <span>Catalog</span>
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {children}
      <BackToTop />
    </div>
  );
};

export default Layout;