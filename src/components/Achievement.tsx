'use client';

interface AchievementProps {
  message: string;
  show: boolean;
}

export default function Achievement({ message, show }: AchievementProps) {
  if (!show) return null;

  return (
    <div 
      className="achievement show"
      aria-live="polite" 
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
