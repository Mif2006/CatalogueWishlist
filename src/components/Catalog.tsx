import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CatalogItem } from '../hooks/useCatalogData';

interface CatalogProps {
  items: CatalogItem[];
}

const Catalog: React.FC<CatalogProps> = ({ items }) => {
  const { dispatch, wishlist, toggleWishlist } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={64} className="mx-auto mb-4 text-gray-300 dark:text-dark-accent" />
        <p className="text-gray-500 dark:text-dark-muted text-lg">No items found in this category</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-elegant dark:shadow-dark-elegant overflow-hidden group"
        >
          <div className="relative aspect-square overflow-hidden">
            {item.isNew && (
              <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-purple-gradient rounded-full">
                <span className="text-xs text-white font-medium">New</span>
              </div>
            )}
            {item.collection && (
              <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-white/90 dark:bg-dark-card/90 rounded-full">
                <span className="text-xs text-purple-500 dark:text-purple-400 font-medium capitalize">{item.collection}</span>
              </div>
            )}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/90 dark:bg-dark-card/90 rounded-full text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => toggleWishlist(item)}
                className="p-2 bg-white/90 dark:bg-dark-card/90 rounded-full transition-colors"
              >
                <Heart 
                  size={18} 
                  className={wishlist.some(w => w.id === item.id) 
                    ? "text-red-500 fill-red-500" 
                    : "text-purple-500 dark:text-purple-400"
                  } 
                />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-serif text-jewelry-dark dark:text-dark-text line-clamp-2">{item.name}</h3>
              <p className="text-lg font-serif text-purple-500 dark:text-purple-300 whitespace-nowrap ml-2">
                ₽{item.price.toLocaleString()}
              </p>
            </div>
            
            {Object.keys(item.sizes).length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 dark:text-dark-muted mb-1">Available sizes:</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(item.sizes).map(([size, quantity]) => (
                    <span 
                      key={size}
                      className={`text-xs px-2 py-1 rounded ${
                        quantity > 0 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {size} ({quantity})
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <p className="text-xs text-gray-600 dark:text-dark-muted mb-4 line-clamp-2">{item.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } })}
              disabled={Object.keys(item.sizes).length > 0 && Object.values(item.sizes).every(qty => qty === 0)}
              className="w-full px-3 py-2 bg-purple-gradient rounded-lg text-white font-medium text-xs hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={14} />
              <span>{Object.keys(item.sizes).length > 0 && Object.values(item.sizes).every(qty => qty === 0) ? 'Out of Stock' : 'Add to Cart'}</span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Catalog;