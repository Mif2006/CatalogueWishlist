import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Catalog from '../components/Catalog';
import { catalogData, categories } from '../data/mockData';

const CatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredItems = activeCategory === 'all' 
    ? catalogData 
    : catalogData.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
          Discover Our Collection
        </h1>
        <p className="text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
          Explore our curated selection of fine jewelry, from timeless classics to contemporary designs.
          Each piece is crafted with exceptional attention to detail and quality.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 mb-8"
      >
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-purple-gradient text-white'
                : 'bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-dark-accent/70'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/catalog/${category.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-gradient text-white'
                  : 'bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-dark-accent/70'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Catalog items={filteredItems} />
      </motion.div>
    </div>
  );
};

export default CatalogPage;