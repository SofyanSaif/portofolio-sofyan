'use client';

import { useState, useEffect } from 'react';

export default function HeroTyping({ name = 'Sofyan Saif' }: { name?: string }) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const fullText = `Hello, World. I'm ${name}`;
    setTypedText('');
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 85);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-white mb-6 min-h-[85px] sm:min-h-[115px] lg:min-h-[145px] flex items-center justify-center lg:justify-start flex-wrap">
      {typedText.includes("I'm") ? (
        <>
          <span>Hello, World.&nbsp;</span>
          <span className="block sm:inline">
            I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 font-sans">
              {typedText.substring(typedText.indexOf("I'm") + 4)}
            </span>
          </span>
        </>
      ) : (
        <span>{typedText || `Hello, World. I'm ${name}`}</span>
      )}
      <span className="text-blue-500 animate-blink ml-1 font-light">_</span>
    </h1>
  );
}
