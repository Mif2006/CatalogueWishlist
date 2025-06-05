import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [hasEnteredSite, setHasEnteredSite] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {!hasEnteredSite ? (
            <>
              <Route 
                path="/" 
                element={
                  <LandingPage 
                    onNavigate={(page) => {
                      setHasEnteredSite(true);
                    }} 
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </>
          ) : (
            <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
              <Route path="/" element={<Navigate to="/catalog\" replace />} />
              <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:category" element={<CategoryPage />} />
              <Route path="/catalog/:category/:productId" element={<ProductPage />} />
            </Route>
          )}
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;