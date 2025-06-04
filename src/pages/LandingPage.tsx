import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Diamond, Shield, Star, Truck } from 'lucide-react';

const LandingPage: React.FC<{ onNavigate: (page: 'catalog' | 'dashboard') => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-jewelry-cream dark:bg-dark-bg">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-76px)]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=3270"
            alt="Luxury jewelry collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6"
            >
              Timeless Elegance, Modern Design
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-200 mb-8"
            >
              Discover our exquisite collection of handcrafted jewelry, where tradition meets contemporary sophistication.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => onNavigate('catalog')}
                className="px-8 py-3 bg-purple-gradient rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 group"
              >
                Explore Collection
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-colors"
              >
                View Dashboard
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4"
            >
              Why Choose Lumina
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 dark:text-dark-muted max-w-2xl mx-auto"
            >
              Experience luxury jewelry shopping with confidence, backed by our commitment to quality and service.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Diamond className="w-8 h-8 text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-serif text-jewelry-dark dark:text-dark-text mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-dark-muted">Finest materials and expert craftsmanship in every piece</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-serif text-jewelry-dark dark:text-dark-text mb-2">Secure Shopping</h3>
              <p className="text-gray-600 dark:text-dark-muted">100% secure payments and buyer protection</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Truck className="w-8 h-8 text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-serif text-jewelry-dark dark:text-dark-text mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-dark-muted">Free worldwide shipping on all orders</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Star className="w-8 h-8 text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-serif text-jewelry-dark dark:text-dark-text mb-2">5-Star Service</h3>
              <p className="text-gray-600 dark:text-dark-muted">Dedicated support and hassle-free returns</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;