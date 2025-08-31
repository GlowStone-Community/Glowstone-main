'use client';

import Image from 'next/image';

interface SignBoardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SignBoard({ 
  title, 
  children, 
  className = "" 
}: SignBoardProps) {
  return (
    <div className={`sign-board-container ${className}`}>
      {/* 告示牌主体 - 使用木板纹理平铺 */}
      <div className="sign-board-main">
        {/* 内容覆盖层 */}
        <div className="sign-board-content">
          {title && (
            <h3 className="font-press-start text-sm text-black text-center mb-1 text-shadow-sm font-bold tracking-wide">
              {title}
            </h3>
          )}
          <div className="text-sm text-black leading-relaxed break-words font-minecraft tracking-wide">
            {children}
          </div>
        </div>
      </div>
      
      {/* 告示牌支架 - 使用原木纹理平铺 */}
      <div className="sign-board-post">
        <div className="sign-board-post-top"></div>
        <div className="sign-board-post-middle"></div>
        <div className="sign-board-post-bottom"></div>
      </div>
    </div>
  );
}
