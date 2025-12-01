'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Achievement from '@/components/Achievement';
import BossBar from '@/components/BossBar';
import DebugOverlay from '@/components/DebugOverlay';
import Loading from '@/components/Loading';
import { useToast } from '@/hooks/useToast';
import Image from 'next/image';
import MinecraftHUD from '@/components/MinecraftHUD';
import SignBoard from '@/components/SignBoard';

// Mock data for cards, etc.
const activities = [
  { icon: 'skull_steve.png', title: '新生入坑指南', desc: 'Java/基岩版差异、常用快捷键、常见误区，少走弯路从这里开始！' },
  { icon: 'apple_golden.png', title: '夜间光影摄影', desc: '光影材质安装教学，拍出属于南充夜色的像素大片。' },
  { icon: 'diamond.png', title: '联机开荒赛季', desc: '打工是不可能打工的！只会打怪、挖矿、盖房子。' },
  { icon: 'redstone_dust.png', title: '红石工程挑战', desc: '从零基础到准工程师，做一个会接线的"电工"。' },
  { icon: 'iron_pickaxe.png', title: '建筑主题活动', desc: '像素艺术/中式园林/学院风建筑，拒绝"豆腐块"，“火柴盒”。' },
  { icon: 'diamond_sword.png', title: '赛事与联动', desc: '小游戏赛、PVP对抗、跨社团合作，发光发热！' },
];

// 作品图库数据
const galleryWorks = [
  { src: '/works/1.png', alt: '作品 1' },
  { src: '/works/2.png', alt: '作品 2' },
  { src: '/works/3.png', alt: '作品 3' },
  { src: '/works/4.png', alt: '作品 4' },
  { src: '/works/5.png', alt: '作品 5' },
  { src: '/works/6.png', alt: '作品 6' },
  { src: '/works/7.png', alt: '作品 7' },
  { src: '/works/8.png', alt: '作品 8' },
  { src: '/works/9.png', alt: '作品 9' },
  { src: '/works/10.png', alt: '作品 10' },
  { src: '/works/11.png', alt: '作品 11' },
  { src: '/works/12.png', alt: '作品 12' },
  { src: '/works/13.png', alt: '作品 13' },
  { src: '/works/14.png', alt: '作品 14' },
  { src: '/works/15.png', alt: '作品 15' },
  { src: '/works/16.png', alt: '作品 16' },
];

const GALLERY_ITEMS_PER_PAGE = 6;

