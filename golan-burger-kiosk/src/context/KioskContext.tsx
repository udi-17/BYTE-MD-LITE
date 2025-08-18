import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, MenuItem, Language } from '../types';

interface KioskState {
  language: Language;
  cart: CartItem[];
  currentStep: 'welcome' | 'menu' | 'customize' | 'cart' | 'checkout' | 'payment' | 'complete';
  selectedItem: MenuItem | null;
  orderNumber: string | null;
}

type KioskAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_STEP'; payload: KioskState['currentStep'] }
  | { type: 'SELECT_ITEM'; payload: MenuItem }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; item: CartItem } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ORDER_NUMBER'; payload: string }
  | { type: 'RESET_ORDER' };

const initialState: KioskState = {
  language: 'he',
  cart: [],
  currentStep: 'welcome',
  selectedItem: null,
  orderNumber: null,
};

function kioskReducer(state: KioskState, action: KioskAction): KioskState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SELECT_ITEM':
      return { ...state, selectedItem: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.payload.id ? action.payload.item : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_ORDER_NUMBER':
      return { ...state, orderNumber: action.payload };
    case 'RESET_ORDER':
      return { ...initialState, language: state.language };
    default:
      return state;
  }
}

interface KioskContextType {
  state: KioskState;
  dispatch: React.Dispatch<KioskAction>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, item: CartItem) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export function KioskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(kioskReducer, initialState);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateCartItem = (id: string, item: CartItem) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, item } });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <KioskContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateCartItem,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </KioskContext.Provider>
  );
}

export function useKiosk() {
  const context = useContext(KioskContext);
  if (context === undefined) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
}