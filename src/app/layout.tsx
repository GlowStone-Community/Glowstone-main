import type { Metadata } from "next";
import { Noto_Sans_SC, Press_Start_2P } from "next/font/google";
import "./globals.css";
import FontLoader from '@/components/FontLoader';

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-sc",
});

export const metadata: Metadata = {
  title: "Minecraft 萤石社 | 西南石油大学南充校区",
  description: "西南石油大学南充校区 Minecraft 萤石社官网——一起挖掘创意、点亮校园！",
  icons: {
    icon: "/assets/svg/favicon.svg",
  },
  // metadataBase should reflect the deployed hostname; we prefer an explicit env var,
  // then Vercel-provided URL, then a custom SWPUMC env, finally localhost fallback.
  metadataBase: (() => {
    const explicit = process.env.NEXT_PUBLIC_METADATA_BASE;
    const vercel = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
    const swpumc = process.env.NEXT_PUBLIC_SWPUMC_URL;
    if (explicit) return new URL(explicit);
    if (vercel) return new URL(`https://${vercel}`);
    if (swpumc) return new URL(`https://${swpumc}`);
    return new URL('http://localhost:3000');
  })(),
  openGraph: {
    title: 'Minecraft 萤石社',
    description: '一起挖掘创意、点亮校园 — 西南石油大学南充校区 Minecraft 萤石社',
    url: 'https://example.com/',
    siteName: '萤石社',
    images: [
      {
        url: '/assets/svg/favicon.svg',
        width: 512,
        height: 512,
        alt: '萤石社 favicon'
      }
    ],
    locale: 'zh-CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft 萤石社',
    description: '西南石油大学南充校区 Minecraft 社团',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${pressStart2P.variable} ${notoSansSC.variable} font-noto-sans theme-overworld`}
      >
  <FontLoader />
        {children}
      </body>
    </html>
  );
}
