'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './index.css';

interface MinecraftHUDProps {
  health?: number; // 0-20 (10 hearts)
  hunger?: number; // 0-20 (10 hunger bars)
  level?: number;
  progress?: number; // 0-100
}

export default function MinecraftHUD({ 
  health = 20, 
  hunger: initialHunger = 20, 
  progress = 0 
}: MinecraftHUDProps) {
  const [hunger, setHunger] = useState(initialHunger);
  const [isVisible, setIsVisible] = useState(true);

  // 计算每个心形应该显示的状态
  const getHeartState = (index: number) => {
    const heartValue = health - (index * 2);
    if (heartValue >= 2) return 2; // 满心
    if (heartValue >= 1) return 1; // 半心
    return 0; // 空心
  };

  // 计算每个饥饿值应该显示的状态
  const getHungerState = (index: number) => {
    const hungerValue = hunger - (index * 2);
    if (hungerValue >= 2) return 2; // 满饥饿
    if (hungerValue >= 1) return 1; // 半饥饿
    return 0; // 空饥饿
  };

  // 计算饥饿值跳动强度 (饥饿值越少跳动越厉害)
  const getHungerShakeIntensity = () => {
    if (hunger >= 18) return 0; // 满饥饿时不跳动
    if (hunger >= 14) return 1; // 轻微跳动
    if (hunger >= 10) return 2; // 中等跳动
    if (hunger >= 6) return 3; // 较强跳动
    return 4; // 强烈跳动
  };

  // 计算饥饿值跳动频率 (饥饿值越低频率越高)
  const getHungerShakeFrequency = () => {
    if (hunger >= 18) return 0; // 满饥饿时不跳动
    if (hunger >= 14) return 0.8; // 较慢频率
    if (hunger >= 10) return 0.6; // 中等频率
    if (hunger >= 6) return 0.4; // 较快频率
    return 0.2; // 最快频率
  };

  // 生成随机延迟，让每个格子跳动时间不同
  const getRandomDelay = (index: number) => {
    return index * 0.1 + Math.random() * 0.5;
  };

  // 饥饿值自动减少
  useEffect(() => {
    const hungerTimer = setInterval(() => {
      setHunger(prevHunger => {
        if (prevHunger > 0) {
          return prevHunger - 1;
        }
        return 0;
      });
    }, 60000); // 每分钟减少一格

    return () => clearInterval(hungerTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollBottom = scrollTop + windowHeight;
      
      // 当滚动到距离底部100px以内时隐藏HUD
      const isNearBottom = scrollBottom >= documentHeight - 100;
      setIsVisible(!isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="minecraft-hud"
        >
          {/* 生命值和饥饿值水平排列 */}
          <div className="minecraft-hud-row">
            {/* 生命值 */}
            <div className="minecraft-hud-hearts">
              {Array.from({ length: 10 }).map((_, i) => {
                const heartState = getHeartState(i);
                const heartImage = heartState === 2 ? '/full_heart_128x128.png' : 
                                  heartState === 1 ? '/half_heart_128x128.png' : 
                                  '/empty_heart_128x128.png';
                
                return (
                  <Image 
                    key={i} 
                    src={heartImage}
                    alt={`Heart ${i + 1}`}
                    width={22}
                    height={22}
                    className="pixelated"
                    style={{
                      minWidth: '16px',
                      minHeight: '16px',
                      width: 'min(22px, 4vw)',
                      height: 'min(22px, 4vw)'
                    }}
                  />
                );
              })}
            </div>
            
            {/* 饥饿值 - 每个格子单独跳动 */}
            <div className="minecraft-hud-hunger">
              {Array.from({ length: 10 }).map((_, i) => {
                const hungerState = getHungerState(i);
                const hungerImage = hungerState === 2 ? '/full_hungry_128x128.png' : 
                                   hungerState === 1 ? '/half_hungry_128x128.png' : 
                                   '/empty_hungry_128x128.png';
                const shakeIntensity = getHungerShakeIntensity();
                const shakeFrequency = getHungerShakeFrequency();
                
                return (
                  <motion.div
                    key={i}
                    animate={shakeIntensity > 0 ? {
                      y: [-shakeIntensity, shakeIntensity, -shakeIntensity]
                    } : {}}
                    transition={{
                      duration: 0.1, // 固定抖动持续时间为0.1秒
                      repeat: Infinity,
                      repeatDelay: shakeFrequency * 2 + Math.random() * shakeFrequency, // 频率越高间隔越短
                      delay: getRandomDelay(i),
                      ease: "easeInOut"
                    }}
                  >
                    <Image 
                      src={hungerImage}
                      alt={`Hunger ${i + 1}`}
                      width={22}
                      height={22}
                      className="pixelated"
                      style={{
                        minWidth: '16px',
                        minHeight: '16px',
                        width: 'min(22px, 4vw)',
                        height: 'min(22px, 4vw)'
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* 经验值 */}
          <div className="minecraft-hud-xp">
            <div className="minecraft-hud-xp-container">
                             {/* 左端 */}
               <Image 
                 src={progress > 0 ? '/jingyan/jingyan_full_left_128x58.png' : '/jingyan/jingyan_left_128x58.png'}
                 alt="XP Left"
                 width={29}
                 height={13}
                 className="pixelated"
                 style={{
                   minWidth: '19px',
                   minHeight: '10px',
                   width: 'min(29px, 5.2vw)',
                   height: 'min(13px, 2.4vw)'
                 }}
               />
               
               {/* 中间部分 - 固定18个槽位 */}
               {Array.from({ length: 18 }).map((_, i) => {
                 const segmentProgress = Math.max(0, Math.min(100, progress - (i * 5.56)));
                 const isFull = segmentProgress >= 5.56;
                 
                 return (
                   <Image 
                     key={i}
                     src={isFull ? '/jingyan/jingyan_full_middle_128x58.png' : '/jingyan/jingyan_middle_128x58.png'}
                     alt="XP Middle"
                     width={29}
                     height={13}
                     className="pixelated"
                     style={{
                       minWidth: '19px',
                       minHeight: '10px',
                       width: 'min(29px, 5.2vw)',
                       height: 'min(13px, 2.4vw)'
                     }}
                   />
                 );
               })}
               
               {/* 右端 */}
               <Image 
                 src={progress >= 100 ? '/jingyan/jingyan_full_right_128x58.png' : '/jingyan/jingyan_right_128x58.png'}
                 alt="XP Right"
                 width={29}
                 height={13}
                 className="pixelated"
                 style={{
                   minWidth: '19px',
                   minHeight: '10px',
                   width: 'min(29px, 5.2vw)',
                   height: 'min(13px, 2.4vw)'
                 }}
               />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
