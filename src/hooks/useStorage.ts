import { useState, useEffect, useCallback } from 'react';
import storageService from '../services/storageService';

type StorageKey = 'user' | 'cart' | 'favourites' | 'orders';

export function useStorage<T>(key: StorageKey, initialValue: T) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      let result;
      switch (key) {
        case 'user':
          result = await storageService.getUser();
          break;
        case 'cart':
          result = await storageService.getCart();
          break;
        case 'favourites':
          result = await storageService.getFavourites();
          break;
        case 'orders':
          result = await storageService.getOrders();
          break;
        default:
          result = initialValue;
      }
      setData(result !== null ? result : initialValue);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading storage'));
    } finally {
      // Small delay to demonstrate skeleton effect
      setTimeout(() => setLoading(false), 1000);
    }
  }, [key, initialValue]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = async () => {
    await loadData();
  };

  return { data, loading, error, setData, refresh };
}
