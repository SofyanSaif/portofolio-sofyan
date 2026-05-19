// components/ui/SectionContainer.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionContainer({ children, className = '', id }: ContainerProps) {
  return (
    <section 
      id={id} 
      className={`max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
}