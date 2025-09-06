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
  { icon: 'iron_pickaxe.png', title: '建筑主题活动', desc: '像素艺术/中式园林/学院风建筑，拒绝"豆腐块"。' },
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
];

export default function Home() {
  const [isNetherTheme, setIsNetherTheme] = useState(false);
  const [showBossBar, setShowBossBar] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [xp, setXp] = useState({ level: 1, progress: 0 });
  const [coords, setCoords] = useState({ x: '0.0', y: 64, z: '0.0' });
  const { toast, showToast } = useToast();

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

  return (
    <>
      <Header />
      <main id="home">

        <section className="hero-bg relative border-black py-[70px] pb-[90px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h1 className="font-press-start mc-hero-title text-2xl lg:text-3xl 
            text-shadow-lg">Minecraft 萤石社</h1>
            <p className="text-lg text-[#e6ffe6]">西南石油大学南充校区 · 今天也要发光！</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => showToast('进度达成：测试消息1')} className="mc-btn primary">测试进度1</button>
              <button onClick={() => showToast('进度达成：测试消息2')} className="mc-btn">测试进度2</button>
              <button onClick={handleThemeToggle} className="mc-btn" aria-pressed={isNetherTheme}>切换主题</button>
            </div>
          </div>
        </section>

        <section id="about" className={`${isNetherTheme ? 'section-bg-netherrack' : 'section-bg-dirt'} py-[80px] select-none`}>
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl text-shadow">了解萤石社</h2>
            <div className="flex justify-center">
              <SignBoard title="萤石社公告">
                <p>这里是热爱 Minecraft 的同学们的聚集地...</p>
                <ul>
                  <li>红石工程：从活塞门到自动化农场，效率V安排！</li>
                  <li>建筑创造：方块也能有温度，像素也能有灵魂。</li>
                  <li>联机活动：开荒、Boss战、主题赛季，苦力怕：嘶——砰！</li>
                  <li>技术交流：服务器搭建、资源整合、指令数据包、摄影剪辑。</li>
                </ul>
              </SignBoard>
            </div>
          </div>
        </section>

        <section id="activities" className="section-bg-stone py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">活动一览</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map(act => (
                <article key={act.title} className="mc-card text-black p-2 h-16">
                  <div className="flex items-center gap-2 h-full">
                    <div className="item-frame w-40 h-20 flex items-center justify-center flex-shrink-0">
                      <Image src={`/items/${act.icon}`} alt={act.title} width={80} height={80} className="pixelated" quality={100} />
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
        
        <section id="server" className={`${isNetherTheme ? 'section-bg-netherrack' : 'section-bg-dirt'} py-[60px]`}>
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">社团服务器</h2>

            <div className="oak-planks-card border-4 border-black shadow-[0_6px_0_#000] text-[#2d1810] p-6 rounded-sm">
              <p className='font-semibold mb-3'>我们的联机服务器提供生存、创意与迷你游戏区。想加入请看下方入口或扫码联系管理员。</p>
              <ul className="mt-2.5 space-y-1">
                <li className="flex items-start"><span className="text-[#8b4513] mr-2">▪</span>版本：Java & Bedrock（跨平台信息见社团公告）</li>
                <li className="flex items-start"><span className="text-[#8b4513] mr-2">▪</span>常驻插件：区域保护、家园、经济与小游戏</li>
                <li className="flex items-start"><span className="text-[#8b4513] mr-2">▪</span>如何获取：填写加入申请或现场扫码加入我们</li>
              </ul>
            </div>
          </div>
          
        </section>

        <section id="gallery" className="section-bg-stone py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">作品图库</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryWorks.slice(0, 8).map((work, index) => (
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
            <p className="mt-3 text-sm text-[#e6ffe6]">点击图片可查看大图与项目说明。</p>
          </div>
        </section>

        <section id="join" className={`${isNetherTheme ? 'section-bg-netherrack' : 'section-bg-dirt'} py-[70px]`}>
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">加入我们</h2>
            <div className="mc-card">
              <p>欢迎所有热爱 Minecraft 的同学加入。我们定期组织线下活动与线上合作。</p>
              <ol className="list-decimal list-inside mt-2">
                <li>填写线上申请表（或扫码直接加入社群）</li>
                <li>参加新人见面会，了解社团规则与服务器守则</li>
                <li>领取新人礼包与入社认证</li>
              </ol>
              <div className="mt-3 flex gap-3">
                <a href="#join" className="mc-btn primary">填写申请</a>
                <a href="#contact" className="mc-btn">联系管理员</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-bg-stone py-[20px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">联系我们</h2>
            <div className="mc-contact-panel">
              <p>有问题或想合作？欢迎通过以下方式联系：</p>
              <ul className="mt-2">
                <li>QQ群/Discord：见社团公告</li>
                <li>管理员邮箱：example@swpumc.cn （示例，需要替换）</li>
                <li>线下咨询：西南石油大学南充校区学生事务中心</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Other sections would be componentized similarly */}
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
