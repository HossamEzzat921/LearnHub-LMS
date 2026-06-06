import React, { createContext, useContext, useState, useCallback } from 'react';

interface PurchaseContextType {
  purchasedCourses: string[];
  purchaseCourse: (courseId: string) => void;
  isPurchased: (courseId: string) => boolean;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

// Initial purchased courses (simulating existing purchases)
const INITIAL_PURCHASED = ['1', '3'];

export const PurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>(INITIAL_PURCHASED);

  const purchaseCourse = useCallback((courseId: string) => {
    setPurchasedCourses(prev => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  }, []);

  const isPurchased = useCallback((courseId: string) => {
    return purchasedCourses.includes(courseId);
  }, [purchasedCourses]);

  return (
    <PurchaseContext.Provider value={{
      purchasedCourses,
      purchaseCourse,
      isPurchased,
    }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (context === undefined) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
};
