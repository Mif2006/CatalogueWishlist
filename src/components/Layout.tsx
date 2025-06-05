import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import MinimizedNavbar from './MinimizedNavbar';
import BackToTop from './BackToTop';
import MobileSidebar from './MobileSidebar';

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout: React.FC<LayoutProps> = ({ darkMode, setDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMinimizedNavVisible, setIsMinimizedNavVisible] = useState(false);

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
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MinimizedNavbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isVisible={isMinimizedNavVisible}
      />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Outlet />
      <BackToTop />
    </div>
  );
}

export default Layout