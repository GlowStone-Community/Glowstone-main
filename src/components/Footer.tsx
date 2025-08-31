export default function Footer() {
  return (
    <footer className="site-footer mc-grid-bg text-center border-t-6 border-black py-8">
      <div className="container mx-auto w-[min(1100px,92%)]">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="item-frame w-8 h-8 flex items-center justify-center">
            <img src="/assets/svg/torch.svg" alt="torch" width="20" height="20" className="pixelated" />
          </div>
          <div className="item-frame w-8 h-8 flex items-center justify-center">
            <img src="/assets/svg/diamond.svg" alt="diamond" width="20" height="20" className="pixelated" />
          </div>
          <div className="item-frame w-8 h-8 flex items-center justify-center">
            <img src="/assets/svg/creeper.svg" alt="creeper" width="20" height="20" className="pixelated" />
          </div>
        </div>
        <p className="mc-3d py-2">Made with 红石 & ❤ · Minecraft 萤石社 · 西南石油大学南充校区</p>
        <p className="tips opacity-80 mt-2">小贴士：按 B 召唤 Boss 条，按 F 切换 F3（浏览器特供），按 G 切换日夜主题。</p>
      </div>
    </footer>
  );
}
