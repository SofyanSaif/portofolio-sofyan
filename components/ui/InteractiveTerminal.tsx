'use client';
import React, { useState, useRef, useEffect } from 'react';

interface TerminalCommand {
  command: string;
  output: string;
}

interface InteractiveTerminalProps {
  customCommands?: TerminalCommand[];
}

export default function InteractiveTerminal({ customCommands = [] }: InteractiveTerminalProps) {
  const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([
    { 
      command: '', 
      output: 'Terminal Portfolio v1.0.0\nKetik "help" untuk melihat daftar perintah yang tersedia.' 
    }
  ]);
  const [input, setInput] = useState('');
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke bawah setiap ada baris baru
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let output: string | React.ReactNode = '';

      if (cmd === 'help') {
        // Dinamis mengambil list command dari JSON
        const availableCmds = customCommands.map(c => `  - ${c.command.padEnd(12)} : (Data dari Admin)`).join('\n');
        output = `Available commands:\n${availableCmds}\n  - clear        : Bersihkan terminal`;
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === '') {
        output = '';
      } else {
        // CEK APAKAH PERINTAH ADA DI DATABASE JSON KITA
        const foundCommand = customCommands.find(c => c.command.toLowerCase() === cmd);
        
        if (foundCommand) {
           // Gunakan <pre> agar enter (\n) dari JSON terbaca rapi
           output = <pre className="font-sans whitespace-pre-wrap">{foundCommand.output}</pre>;
        } else {
           output = `Command not found: ${cmd}. Type "help" for available commands.`;
        }
      }

      setHistory((prev) => [...prev, { command: input, output }]);
      setInput('');
    }
  };

  return (
    <div className="bg-black/80 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden font-mono text-sm shadow-2xl h-64 flex flex-col">
      {/* Header Terminal */}
      <div className="bg-gray-800/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-400 text-xs">guest@portfolio:~</span>
      </div>
      
      {/* Body Terminal */}
      <div className="p-4 flex-1 overflow-y-auto text-green-400 whitespace-pre-wrap text-left">
        {history.map((line, index) => (
          <div key={index} className="mb-2">
            {line.command && (
              <div className="flex gap-2">
                <span className="text-blue-400">➜</span>
                <span className="text-white">{line.command}</span>
              </div>
            )}
            <div className="text-gray-300 mt-1">{line.output}</div>
          </div>
        ))}
        
        {/* Input Baris Saat Ini */}
        <div className="flex gap-2 mt-2 items-center">
          <span className="text-blue-400 font-bold">➜</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none text-white focus:ring-0 p-0 border-none"
            spellCheck={false}
            autoFocus
          />
        </div>
        <div ref={endOfTerminalRef} />
      </div>
    </div>
  );
}