'use client';
import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'welcome';
}

export default function InteractiveTerminal({ customCommands }: { customCommands?: any }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Welcome to Sofyan\'s Logic Playground v1.0.0', type: 'welcome' },
    { text: 'Type "help" to see available commands.', type: 'welcome' },
  ]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Memastikan terminal scroll ke bawah HANYA saat ada perintah baru (melindungi dari bug auto-scroll)
  useEffect(() => {
    if (containerRef.current) {
      // Hanya menggulirkan bagian dalam kotak terminal tanpa menarik layar utama web
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let newLines: TerminalLine[] = [{ text: `guest@sofyan-portfolio:~$ ${cmd}`, type: 'command' }];

    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, ...newLines]);
      return;
    }

    switch (trimmedCmd) {
      case 'help':
        newLines.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  skills   - Display technical stack & core competencies', type: 'output' },
          { text: '  cat      - Summon a friendly digital companion', type: 'output' },
          { text: '  clear    - Clear the terminal screen', type: 'output' },
          { text: '  about    - Brief introduction about this engine', type: 'output' }
        );
        break;

      case 'skills':
        newLines.push(
          { text: 'Loading core system infrastructure...', type: 'output' },
          { text: '[■■■■■■■■■■■■■■■■■■■■] 100% Verified.', type: 'output' },
          { text: '----------------------------------------', type: 'output' },
          { text: '• Core Languages: C++, Java, PHP, Python, Shell, SQL', type: 'output' },
          { text: '• Ecosystems:     Next.js, Node.js, Web3 Foundations', type: 'output' },
          { text: '----------------------------------------', type: 'output' }
        );
        break;

      case 'cat':
        newLines.push(
          { text: 'Summoning a wild orange cat onto the terminal...', type: 'output' },
          { text: '   /\\_/\\  ', type: 'output' },
          { text: '  ( o.o ) ', type: 'output' },
          { text: '   > ^ <  ', type: 'output' },
          { text: '"Meow! Meow! Don\'t forget to break between coding sessions!"', type: 'output' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'about':
        newLines.push(
          { text: 'Built with Next.js & React. Engineered for logic-based problem solving.', type: 'output' }
        );
        break;

      default:
        newLines.push({ text: `command not found: ${cmd}. Type "help" for valid options.`, type: 'output' });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div className="w-full bg-[#0D1117] font-mono text-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
      {/* Header Terminal */}
      <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-gray-500 text-xs select-none">bash - guest@sofyan-portfolio</span>
        <div className="w-10" />
      </div>

      {/* Konten Output Terminal */}
      <div 
        ref={containerRef} 
        className="p-4 h-72 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-gray-800">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap ${
              line.type === 'command' ? 'text-white font-semibold' : 
              line.type === 'welcome' ? 'text-blue-400' : 'text-gray-300'
            }`}
          >
            {line.text}
          </div>
        ))}
        
        {/* Baris Input Aktif */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-green-500 font-semibold shrink-0">guest@sofyan-portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand(input);
            }}
            className="bg-transparent text-white outline-none flex-1 border-none p-0 focus:ring-0"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
}