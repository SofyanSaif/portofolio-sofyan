'use client';
import { useEffect, useState, useRef } from 'react';

export default function ProjectCard({ title, category, description, metrics, techStack, githubLink }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Lacak posisi mouse
  const [currentValue, setCurrentValue] = useState(metrics?.start ?? 0);

  // Fungsi melacak pergerakan mouse di dalam kartu
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !metrics || typeof metrics.start !== 'number' || typeof metrics.end !== 'number') return;
    let current = metrics.start;
    const step = (metrics.end - metrics.start) / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= metrics.end) { setCurrentValue(metrics.end); clearInterval(timer); } 
      else { setCurrentValue(current); }
    }, 40);
    return () => clearInterval(timer);
  }, [isVisible, metrics]);

  const hasValidMetrics = metrics && typeof metrics.start === 'number' && typeof metrics.end === 'number';

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 transition-all duration-700 flex flex-col h-full hover:border-blue-500/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* EFEK GLOW MAGNETIK */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />

      <div className="text-blue-500 font-mono text-xs mb-3 uppercase tracking-wider">{category}</div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

      {hasValidMetrics && (
        <div className="mb-6 p-4 bg-blue-950/30 rounded-xl border border-blue-900/50 relative overflow-hidden">
          <div className="text-xs text-gray-400 mb-1">{metrics.label}</div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-blue-400 font-mono">{currentValue.toFixed(2)}{metrics.suffix}</span>
            <span className="text-xs text-green-400 mb-1.5 animate-pulse">▲ Optimal</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 mt-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full transition-all" style={{ width: `${(currentValue / 100) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        {techStack?.map((tech: string, i: number) => (
          <span key={i} className={`text-xs px-3 py-1 rounded-md font-mono border ${tech.toLowerCase().includes('xgboost') ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' : 'bg-gray-800 text-gray-300 border-gray-700'}`}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}