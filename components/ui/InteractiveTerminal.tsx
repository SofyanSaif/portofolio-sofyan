'use client';

import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'welcome';
}

interface CustomCommand {
  command: string;
  output: string;
}

export default function InteractiveTerminal({ customCommands }: { customCommands?: CustomCommand[] }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Welcome to Sofyan's Logic Playground v2.0.0 [Web & Data Shell]", type: 'welcome' },
    { text: 'Type "help" to see available commands or try "whoami", "skills", "python run", "education", "contact".', type: 'welcome' },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ text: `guest@sofyan-portfolio:~$ ${cmd}`, type: 'command' }];

    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, ...newLines]);
      return;
    }

    if (trimmedCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    // Check if custom command matches from json/admin
    const matchedCustom = customCommands?.find(
      (c) => c.command.trim().toLowerCase() === trimmedCmd
    );

    if (matchedCustom) {
      newLines.push({ text: matchedCustom.output, type: 'output' });
      setHistory((prev) => [...prev, ...newLines]);
      setInput('');
      return;
    }

    switch (trimmedCmd) {
      case 'help': {
        const customNames = customCommands?.map((c) => c.command).join(', ') || '';
        newLines.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  help       - Show available command list', type: 'output' },
          { text: '  skills     - Display core competencies & tech stack', type: 'output' },
          { text: '  about      - Brief introduction of this system', type: 'output' },
          { text: '  cat        - Summon a friendly digital companion', type: 'output' },
          { text: '  clear      - Clear the terminal screen', type: 'output' }
        );
        if (customNames) {
          newLines.push({
            text: `  custom     - Dynamic admin commands: ${customNames}`,
            type: 'output'
          });
        }
        break;
      }

      case 'skills':
        newLines.push(
          { text: 'Loading core system infrastructure...', type: 'output' },
          { text: '[■■■■■■■■■■■■■■■■■■■■] 100% Verified.', type: 'output' },
          { text: '----------------------------------------', type: 'output' },
          { text: '• Frontend: React, Next.js, TypeScript, Tailwind CSS', type: 'output' },
          { text: '• Backend:  Node.js, Express, Laravel, PostgreSQL, MySQL', type: 'output' },
          { text: '• Data/ML:  Python, XGBoost, Random Forest, Scikit-Learn', type: 'output' },
          { text: '----------------------------------------', type: 'output' }
        );
        break;

      case 'cat':
        newLines.push(
          { text: 'Summoning a wild orange cat onto the terminal...', type: 'output' },
          { text: '   /\\_/\\  ', type: 'output' },
          { text: '  ( o.o ) ', type: 'output' },
          { text: '   > ^ <  ', type: 'output' },
          { text: '"Meow! Keep coding, debugging, and never give up!"', type: 'output' }
        );
        break;

      case 'about':
        newLines.push(
          { text: 'Built with Next.js & React 19. Engineered for precision and responsiveness.', type: 'output' }
        );
        break;

      default:
        newLines.push({
          text: `command not found: "${cmd}". Type "help" to see valid commands.`,
          type: 'output'
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div className="w-full bg-[#0D1117] font-mono text-xs sm:text-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
      {/* Header Terminal */}
      <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-gray-400 text-xs select-none">bash - guest@sofyan-portfolio</span>
        <div className="w-10" />
      </div>

      {/* Konten Output Terminal */}
      <div
        ref={containerRef}
        className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-gray-800"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'command'
                ? 'text-white font-semibold'
                : line.type === 'welcome'
                ? 'text-blue-400'
                : 'text-gray-300'
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Baris Input Aktif */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-green-400 font-semibold shrink-0">guest@sofyan-portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand(input);
            }}
            className="bg-transparent text-white outline-none flex-1 border-none p-0 focus:ring-0 font-mono text-xs sm:text-sm"
            placeholder="Ketik perintah..."
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
