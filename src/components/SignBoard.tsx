'use client';

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
    <div className={`sign-board-nutscraft ${className}`}>
      {title && (
        <h3>{title}</h3>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}
