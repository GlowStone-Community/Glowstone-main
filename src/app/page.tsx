'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Achievement from '@/components/Achievement';
import BossBar from '@/components/BossBar';
import DebugOverlay from '@/components/DebugOverlay';
import { useToast } from '@/hooks/useToast';
import Image from 'next/image';

// Mock data for cards, etc.
const activities = [
  { icon: 'diamond', title: '新生入坑指南', desc: 'Java/基岩版差异、常用快捷键、常见误区，少走弯路从这里开始！' },
  { icon: 'torch', title: '夜间光影摄影', desc: '光影材质安装教学，拍出属于南充夜色的像素大片。' },
  { icon: 'creeper', title: '联机开荒赛季', desc: '打工是不可能打工的！只会打怪、挖矿、盖房子。' },
  { icon: 'diamond', title: '红石工程挑战', desc: '从零基础到准工程师，做一个会接线的“电工”。' },
  { icon: 'torch', title: '建筑主题活动', desc: '像素艺术/中式园林/学院风建筑，拒绝“豆腐块”。' },
  { icon: 'creeper', title: '赛事与联动', desc: '小游戏赛、PVP对抗、跨社团合作，发光发热！' },
];

export default function Home() {
  const [isNetherTheme, setIsNetherTheme] = useState(false);
  const [showBossBar, setShowBossBar] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [xp, setXp] = useState({ level: 1, progress: 0 });
  const [coords, setCoords] = useState({ x: '0.0', y: 64, z: '0.0' });
  const { toast, showToast } = useToast();

  useEffect(() => {
    document.body.classList.toggle('theme-nether', isNetherTheme);
  }, [isNetherTheme]);

  const handleThemeToggle = useCallback(() => {
    setIsNetherTheme(prev => {
      const next = !prev;
      showToast(next ? '进度达成：传送至下界！' : '进度达成：回到主世界。');
      return next;
    });
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
    const t = setTimeout(() => showToast('进度达成：发现“萤石社”'), 800);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(t);
    };
  }, [showToast]);

  return (
    <>
      <Header />
      <main id="home">
        <section className="hero-bg relative border-b-4 border-black py-[70px] pb-[90px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h1 className="font-press-start mc-hero-title text-2xl lg:text-3xl mb-2.5 text-shadow-lg">Minecraft 萤石社</h1>
            <p className="text-lg mb-4 text-[#e6ffe6]">西南石油大学南充校区 · 今天也要发光！</p>
            <div className="flex items-center gap-3">
              <a href="#about" className="mc-btn primary">了解我们</a>
              <a href="#join" className="mc-btn">加入社团</a>
              <button onClick={handleThemeToggle} className="mc-btn" aria-pressed={isNetherTheme}>拉杆</button>
            </div>
            <div className="mt-4 hud-row">
              <div aria-label="生命值" className="hud-row">{Array.from({ length: 10 }).map((_, i) => <span key={i} className="hearts-icon" aria-hidden></span>)}</div>
              <div aria-label="饥饿值" className="hud-row">{Array.from({ length: 10 }).map((_, i) => <span key={i} className="hunger-icon" aria-hidden></span>)}</div>
            </div>
          </div>
          <div className="mc-xp-display absolute left-1/2 -translate-x-1/2 -bottom-[22px] bg-[#0c3] border-2 border-black shadow-[0_4px_0_#000] text-[#021] px-2.5 py-1.5 flex items-center gap-2.5">
            <span className="mc-xp-label">Lv. <b>{xp.level}</b></span>
            <div className="mc-xp-track w-[220px] h-3 border-2 border-black bg-[#0a0] relative">
              <i className="mc-xp-fill block h-full" style={{ width: `${xp.progress}%` }}></i>
            </div>
          </div>
        </section>

        <section id="about" className="section-bg-dirt py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">了解萤石社</h2>
            <div className="sign-board-bg border-4 border-black shadow-[0_6px_0_#000] text-[#210] p-4">
              <p>这里是热爱 Minecraft 的同学们的聚集地...</p>
              <ul className="list-disc list-inside mt-2.5">
                <li>红石工程：从活塞门到自动化农场，效率V安排！</li>
                <li>建筑创造：方块也能有温度，像素也能有灵魂。</li>
                <li>联机活动：开荒、Boss战、主题赛季，苦力怕：嘶——砰！</li>
                <li>技术交流：服务器搭建、资源整合、指令数据包、摄影剪辑。</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="activities" className="section-bg-stone py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">活动一览</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map(act => (
                <article key={act.title} className="mc-card text-black p-3">
                  <div className="flex items-center gap-3">
                    <div className="item-frame w-12 h-12 flex items-center justify-center">
                      <Image src={`/assets/svg/${act.icon}.svg`} alt={act.title} width={42} height={42} className="pixelated" />
                    </div>
                    <div>
                      <h3 className="font-press-start text-sm my-0">{act.title}</h3>
                      <p className="text-sm mt-1">{act.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        <section id="server" className="section-bg-dirt py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">社团服务器</h2>
            <div className="sign-board-bg border-4 border-black shadow-[0_6px_0_#000] text-[#210] p-4">
              <p>我们的联机服务器提供生存、创意与迷你游戏区。想加入请看下方入口或扫码联系管理员。</p>
              <ul className="mt-2.5">
                <li>版本：Java & Bedrock（跨平台信息见社团公告）</li>
                <li>常驻插件：区域保护、家园、经济与小游戏</li>
                <li>如何获取：填写加入申请或现场扫码加入我们</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="gallery" className="section-bg-stone py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">作品图库</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="item-frame p-2 bg-mc-ui flex items-center justify-center">
                  <Image src={`/assets/svg/torch.svg`} alt={`作品 ${i}`} width={120} height={80} className="pixelated" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-[#e6ffe6]">点击图片可查看大图与项目说明（暂为占位，后续可链接具体项目页）。</p>
          </div>
        </section>

        <section id="join" className="section-bg-dirt py-[70px]">
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

        <section id="contact" className="section-bg-stone py-[70px]">
          <div className="container mx-auto w-[min(1100px,92%)]">
            <h2 className="font-press-start text-2xl mb-5 text-shadow">联系我们</h2>
            <div className="sign-board-bg border-4 border-black shadow-[0_6px_0_#000] p-4">
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
      <Achievement message={toast.message} show={toast.show} />
      <BossBar show={showBossBar} />
      <DebugOverlay show={showDebug} coords={coords} />
    </>
  );
}
