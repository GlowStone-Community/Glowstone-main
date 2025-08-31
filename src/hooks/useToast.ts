'use client';

import { useState, useEffect, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ message: '', show: false });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = useCallback((message: string) => {
    setToast({ message, show: true });
  }, []);

  return { toast, showToast };
}
