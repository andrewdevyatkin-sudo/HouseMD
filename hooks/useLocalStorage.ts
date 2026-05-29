"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Drop-in replacement for useState that reads/writes to localStorage.
 * SSR-safe: returns initialValue during server render, then hydrates on mount.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStored(JSON.parse(item));
      }
    } catch (e) {
      console.warn(`useLocalStorage: error reading key "${key}"`, e);
    }
    setHydrated(true);
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStored((prev) => {
        const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    } catch (e) {
      console.warn(`useLocalStorage: error writing key "${key}"`, e);
    }
  }, [key]);

  return [hydrated ? stored : initialValue, setValue];
}
