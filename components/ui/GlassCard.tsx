// components/ui/GlassCard.tsx
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-lg 
        border border-white/10 
        rounded-2xl p-6 md:p-8 
        transition-all duration-300 ease-in-out
        hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}