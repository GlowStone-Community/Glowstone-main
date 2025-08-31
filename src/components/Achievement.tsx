'use client';

interface AchievementProps {
  message: string;
  show: boolean;
}

export default function Achievement({ message, show }: AchievementProps) {
  if (!show) return null;

  return (
    <div 
      className="achievement show fixed left-5 bottom-5 z-50 border-4 border-black bg-[#3a3] shadow-[0_6px_0_#000] text-[#021] px-3.5 py-2.5 font-bold"
      aria-live="polite" 
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
