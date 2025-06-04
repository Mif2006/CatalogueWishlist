import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Store, User, ShoppingBag, Heart } from 'lucide-react';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import Dashboard from './components/Dashboard';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import { CartProvider } from './context/CartContext';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
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
  const [hasEnteredSite, setHasEnteredSite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <CartProvider>
      {!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? (
        <div className="min-h-screen bg-jewelry-cream dark:bg-dark-bg flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text mb-4">Environment Error</h2>
            <p className="text-gray-600 dark:text-dark-muted mb-4">
              Missing VITE_CLERK_PUBLISHABLE_KEY in environment variables. Please add it to your .env file.
            </p>
            <pre className="bg-gray-100 dark:bg-dark-accent p-4 rounded-lg text-sm mb-4 overflow-x-auto">
              VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
            </pre>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-jewelry-cream dark:bg-dark-bg overflow-x-hidden transition-colors duration-300">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentPage={hasEnteredSite ? currentPage : 'landing'}
          setCurrentPage={setCurrentPage}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          hasEnteredSite={hasEnteredSite}
        />
        {!hasEnteredSite ? (
          <LandingPage onNavigate={(page) => {
            setCurrentPage(page);
            if (page === 'catalog') {
              setHasEnteredSite(true);
            } else {
              // If dashboard is selected, show auth page
              setCurrentPage('dashboard');
              setHasEnteredSite(true);
            }
          }} />
        ) : (
          <>
            {currentPage === 'dashboard' ? (
              <>
                <SignedOut>
                  <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
                </SignedOut>
                <SignedIn>
                  <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                </SignedIn>
              </>
            ) : (
              <>
            <MinimizedNavbar
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(prev => !prev)}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isVisible={isMinimizedNavVisible}
            />
        
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
              </>
            )}
          </>
        )}
      </div>
      )}
    </CartProvider>
    </ClerkProvider>
  );
}

export default App;