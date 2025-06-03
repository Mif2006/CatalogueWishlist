import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Purchase, WishlistItem } from '../types';

type CartItem = (Purchase | WishlistItem) & { quantity: number };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Purchase | WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'TOGGLE_WISHLIST'; payload: WishlistItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' };

const CartContext = createContext<{
  state: CartState;
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        isOpen: state.items.length === 1 ? false : state.isOpen,
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = {
    items: [],
    isOpen: false,
  };
  const [wishlist, setWishlist] = React.useState<WishlistItem[]>(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  // Load cart from localStorage
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { items } = JSON.parse(savedCart);
      initialState.items = items;
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  const toggleWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const enhancedDispatch = (action: CartAction) => {
    switch (action.type) {
      case 'ADD_ITEM':
        dispatch(action);
        if (!state.isOpen) {
          dispatch({ type: 'TOGGLE_CART' });
        }
        break;
      case 'REMOVE_ITEM':
        dispatch(action);
        break;
      default:
        dispatch(action);
    }
  };

  return (
    <CartContext.Provider value={{ state, wishlist, toggleWishlist, dispatch: enhancedDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};