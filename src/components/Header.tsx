'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Player from './Player/player';

const navLinks = [
  { href: '#about', text: '了解萤石社' },
  { href: '#activities', text: '活动一览' },
  { href: '#server', text: '社团服务器' },
  { href: '#gallery', text: '作品图库' },
  { href: '#join', text: '加入我们' },
  { href: '#contact', text: '联系我们' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`site-header sticky top-0 z-40 shadow-[0_4px_0_#0008] ${isMenuOpen ? 'open' : ''}`}>
      <div className="container mx-auto w-[min(1100px,92%)] flex items-center justify-between p-2.5">
        <div className="brand flex items-center gap-2.5 font-press-start" aria-label="返回首页">
          <div className="item-frame flex items-center justify-center w-9 h-9">
            <Image src="/assets/svg/creeper.svg" alt="Creeper" width={28} height={28} className="pixelated" />
          </div>
          <span className="brand-text text-sm tracking-wider mc-3d px-2 py-1">萤石社</span>
        </div>

        <nav
          id="main-nav"
          className={`main-nav absolute md:static md:flex flex-col md:flex-row gap-4 main-nav absolute top-0 left-0 
            right-0 md:top-auto bg-[#2b2b2b] md:bg-transparent border-t-4 md:border-none border-black p-2.5 
            md:p-0 ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}
          role="navigation"
          aria-hidden={!isMenuOpen}
          style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        >
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="mc-btn-nav block md:inline-block" onClick={() => setIsMenuOpen(false)}>
              {link.text}
            </Link>
          ))}
        </nav>
        {/* overlay for mobile when menu is open */}
        {isMenuOpen && (
          <div 
            className="mobile-overlay fixed inset-0 z-30" 
            onClick={() => setIsMenuOpen(false)} 
            aria-hidden="true"
            style={{ pointerEvents: 'auto' }}
          />
        )}
      </div>

      {/* 唱片机播放器组件实现 */}
      {<Player />}
      
      {/* 独立的绳子按钮 */}
      <button
        id="rope-toggle"
        aria-controls="main-nav"
        className="rope-toggle md:hidden"
        aria-label="展开导航"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <motion.div 
          className="rope rounded-lg"
          initial={{ height: 150 }}
          animate={{ height: isMenuOpen ? 500 : 180 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.68, -0.55, 0.265, 1.55],
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
        />
        <motion.div 
          className="villager"
          initial={{ y: 0 }}
          animate={{ y: isMenuOpen ? 350 : 30 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.68, -0.55, 0.265, 1.55],
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
        >
          <Image src="/Menu.png" alt="Villager" width={64} height={128} className="pixelated" />
        </motion.div>
      </button>
    </header>
  );
}

// Add this to globals.css for the nav button style if it's not easily doable with tailwind
/*
.mc-btn-nav {
  padding: 8px 10px;
  border: 2px solid #000;
  box-shadow: 0 3px 0 #000;
  background: var(--mc-ui);
  color: #222;
  font-weight: 700;
  transition: transform 0.1s ease-in-out;
}
.mc-btn-nav:hover {
  transform: translateY(-2px);
  background: #e0e0e0;
}
*/
