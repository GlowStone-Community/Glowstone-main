'use client';

export default function BossBar({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div id="bossbar" className="bossbar fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5" aria-hidden={!show}>
      <span className="name font-press-start text-white">末影龙</span>
      <div className="bossbar-track w-[320px] h-4 border-2 border-black bg-[#330033]">
        <i className="bossbar-fill block h-full bg-[#a64dff]" style={{ width: '100%' }}></i>
      </div>
    </div>
  );
}
