"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Purchase, WishlistItem } from '../types';

interface CartItem extends Purchase {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  wishlist: WishlistItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Purchase }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: WishlistItem };

const initialState: CartState = {
  items: [],
  isOpen: false,
  wishlist: [],
};

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
      
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.some(item => item.id === action.payload.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter(item => item.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }
    
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      parsedCart.items.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
    
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist);
      parsedWishlist.forEach((item: WishlistItem) => {
        dispatch({ type: 'TOGGLE_WISHLIST', payload: item });
      });
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.items, state.wishlist]);
  
  const toggleWishlist = (item: WishlistItem) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: item });
  };
  
  return (
    <CartContext.Provider value={{ state, dispatch, wishlist: state.wishlist, toggleWishlist }}>
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