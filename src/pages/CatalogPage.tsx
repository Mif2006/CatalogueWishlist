import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertCircle, Search, X } from 'lucide-react';
import Catalog from '../components/Catalog';
import SizeSelectionModal from '../components/SizeSelectionModal';
import ProductDetailPage from './ProductDetailPage';
import { useCatalogData } from '../hooks/useCatalogData';
import type { CatalogItem } from '../hooks/useCatalogData';
import backgroundImage from '../assets/purple2.jpeg';

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
  const [activeCollection, setActiveCollection] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<CatalogItem | null>(null);
  const [selectedProductForSize, setSelectedProductForSize] = React.useState<CatalogItem | null>(null);
  const [showSizeModal, setShowSizeModal] = React.useState(false);
  const { items, loading, error, refetch } = useCatalogData();

  const filteredItems = React.useMemo(() => {
    let filtered = items;
    
    // Filter by category
    if (activeCategory !== 'all') {
      if (activeCategory === 'new') {
        filtered = filtered.filter(item => item.isNew);
      } else if (activeCategory === 'rings') {
        filtered = filtered.filter(item => item.category === 'ring');
      } else {
        filtered = filtered.filter(item => item.category === activeCategory);
      }
    }
    
    // Filter by collection
    if (activeCollection) {
      filtered = filtered.filter(item => item.collection === activeCollection);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.collection && item.collection.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [items, activeCategory, activeCollection, searchQuery]);

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
  
  const handleCollectionClick = (collection: string) => {
    if (activeCollection === collection) {
      // If clicking the same collection, clear the filter
      setActiveCollection(null);
    } else {
      setActiveCollection(collection);
    }
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setActiveCollection(null);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const closeSizeModal = () => {
    setShowSizeModal(false);
    setSelectedProductForSize(null);
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
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/60 dark:bg-dark-bg/60 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        className="bg-white/20 dark:bg-dark-card/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl rounded-2xl p-4 md:p-6 mb-8"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-serif text-white dark:text-white">
              {searchQuery 
                ? `Search Results`
                : activeCollection 
                  ? `${activeCollection} Collection`
                  : activeCategory === 'all' 
                    ? 'All Items' 
                    : categories.find(c => c.id === activeCategory)?.name || 'Items'
              }
              <span className="text-sm text-gray-300 dark:text-gray-300 ml-2">
                ({filteredItems.length} items)
              </span>
            </h2>
            {searchQuery && (
              <p className="text-sm text-gray-300 dark:text-gray-300 mt-1">
                Searching for "{searchQuery}"
              </p>
            )}
          </div>
          <button
            onClick={refetch}
            className="p-2 hover:bg-white/20 dark:hover:bg-white/20 rounded-full transition-colors"
            title="Refresh catalog"
          >
            <RefreshCw className="w-4 h-4 text-white dark:text-white" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-300 dark:text-gray-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-10 py-3 border border-white/20 dark:border-white/20 rounded-xl bg-black/30 dark:bg-black/30 backdrop-blur-md text-white dark:text-white placeholder-gray-300 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 dark:focus:ring-purple-400/50 focus:border-purple-400/70 dark:focus:border-purple-400/70 transition-all"
              style={{
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)'
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                <X className="h-5 w-5 text-gray-300 dark:text-gray-300" />
              </button>
            )}
          </div>
        </div>
        
        {/* Active Filters */}
        {(activeCategory !== 'all' || activeCollection || searchQuery) && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-300 dark:text-gray-300">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-green-500/30 backdrop-blur-md border border-green-400/40 text-green-200 dark:text-green-200 rounded-full text-xs font-medium flex items-center gap-1">
                Search: "{searchQuery.length > 20 ? searchQuery.substring(0, 20) + '...' : searchQuery}"
                <button
                  onClick={clearSearch}
                  className="ml-1 hover:bg-green-400/40 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {activeCategory !== 'all' && (
              <span className="px-3 py-1 bg-purple-500/30 backdrop-blur-md border border-purple-400/40 text-purple-200 dark:text-purple-200 rounded-full text-xs font-medium flex items-center gap-1">
                {categories.find(c => c.id === activeCategory)?.name || activeCategory}
                <button
                  onClick={() => setActiveCategory('all')}
                  className="ml-1 hover:bg-purple-400/40 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {activeCollection && (
              <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-md border border-blue-400/40 text-blue-200 dark:text-blue-200 rounded-full text-xs font-medium flex items-center gap-1">
                {activeCollection}
                <button
                  onClick={() => setActiveCollection(null)}
                  className="ml-1 hover:bg-blue-400/40 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-300 dark:text-gray-300 hover:text-purple-300 dark:hover:text-purple-300 underline"
            >
              Clear all
            </button>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all' && !activeCollection
                ? 'bg-purple-gradient text-white'
                : 'bg-black/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/20 text-white dark:text-white hover:bg-black/40 dark:hover:bg-black/40'
            }`}
            style={activeCategory !== 'all' || activeCollection ? {
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)'
            } : {}}
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
                  : 'bg-black/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/20 text-white dark:text-white hover:bg-black/40 dark:hover:bg-black/40'
              }`}
              style={activeCategory !== category.id ? {
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)'
              } : {}}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {collections.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white dark:text-white mb-2">Collections:</h3>
            <div className="flex flex-wrap gap-2">
              {collections.map(collection => (
                <button 
                  key={collection} 
                  onClick={() => handleCollectionClick(collection)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeCollection === collection
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-500/30 backdrop-blur-md border border-purple-400/40 text-purple-200 dark:text-purple-200 hover:bg-purple-500/40'
                  }`}
                  style={activeCollection !== collection ? {
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)'
                  } : {}}
                >
                  {collection}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <Catalog 
            key={`${activeCategory}-${activeCollection}-${searchQuery}`} 
            items={filteredItems} 
            onItemClick={handleItemClick}
            selectedProduct={selectedProductForSize}
            setSelectedProduct={setSelectedProductForSize}
            showSizeModal={showSizeModal}
            setShowSizeModal={setShowSizeModal}
          />
        </AnimatePresence>
      </motion.div>
    </div>
    
    {/* Size Selection Modal - Rendered at root level */}
    {selectedProductForSize && (
      <SizeSelectionModal
        isOpen={showSizeModal}
        onClose={closeSizeModal}
        product={selectedProductForSize}
      />
    )}
    </div>
  );
};

export default CatalogPage;