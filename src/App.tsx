import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const navigate = useNavigate();
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
    <CartProvider>
      <div className="min-h-screen bg-jewelry-cream dark:bg-dark-bg overflow-x-hidden transition-colors duration-300">
        {!hasEnteredSite ? (
          <LandingPage onNavigate={(page) => {
            if (page === 'catalog') {
              navigate('/catalog');
              setHasEnteredSite(true);
            } else {
              navigate('/dashboard');
              setHasEnteredSite(true);
            }
          }} />
        ) : (
          <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
            <Routes>
              <Route path="/dashboard" element={
                !isAuthenticated ? (
                  <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
                ) : (
                  <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                )
              } />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:category" element={<CategoryPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
          </>
        )}
      </div>
    </CartProvider>
  );
}

export default App;