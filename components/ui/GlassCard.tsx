import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div 
      className={`
        bg-[#161619] 
        border border-white/10 
        rounded-2xl p-6 md:p-8 
        transition-colors duration-200
        hover:border-blue-500/40
        ${className}
      `}
    >
      {children}
    </div>
  );
}
