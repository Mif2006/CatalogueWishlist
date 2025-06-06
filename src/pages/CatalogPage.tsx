import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import Catalog from '../components/Catalog';
import ProductDetailPage from './ProductDetailPage';
import { useCatalogData } from '../hooks/useCatalogData';
import type { CatalogItem } from '../hooks/useCatalogData';

const categories = [
  { id: 'new', name: 'New Arrivals' },
  { id: 'rings', name: 'Rings' },
  { id: 'falange', name: 'Falange Rings' },
  { id: 'bracelets', name: 'Bracelets' },
  { id: 'chains', name: 'Chains' },
  { id: 'mens', name: 'Mens Wear' },
  { id: 'pendants', name: 'Pendants' },
  { id: 'earrings', name: 'Earrings' },
];

const CatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [selectedProduct, setSelectedProduct] = React.useState<CatalogItem | null>(null);
  const { items, loading, error, refetch } = useCatalogData();

  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'all') return items;
    if (activeCategory === 'new') return items.filter(item => item.isNew);
    if (activeCategory === 'rings') return items.filter(item => item.category === 'ring');
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  const collections = React.useMemo(() => {
    const uniqueCollections = [...new Set(items.filter(item => item.collection).map(item => item.collection))];
    return uniqueCollections.filter(Boolean) as string[];
  }, [items]);

  const handleItemClick = (item: CatalogItem) => {
    setSelectedProduct(item);
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
  };

  // If a product is selected, show the product detail page
  if (selectedProduct) {
    return (
      <ProductDetailPage 
        product={selectedProduct} 
        onBack={handleBackToCatalog}
      />
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-purple-500 dark:text-purple-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-dark-muted">Loading catalog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load catalog</p>
            <p className="text-gray-600 dark:text-dark-muted mb-4 text-sm">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-purple-gradient rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
          Zaavg Collection
        </h1>
        <p className="text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
          Explore our unique collection of handcrafted jewelry. Each piece is designed with modern aesthetics and exceptional quality.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-2xl p-4 md:p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text">
            {activeCategory === 'all' ? 'All Items' : categories.find(c => c.id === activeCategory)?.name || 'Items'} 
            <span className="text-sm text-gray-500 dark:text-dark-muted ml-2">
              ({filteredItems.length} items)
            </span>
          </h2>
          <button
            onClick={refetch}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
            title="Refresh catalog"
          >
            <RefreshCw className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
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
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-gradient text-white'
                  : 'bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-dark-accent/70'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {collections.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Collections:</h3>
            <div className="flex flex-wrap gap-2">
              {collections.map(collection => (
                <span key={collection} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  {collection}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <Catalog key={activeCategory} items={filteredItems} onItemClick={handleItemClick} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CatalogPage;