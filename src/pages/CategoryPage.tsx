import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Catalog from '../components/Catalog';
import { catalogData, categories } from '../data/mockData';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const categoryInfo = categories.find(c => c.id === category);
  const items = catalogData.filter(item => item.category === category);

  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/catalog"
          className="inline-flex items-center text-gray-600 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Catalog
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
          {categoryInfo.name}
        </h1>
        <p className="text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
          Explore our collection of {categoryInfo.name.toLowerCase()}, crafted with precision and elegance.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 mb-8"
      >
        <Catalog items={items} />
      </motion.div>
    </div>
  );
};

export default CategoryPage;