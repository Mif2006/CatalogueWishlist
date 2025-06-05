import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { catalogData } from '../data/mockData';

const ProductPage: React.FC = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { dispatch, wishlist, toggleWishlist } = useCart();
  
  const product = catalogData.find(item => item.id === productId);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to={`/catalog/${category}`}
          className="inline-flex items-center text-gray-600 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to {category}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-square rounded-2xl overflow-hidden"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-purple-500 dark:text-purple-400 font-serif mb-6">
            ${product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 dark:text-dark-muted mb-8">
            {product.description}
          </p>

          <div className="flex gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              className="flex-1 py-3 bg-purple-gradient rounded-xl text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Add to Cart</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleWishlist(product)}
              className="p-3 rounded-xl border-2 border-purple-500 dark:border-purple-400 text-purple-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <Heart
                size={24}
                className={wishlist.some(w => w.id === product.id) ? "fill-current" : ""}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl border-2 border-purple-500 dark:border-purple-400 text-purple-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <Share2 size={24} />
            </motion.button>
          </div>

          <div className="border-t border-gray-200 dark:border-dark-accent pt-8">
            <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
              Product Details
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-dark-muted">
              <li>• Premium quality materials</li>
              <li>• Handcrafted with care</li>
              <li>• Certified authenticity</li>
              <li>• Free shipping worldwide</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;