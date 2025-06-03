import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import type { WishlistItem } from '../types';

interface CatalogProps {
  items: WishlistItem[];
}

const Catalog: React.FC<CatalogProps> = ({ items }) => {
  const { dispatch, wishlist, toggleWishlist } = useCart();
  
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
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
              <p className="text-lg font-serif text-purple-500 dark:text-purple-300">
                ${item.price.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-dark-muted mb-4 line-clamp-2">{item.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
              className="w-full px-3 py-2 bg-purple-gradient rounded-lg text-white font-medium text-xs hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={14} />
              <span>Add to Cart</span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Catalog;