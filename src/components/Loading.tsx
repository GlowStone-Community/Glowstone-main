'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingProps {
  show: boolean;
}

export default function Loading({ show }: LoadingProps) {
  console.log('Loading component render:', show); // 调试信息
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            backgroundImage: 'url(/loading.gif)',
            backgroundSize: '64px 64px', // 设置纹理大小
            backgroundPosition: '0 0',
            backgroundRepeat: 'repeat', // 平铺重复
            backgroundColor: 'rgba(0, 0, 0, 0.3)' // 添加半透明背景
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
