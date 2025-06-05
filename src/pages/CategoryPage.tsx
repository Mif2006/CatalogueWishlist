import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Catalog from '../components/Catalog';
import { catalogData } from '../data/mockData';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const filteredItems = catalogData.filter(item => item.category === category);
  
  const getCategoryTitle = () => {
    switch (category) {
      case 'rings': return 'Elegant Rings';
      case 'falange': return 'Falange Rings';
      case 'bracelets': return 'Luxury Bracelets';
      case 'chains': return 'Fine Chains';
      case 'mens': return "Men's Collection";
      case 'pendants': return 'Stunning Pendants';
      case 'earrings': return 'Beautiful Earrings';
      default: return 'New Arrivals';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
          {getCategoryTitle()}
        </h1>
        <p className="text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
          Discover our carefully curated selection of {category} pieces, each crafted with exceptional attention to detail.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 mb-8"
      >
        <Catalog items={filteredItems} />
      </motion.div>
    </div>
  );
};

export default CategoryPage;