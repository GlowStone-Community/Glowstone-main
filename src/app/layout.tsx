import type { Metadata } from "next";
import { Noto_Sans_SC, Press_Start_2P } from "next/font/google";
import "./globals.css";

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
  title: "Minecraft萤石社 | 西南石油大学南充校区",
  description: "西南石油大学南充校区 Minecraft萤石社官网——一起挖掘创意、点亮校园！",
  icons: {
    icon: "/assets/svg/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${notoSansSC.variable} font-noto-sans theme-overworld`}
      >
        {children}
      </body>
    </html>
  );
}
