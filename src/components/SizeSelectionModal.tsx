import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Package } from 'lucide-react';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import type { CatalogItem } from '../hooks/useCatalogData';

interface SizeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CatalogItem;
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({ isOpen, onClose, product }) => {
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    const selectedSizeStock = product.sizes[selectedSize] || 0;
    if (selectedSizeStock < quantity) {
      alert(`Only ${selectedSizeStock} items available in size ${selectedSize}`);
      return;
    }

    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        ...product, 
        quantity,
        selectedSize
      } 
    });

    // Reset and close modal
    setSelectedSize('');
    setQuantity(1);
    onClose();
  };

  const selectedSizeStock = selectedSize ? product.sizes[selectedSize] || 0 : 0;
  const availableSizes = Object.entries(product.sizes).filter(([_, qty]) => qty > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-dark-accent">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text">
                    Select Size
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500 dark:text-dark-muted" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 border-b border-gray-100 dark:border-dark-accent">
                <div className="flex space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-dark-accent">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-jewelry-dark dark:text-dark-text text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-purple-500 dark:text-purple-400 font-medium text-xl">
                      ₽{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="p-6">
                {availableSizes.length === 0 ? (
                  <div className="text-center py-8">
                    <Package size={48} className="mx-auto mb-4 text-gray-300 dark:text-dark-accent" />
                    <p className="text-gray-500 dark:text-dark-muted">
                      This item is currently out of stock in all sizes
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-jewelry-dark dark:text-dark-text mb-4">
                      Available Sizes
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {Object.entries(product.sizes).map(([size, stock]) => (
                        <SizeButton
                          key={size}
                          size={size}
                          stock={stock}
                          isSelected={selectedSize === size}
                          onSelect={() => setSelectedSize(size)}
                        />
                      ))}
                    </div>

                    {/* Quantity Selection */}
                    {selectedSize && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-jewelry-dark dark:text-dark-text mb-3">
                          Quantity
                        </h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-200 dark:border-dark-accent rounded-lg">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-2 hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors"
                            >
                              <span className="text-lg">−</span>
                            </button>
                            <span className="px-4 py-2 text-jewelry-dark dark:text-dark-text font-medium min-w-[60px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(Math.min(selectedSizeStock, quantity + 1))}
                              disabled={quantity >= selectedSizeStock}
                              className="p-2 hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-dark-muted">
                            {selectedSizeStock} available
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={!selectedSize || selectedSizeStock === 0}
                      className="w-full py-4 bg-purple-gradient rounded-xl text-white font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={20} />
                      <span>
                        {!selectedSize 
                          ? 'Select a size' 
                          : selectedSizeStock === 0 
                            ? 'Out of stock' 
                            : `Add ${quantity} to Cart`
                        }
                      </span>
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Separate component for size button with GSAP animations
interface SizeButtonProps {
  size: string;
  stock: number;
  isSelected: boolean;
  onSelect: () => void;
}

const SizeButton: React.FC<SizeButtonProps> = ({ size, stock, isSelected, onSelect }) => {
  const sizeRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sizeElement = sizeRef.current;
    const stockElement = stockRef.current;
    const buttonElement = buttonRef.current;

    if (!sizeElement || !stockElement || !buttonElement) return;

    // Set initial states
    gsap.set(sizeElement, { y: 0 });
    gsap.set(stockElement, { y: 0, opacity: 0 });

    const handleMouseEnter = () => {
      // Animate size number up
      gsap.to(sizeElement, {
        y: -12,
        duration: 0.4,
        ease: "back.out(1.7)"
      });

      // Animate stock count down and fade in
      gsap.to(stockElement, {
        y: 20,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      // Reset size number to center
      gsap.to(sizeElement, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset stock count to center and fade out
      gsap.to(stockElement, {
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    buttonElement.addEventListener('mouseenter', handleMouseEnter);
    buttonElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      buttonElement.removeEventListener('mouseenter', handleMouseEnter);
      buttonElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onSelect}
      disabled={stock === 0}
      className={`p-4 rounded-lg border-2 text-center transition-all relative overflow-hidden h-20 ${
        isSelected
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
          : stock > 0
          ? 'border-gray-200 dark:border-dark-accent hover:border-purple-300 dark:hover:border-purple-500 text-jewelry-dark dark:text-dark-text'
          : 'border-gray-200 dark:border-dark-accent bg-gray-50 dark:bg-dark-accent text-gray-400 dark:text-dark-muted cursor-not-allowed opacity-50'
      }`}
    >
      {/* Size Number - Starts in center, moves up on hover */}
      <div 
        ref={sizeRef}
        className="text-xl font-bold absolute inset-0 flex items-center justify-center"
      >
        {size}
      </div>
      
      {/* Stock Count - Starts in center (invisible), moves down and fades in on hover */}
      <div 
        ref={stockRef}
        className="text-xs font-medium absolute inset-0 flex items-center justify-center"
      >
        {stock > 0 ? (
          <span className="text-green-600 dark:text-green-400">{stock} left</span>
        ) : (
          <span className="text-red-500 dark:text-red-400">Out of stock</span>
        )}
      </div>
    </button>
  );
};

export default SizeSelectionModal;