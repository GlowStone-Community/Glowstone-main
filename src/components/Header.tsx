'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Player from './Player/player';

const navLinks = [
  { href: '#about', text: '了解萤石社' },
  { href: '#activities', text: '活动一览' },
  { href: '#server', text: '社团服务器' },
  { href: '#gallery', text: '作品图库' },
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

  // 当菜单打开时禁止背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className="mc-header-bg sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group no-underline" aria-label="返回首页">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
            <Image 
              src="/assets/svg/creeper.svg" 
              alt="Creeper" 
              width={40} 
              height={40} 
              className="pixelated drop-shadow-md" 
            />
          </div>
          <span className="font-press-start text-white text-shadow-sm text-sm md:text-base tracking-wider" style={{ textShadow: '2px 2px 0 #000' }}>
            Minecraft萤石社
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="mc-btn-nav text-xs lg:text-sm whitespace-nowrap no-underline"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`burger-btn md:hidden ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Fullscreen Menu (Dirt Background) */}
      {isMenuOpen && (
        <div className="mc-mobile-menu">
          <div className="mc-mobile-menu-content">
            <h2 className="mc-mobile-menu-title">游戏菜单</h2>
            
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="mc-btn w-full text-center py-3 text-sm no-underline block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              
              <div className="h-4"></div>
              
              <button 
                className="mc-btn w-full text-center py-3 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                返回游戏
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 唱片机播放器组件实现 */}
      <Player />
    </header>
  );
}
