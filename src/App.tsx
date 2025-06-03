import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Store, User, ShoppingBag, Heart } from 'lucide-react';
import Image from 'next/image';
import Dashboard from './components/Dashboard';
import CatalogPage from './pages/CatalogPage';
import BackToTop from './components/BackToTop';
import Cart from './components/Cart';
import MinimizedNavbar from './components/MinimizedNavbar';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'catalog'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMinimizedNavVisible, setIsMinimizedNavVisible] = useState(false);

  useEffect(() => {
    // Update class on document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsMinimizedNavVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-jewelry-cream dark:bg-dark-bg overflow-x-hidden transition-colors duration-300">
        <MinimizedNavbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(prev => !prev)}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isVisible={isMinimizedNavVisible}
        />
        <header className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant sticky top-0 z-30 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-gradient flex items-center justify-center">
                  <span className="text-white font-serif text-lg md:text-xl">L</span>
                </div>
                <h1 className="text-xl md:text-2xl font-serif text-jewelry-dark dark:text-dark-text">
                  Lumina <span className="text-purple-500">Jewelry</span>
                </h1>
              </motion.div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'dashboard'
                      ? 'text-purple-500 dark:text-purple-400'
                      : 'text-gray-600 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage('catalog')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'catalog'
                      ? 'text-purple-500 dark:text-purple-400'
                      : 'text-gray-600 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400'
                  }`}
                >
                  Catalog
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                className="block md:hidden p-2 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
                onClick={() => setDarkMode(prev => !prev)}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Cart />
            </div>
          </div>
        </header>
        
        {/* Mobile Sidebar */}
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
                      setCurrentPage('dashboard');
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
                      setCurrentPage('catalog');
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
                  <button
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors text-jewelry-dark dark:text-dark-text hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  >
                    <ShoppingBag size={20} className="text-purple-500 dark:text-purple-400" />
                    <span>Orders</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
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
        
        {currentPage === 'dashboard' ? (
          <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
        ) : (
          <CatalogPage />
        )}
        <BackToTop />
      </div>
  );
}

export default App;