export default function Home() {
  const [isNetherTheme, setIsNetherTheme] = useState(false);
  const [showBossBar, setShowBossBar] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [xp, setXp] = useState({ level: 1, progress: 0 });
  const [coords, setCoords] = useState({ x: '0.0', y: 64, z: '0.0' });
  const { toast, showToast } = useToast();
  
  // Pagination state
  const [galleryPage, setGalleryPage] = useState(1);

  useEffect(() => {
    document.body.classList.toggle('theme-nether', isNetherTheme);
  }, [isNetherTheme]);

  const handleThemeToggle = useCallback(() => {
    setShowLoading(true);
    
    // 0.3秒后切换主题
    setTimeout(() => {
      setIsNetherTheme(prev => {
        const next = !prev;
        showToast(next ? '进度达成：传送至下界！' : '进度达成：回到主世界。');
        return next;
      });
    }, 300);
    
    // 0.3秒后隐藏loading
    setTimeout(() => {
      setShowLoading(false);
    }, 300);
  }, [showToast]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (key === 'b') setShowBossBar(prev => !prev);
    if (key === 'f') setShowDebug(prev => !prev);
    if (key === 'g') handleThemeToggle();
  }, [handleThemeToggle]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? scrollTop / docH : 0;

      setXp({
        level: Math.max(1, Math.floor(pct * 30)),
        progress: Math.max(0, Math.min(100, pct * 100)),
      });

      const x = (Math.sin(scrollTop / 300) * 100).toFixed(1);
      const z = (Math.cos(scrollTop / 300) * 100).toFixed(1);
      const y = 64 + Math.round((1 - pct) * 20);
      setCoords({ x, y, z });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    const t = setTimeout(() => showToast('进度达成：发现"萤石社"'), 800);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(t);
    };
  }, [showToast]);

  // Calculate pagination
  const totalPages = Math.ceil(galleryWorks.length / GALLERY_ITEMS_PER_PAGE);
  const currentGalleryItems = galleryWorks.slice(
    (galleryPage - 1) * GALLERY_ITEMS_PER_PAGE,
    galleryPage * GALLERY_ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setGalleryPage(page);
  };

  return (
    <>
      <Header />
      <main id="home">

        <section className="hero-bg relative border-black py-[70px] pb-[90px]">
          <div className="container mx-auto w-[min(1100px,92%)] flex flex-col items-center text-center">
            <h1 className="font-press-start mc-hero-title text-[3.4rem] sm:text-[4rem] md:text-[4rem] lg:text-[4rem] 
            text-shadow-lg mb-8 leading-none tracking-tighter">Minecraft 萤石社</h1>
            <strong className="text-lg text-[#e6ffe6] font-bold drop-shadow-md">欢迎每一位热爱 Minecraft 的同学加入！</strong>
          </div>
        </section>

        <div className={isNetherTheme ? 'section-bg-netherrack' : 'section-bg-stone'}>
          <section id="about" className="py-[80px] select-none">
            <div className="container mx-auto w-[min(1100px,92%)]">
              <h2 className="font-press-start text-2xl text-shadow">了解萤石社</h2>
              <div className="flex justify-center">
                <SignBoard title="萤石社公告">
                  <p>这里是热爱 Minecraft 的同学们的聚集地...</p>
                  <ul>
                    <li>红石工程：从活塞门到自动化农场，效率V安排！</li>
                    <li>建筑创造：方块也能有温度，像素也能有灵魂。</li>
                    <li>联机活动：新服开荒、模组服、社团活动，苦力怕：嘶——砰！</li>
                    <li>技术交流：服务器搭建、资源整合、指令数据包、摄影剪辑。</li>
                  </ul>
                </SignBoard>
              </div>
            </div>
          </section>

          <section id="activities" className="py-[70px]">
            <div className="container mx-auto w-[min(1100px,92%)]">
              <h2 className="font-press-start text-2xl mb-5 text-shadow">活动一览</h2>
              <div className="grid grid-cols-2 gap-4">
                {activities.map(act => (
                  <article key={act.title} className="mc-card text-black p-2 h-24">
                    <div className="flex items-center gap-3 h-full">
                      <div className="w-14 flex items-center justify-center flex-shrink-0">
                        <Image src={`/items/${act.icon}`} alt={act.title} width={48} height={48} className="pixelated" quality={100} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-press-start text-xs my-0 leading-tight truncate">{act.title}</h3>
                        <p className="text-xs mt-0.5 leading-tight line-clamp-2">{act.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          
          <section id="server" className="py-[60px]">
            <div className="container mx-auto w-[min(1100px,92%)]">
              <h2 className="font-press-start text-2xl mb-5 text-shadow">社团服务器</h2>

              <div className="oak-planks-card border-4 border-black shadow-[0_6px_0_#000] text-[#2d1810] p-6 rounded-sm">
                <p className='font-semibold mb-3'>我们的联机服务器提供生存、模组和建造</p>
                <ul className="mt-2.5 space-y-1">
                  <li className="flex items-start"><span className="text-[#8b4513] mr-2">▪</span>版本：Java & Bedrock</li>
                  <li className="flex items-start"><span className="text-[#8b4513] mr-2">▪</span>常驻插件：区域保护、家园、经济与小游戏</li>
                  <li className="flex items-start"><span className="text-[#8b4513] mr-2">▪</span>如何获取：加入社团Q群获取详情。</li>
                </ul>
              </div>
            </div>
            
          </section>

          <section id="gallery" className="py-[70px]">
            <div className="container mx-auto w-[min(1100px,92%)]">
              <h2 className="font-press-start text-2xl mb-5 text-shadow">作品图库</h2>
              <div className="grid grid-cols-2 gap-4">
                {currentGalleryItems.map((work, index) => (
                  <div key={index} className="item-frame p-2 bg-mc-ui flex items-center justify-center overflow-hidden">
                    <Image 
                      src={work.src} 
                      alt={work.alt} 
                      width={400} 
                      height={300} 
                      className="object-contain w-full h-auto max-w-full max-h-full" 
                      quality={95}
                    />
                  </div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`mc-btn text-xs py-2 px-4 ${galleryPage === page ? 'bg-[#a0a0a0] brightness-90' : ''}`}
                      style={galleryPage === page ? { background: '#8b8b8b', color: '#ffff55', textShadow: '1px 1px #000' } : {}}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section id="contact" className="py-[20px]">
            <div className="container mx-auto w-[min(1100px,92%)]">
              <h2 className="font-press-start text-2xl mb-5 text-shadow">联系我们</h2>
              <div className="mc-contact-panel">
                <strong className="text-lg text-[#e6ffe6] font-bold drop-shadow-md">有问题或想合作？欢迎通过以下方式联系：</strong>
                <div className="mt-2 flex flex-col gap-1">
                  <strong className="text-lg text-[#e6ffe6] font-bold drop-shadow-md">社区QQ群：512955930</strong>
                  <strong className="text-lg text-[#e6ffe6] font-bold drop-shadow-md">管理员邮箱：3206288040@qq.com</strong>
                  <strong className="text-lg text-[#e6ffe6] font-bold drop-shadow-md">线下咨询：西南石油大学南充校区Minecraft萤石社</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {/* Minecraft HUD - 固定在屏幕底部中间 */}
      <MinecraftHUD 
        health={20} 
        hunger={20} 
        level={xp.level} 
        progress={xp.progress} 
      />
      <Achievement message={toast.message} show={toast.show} />
      <BossBar show={showBossBar} />
      <DebugOverlay show={showDebug} coords={coords} />
      <Loading show={showLoading} />
    </>
  );
}