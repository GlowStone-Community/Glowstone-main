'use client';

import { useState, useEffect, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ message: '', show: false });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ message: '', show: false });
      }, 3400); // 调整为3.4秒，与CSS动画时间一致
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = useCallback((message: string) => {
    // 先重置状态，确保动画能重新触发
    setToast({ message: '', show: false });
    // 使用setTimeout确保状态重置后再显示新的toast
    setTimeout(() => {
      setToast({ message, show: true });
    }, 50);
  }, []);

  return { toast, showToast };
}
