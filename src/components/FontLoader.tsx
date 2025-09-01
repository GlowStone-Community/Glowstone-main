"use client";

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // 注释掉远程字体加载，因为我们现在使用本地 Minecraft 字体
    console.log('FontLoader: 使用本地 Minecraft AE 字体，跳过远程字体加载');
    
    /*
    async function rewriteCSS(main: string | undefined, callback?: string) {
      if (!main) return;
      try {
        const res = await fetch(main, { method: 'GET', mode: 'cors' });
        const CSS_TEXT = await res.text();
        const CSS_RESULT = main.replace(/result\.css$/, '');
        const style = document.createElement('style');
        style.textContent = CSS_TEXT.replace(/url\(['"]?\.\/([^'")]+)['"]?\)/g, `url("${CSS_RESULT}$1")`);
        document.head.appendChild(style);
        return;
      } catch (err) {
        if (callback) {
          try {
            const res2 = await fetch(callback, { method: 'GET', mode: 'cors' });
            const CSS_TEXT2 = await res2.text();
            const CSS_RESULT = callback.replace(/result\.css$/, '');
            const style2 = document.createElement('style');
            style2.textContent = CSS_TEXT2.replace(/url\(['"]?\.\/([^'")]+)['"]?\)/g, `url("${CSS_RESULT}$1")`);
            document.head.appendChild(style2);
            return;
          } catch (err2) {
            // swallow - fonts optional
            console.warn('FontLoader: failed to load fallback font CSS', err2);
          }
        } else {
          console.warn('FontLoader: failed to load font CSS', err);
        }
      }
    }

    rewriteCSS(
      'https://fontsapi.zeoseven.com/571/main/result.css',
      'https://fontsapi-storage.zeoseven.com/571/main/result.css'
    );
    */
  }, []);

  return null;
}
