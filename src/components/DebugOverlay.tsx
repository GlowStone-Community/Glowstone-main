'use client';

interface DebugOverlayProps {
  show: boolean;
  coords: { x: string; y: number; z: string };
}

export default function DebugOverlay({ show, coords }: DebugOverlayProps) {
  if (!show) return null;

  return (
    <div id="debug-overlay" className="debug-overlay fixed right-2 top-2 bg-[#000c] text-[#0f0] border-2 border-[#0f0] p-2 font-mono text-xs leading-tight z-50" aria-hidden={!show}>
      <p>Minecraft 1.20 (Next.js Edition)</p>
      <p>XYZ: <span id="coord">{coords.x} / {coords.y} / {coords.z}</span></p>
      <p>Block: <span id="block">{Math.round(Number(coords.x))} {coords.y} {Math.round(Number(coords.z))}</span></p>
      <p>Facing: South (Towards Z+)</p>
      <p>Biome: Campus/Nanchong</p>
      <p>Local Difficulty: Normal (Club Heat x1.0)</p>
    </div>
  );
}
