"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const GarageContext = createContext(null);

export function GarageProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openGarage = useCallback(() => setIsOpen(true), []);
  const closeGarage = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product, size = "M") => {
    setItems((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, qty } : item))
    );
  }, []);

  const clearGarage = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openGarage,
      closeGarage,
      addItem,
      removeItem,
      updateQty,
      clearGarage,
    }),
    [items, count, subtotal, isOpen, openGarage, closeGarage, addItem, removeItem, updateQty, clearGarage]
  );

  return (
    <GarageContext.Provider value={value}>{children}</GarageContext.Provider>
  );
}

export function useGarage() {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error("useGarage must be used inside <GarageProvider>");
  return ctx;
}