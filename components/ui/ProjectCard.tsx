import { ExternalLink } from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  metrics?: any;
  techStack?: string[];
  githubLink?: string;
  demoLink?: string;
}

export default function ProjectCard({
  title,
  category,
  description,
  metrics,
  techStack,
  githubLink,
  demoLink
}: ProjectCardProps) {
  const hasValidMetrics = metrics && typeof metrics.end === 'number';

  return (
    <div className="group relative bg-[#161619] border border-gray-800 rounded-2xl p-6 sm:p-7 flex flex-col h-full hover:border-blue-500/50 transition-colors duration-200">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="text-blue-500 font-mono text-xs uppercase tracking-wider">{category}</div>
        <div className="flex items-center gap-2">
          {githubLink && githubLink !== '#' && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {demoLink && demoLink !== '#' && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-white/5 transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
        {description}
      </p>

      {hasValidMetrics && (
        <div className="mb-6 p-4 bg-blue-950/20 rounded-xl border border-blue-900/40 relative overflow-hidden">
          <div className="text-xs text-gray-400 mb-1">{metrics.label}</div>
          <div className="flex items-end gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">
              {metrics.end}{metrics.suffix || '%'}
            </span>
            <span className="text-xs text-green-400 mb-1.5">▲ Optimal</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 mt-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full"
              style={{ width: `${Math.min(100, Math.max(0, metrics.end))}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800/60">
        {techStack?.map((tech: string, i: number) => (
          <span
            key={i}
            className={`text-xs px-2.5 py-1 rounded-md font-mono border ${
              tech.toLowerCase().includes('xgboost') || tech.toLowerCase().includes('python')
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                : 'bg-gray-800/80 text-gray-300 border-gray-700/80'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
