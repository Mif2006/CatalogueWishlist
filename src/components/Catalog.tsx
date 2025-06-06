import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CatalogItem } from '../hooks/useCatalogData';

interface CatalogProps {
  items: CatalogItem[];
  onItemClick: (item: CatalogItem) => void;
}

const Catalog: React.FC<CatalogProps> = ({ items, onItemClick }) => {
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
          className="bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-dark-elegant border border-gray-100 dark:border-dark-accent overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-purple-200 dark:hover:border-purple-0"
          onClick={() => onItemClick(item)}
        >
          <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onItemClick(item)}>
            {item.isNew && (
              <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-purple-gradient rounded-full">
                <span className="text-xs text-white font-medium">New</span>
              </div>
            )}
            {item.collection && (
              <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-white/95 dark:bg-dark-card/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 dark:border-dark-accent">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/95 dark:bg-dark-card/90 backdrop-blur-sm rounded-full text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors shadow-lg border border-gray-200/50 dark:border-dark-accent">
                <Share2 size={18} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
                className="p-2 bg-white/95 dark:bg-dark-card/90 backdrop-blur-sm rounded-full transition-colors shadow-lg border border-gray-200/50 dark:border-dark-accent"
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
          <div className="p-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-dark-card dark:to-dark-card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-serif text-gray-900 dark:text-dark-text line-clamp-2 font-medium">{item.name}</h3>
              <p className="text-lg font-serif text-purple-600 dark:text-purple-300 whitespace-nowrap ml-2 font-semibold">
                ₽{item.price.toLocaleString()}
              </p>
            </div>
            
            <p className="text-xs text-gray-700 dark:text-dark-muted mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onItemClick(item)}
                className="flex-1 px-3 py-2 bg-white dark:bg-dark-accent border-2 border-purple-500 dark:border-purple-400 rounded-lg text-purple-600 dark:text-purple-400 font-medium text-xs hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
              >
                <span>Learn More</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } });
                }}
                disabled={Object.keys(item.sizes).length > 0 && Object.values(item.sizes).every(qty => qty === 0)}
                className="flex-1 px-3 py-2 bg-purple-gradient rounded-lg text-white font-medium text-xs hover:opacity-90 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <ShoppingCart size={14} />
                <span>{Object.keys(item.sizes).length > 0 && Object.values(item.sizes).every(qty => qty === 0) ? 'Out of Stock' : 'Add to Cart'}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Catalog;