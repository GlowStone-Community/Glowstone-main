'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <header className={`site-header sticky top-0 z-40 shadow-[0_4px_0_#0008] ${isMenuOpen ? 'open' : ''}`}>
      <div className="container mx-auto w-[min(1100px,92%)] flex items-center justify-between p-2.5">
        <Link href="#home" className="brand flex items-center gap-2.5 font-press-start" aria-label="返回首页">
          <Image src="/assets/svg/creeper.svg" alt="Creeper" width={28} height={28} className="pixelated" />
          <span className="brand-text text-sm tracking-wider">萤石社</span>
        </Link>
        
        <button 
          id="burger" 
          className="burger md:hidden flex flex-col gap-1 bg-transparent border-none" 
          aria-label="展开导航" 
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="w-[26px] h-[3px] bg-white shadow-[0_2px_#000]"></span>
          <span className="w-[26px] h-[3px] bg-white shadow-[0_2px_#000]"></span>
          <span className="w-[26px] h-[3px] bg-white shadow-[0_2px_#000]"></span>
        </button>

        <nav 
          id="main-nav" 
          className={`main-nav ${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 absolute md:static top-[60px] left-0 right-0 bg-[#2b2b2b] md:bg-transparent border-t-4 md:border-none border-black p-2.5 md:p-0`}
          role="navigation"
        >
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="mc-btn-nav block md:inline-block" onClick={() => setIsMenuOpen(false)}>
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
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
