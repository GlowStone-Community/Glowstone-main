'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const [isClient, setIsClient] = useState(false);

    // add effect of spring to the cursor
    const springX = useSpring(cursorX, {
        stiffness: 300, // 增加刚度，让跟随更紧
        damping: 20     // 增加阻尼，减少震荡
    });
    const springY = useSpring(cursorY, {
        stiffness: 300, // 增加刚度，让跟随更紧
        damping: 20     // 增加阻尼，减少震荡
    });



    // use useEffect to update the cursor position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    // 检测客户端环境
    useEffect(() => {
        setIsClient(true);
    }, []);



    return(
        <motion.div
            className="custom-cursor"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                translateX: springX,
                translateY: springY
            }}
        >
            
            {/* 额外的随机粒子 */}
            {isClient && Array.from({ length: 8 }).map((_, i) => {
                const randomScale = 0.3 + Math.random() * 1.0; // 0.3-1.3 更大的大小差异
                const randomDelay = Math.random() * 4; // 0-4秒随机延迟
                return (
                    <motion.div
                        key={`extra-${i}`}
                        style={{
                            position: 'absolute',
                            left: 0, // 从中心开始
                            top: 0,
                            width: '16px',
                            height: '16px',
                            transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ 
                            opacity: 1, 
                            scale: randomScale,
                            x: 0,
                            y: 0
                        }}
                        animate={{ 
                            opacity: 1,
                            scale: randomScale,
                            x: (Math.random() - 0.5) * 120, // 扩大随机范围到-60px到60px
                            y: -20 // 向上移动更多距离
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: randomDelay,
                            ease: "linear"
                        }}
                    >
                        <Image
                            src="/particle/heart_128x128.png"
                            alt="heart particle"
                            width={16}
                            height={16}
                            style={{
                            width: '100%',
                            height: '100%',
                            imageRendering: 'pixelated'
                        }}
                        />
                    </motion.div>
                );
            })}
        </motion.div>
    )
}