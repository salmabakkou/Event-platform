import { createSlice } from '@reduxjs/toolkit';

// 1. Charger le panier depuis le localStorage au démarrage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart_data');
    if (savedCart === null) return undefined;
    return JSON.parse(savedCart);
  } catch{
    return undefined;
  }
};

const persistedState = loadCartFromStorage();

const initialState = {
  items: persistedState?.items || [],
  totalQuantity: persistedState?.totalQuantity || 0,
  totalPrice: persistedState?.totalPrice || 0,
  isCartOpen: false, // Toujours fermé au rafraîchissement
};

// Fonction utilitaire pour sauvegarder l'état actuel
const saveToStorage = (state) => {
  const dataToSave = {
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalPrice: state.totalPrice,
  };
  localStorage.setItem('cart_data', JSON.stringify(dataToSave));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      
      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
      saveToStorage(state); // <--- SAUVEGARDE
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
      saveToStorage(state); // <--- SAUVEGARDE
    },
    
    deleteFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
      }
      saveToStorage(state); // <--- SAUVEGARDE
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart_data'); // <--- NETTOYAGE
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  deleteFromCart, 
  toggleCart, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
