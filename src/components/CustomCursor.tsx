'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number; // x轴速度
    vy: number; // y轴速度
    scale: number;
    rotation: number;
}

export const CustomCursor = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdCounter = useRef(0);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newParticles: Particle[] = [];
            // 每次点击生成8-12个粒子
            const count = 8 + Math.floor(Math.random() * 5);
            
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = 3 + Math.random() * 5; // 随机速度
                
                newParticles.push({
                    id: particleIdCounter.current++,
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
                    vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
                    scale: 0.5 + Math.random() * 0.8, // 随机大小
                    rotation: Math.random() * 360
                });
            }
            
            setParticles(prev => [...prev, ...newParticles]);
        };

        window.addEventListener('mousedown', handleClick); // 改为mousedown以获得更快的响应
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none', 
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ 
                            x: particle.x, 
                            y: particle.y, 
                            scale: 0,
                            rotate: particle.rotation,
                            opacity: 1
                        }}
                        animate={{ 
                            x: particle.x + particle.vx * 30, // 向四周扩散
                            y: particle.y + particle.vy * 30,
                            scale: particle.scale,
                            opacity: 0,
                            rotate: particle.rotation + (Math.random() > 0.5 ? 90 : -90)
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            ease: "easeOut" 
                        }}
                        onAnimationComplete={() => {
                            setParticles(prev => prev.filter(p => p.id !== particle.id));
                        }}
                        style={{
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            transform: 'translate(-50%, -50%)' // 居中
                        }}
                    >
                        <Image
                            src="/particle/heart_128x128.png"
                            alt="heart particle"
                            width={20}
                            height={20}
                            style={{
                                width: '100%',
                                height: '100%',
                                imageRendering: 'pixelated'
                            }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
