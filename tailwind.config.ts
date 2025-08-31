import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mc-green': 'var(--mc-green)',
        'mc-darker-green': 'var(--mc-darker-green)',
        'mc-brown': 'var(--mc-brown)',
        'mc-dirt': 'var(--mc-dirt)',
        'mc-stone': 'var(--mc-stone)',
        'mc-ui': 'var(--mc-ui)',
        'mc-ui-dark': 'var(--mc-ui-dark)',
        'mc-black': 'var(--mc-black)',
        'mc-white': 'var(--mc-white)',
        'accent': 'var(--accent)',
        'nether': 'var(--nether)',
        'end': 'var(--end)',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'monospace'],
        'noto-sans': ['"Noto Sans SC"', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        DEFAULT: '2px 2px #000',
        lg: '3px 3px #000',
      },
    },
  },
  plugins: [],
};
export default config;
