import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'nectar-app-secret-2026';
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

const KEYS = {
  USER: 'user_session',
  CART: 'cart_items',
  FAVOURITES: 'favourite_items',
  ORDERS: 'order_history',
};

// Helper: Encrypt data
const encrypt = (data) => {
  try {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  } catch (e) {
    console.error('Encryption error:', e);
    return data;
  }
};

// Helper: Decrypt data
const decrypt = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.error('Decryption error:', e);
    return null;
  }
};

const storageService = {
  // --- USER AUTH ---
  saveUser: async (userData) => {
    try {
      const sessionData = {
        ...userData,
        expiresAt: Date.now() + SESSION_TTL
      };
      const jsonValue = JSON.stringify(sessionData);
      const encryptedValue = encrypt(jsonValue);
      await AsyncStorage.setItem(KEYS.USER, encryptedValue);
    } catch (e) {
      console.error('Error saving user:', e);
    }
  },

  getUser: async () => {
    try {
      const encryptedValue = await AsyncStorage.getItem(KEYS.USER);
      if (!encryptedValue) return null;

      const decryptedValue = decrypt(encryptedValue);
      if (!decryptedValue) return null;

      const sessionData = JSON.parse(decryptedValue);
      
      // Check for expiry
      if (Date.now() > sessionData.expiresAt) {
        console.log('Session expired, clearing user data...');
        await storageService.removeUser();
        return null;
      }

      return sessionData;
    } catch (e) {
      console.error('Error getting user:', e);
      return null;
    }
  },

  removeUser: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
    } catch (e) {
      console.error('Error removing user:', e);
    }
  },

  // --- CART ---
  saveCart: async (cartItems) => {
    try {
      const jsonValue = JSON.stringify(cartItems);
      const encryptedValue = encrypt(jsonValue);
      await AsyncStorage.setItem(KEYS.CART, encryptedValue);
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  },

  getCart: async () => {
    try {
      const encryptedValue = await AsyncStorage.getItem(KEYS.CART);
      if (!encryptedValue) return [];
      
      const decryptedValue = decrypt(encryptedValue);
      return decryptedValue ? JSON.parse(decryptedValue) : [];
    } catch (e) {
      console.error('Error getting cart:', e);
      return [];
    }
  },

  // --- FAVOURITES ---
  saveFavourites: async (favItems) => {
    try {
      const jsonValue = JSON.stringify(favItems);
      const encryptedValue = encrypt(jsonValue);
      await AsyncStorage.setItem(KEYS.FAVOURITES, encryptedValue);
    } catch (e) {
      console.error('Error saving favourites:', e);
    }
  },

  getFavourites: async () => {
    try {
      const encryptedValue = await AsyncStorage.getItem(KEYS.FAVOURITES);
      if (!encryptedValue) return [];
      
      const decryptedValue = decrypt(encryptedValue);
      return decryptedValue ? JSON.parse(decryptedValue) : [];
    } catch (e) {
      console.error('Error getting favourites:', e);
      return [];
    }
  },

  // --- ORDERS ---
  saveOrders: async (orders) => {
    try {
      const jsonValue = JSON.stringify(orders);
      const encryptedValue = encrypt(jsonValue);
      await AsyncStorage.setItem(KEYS.ORDERS, encryptedValue);
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  },

  getOrders: async () => {
    try {
      const encryptedValue = await AsyncStorage.getItem(KEYS.ORDERS);
      if (!encryptedValue) return [];
      
      const decryptedValue = decrypt(encryptedValue);
      return decryptedValue ? JSON.parse(decryptedValue) : [];
    } catch (e) {
      console.error('Error getting orders:', e);
      return [];
    }
  },

  addOrder: async (newOrder) => {
    try {
      const orders = await storageService.getOrders();
      const updatedOrders = [newOrder, ...orders];
      await storageService.saveOrders(updatedOrders);
      return updatedOrders;
    } catch (e) {
      console.error('Error adding order:', e);
      return [];
    }
  },

  // --- GENERAL ---
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  },
};

export default storageService;
