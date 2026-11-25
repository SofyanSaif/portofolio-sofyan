import GlassCard from './ui/GlassCard';
import { Briefcase, Calendar, MapPin, CheckCircle, Tag } from 'lucide-react';

interface ExperienceItem {
  id: number | string;
  role: string;
  company: string;
  period: string;
  type?: string;
  location?: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

export default function ExperienceSection({ experience }: { experience?: ExperienceItem[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Briefcase className="w-4 h-4" />
          <span>Pengalaman Kerja & Riset</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Rekam Jejak Profesional & Kontribusi
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
          Eksplorasi nyata di bidang Machine Learning, rekayasa data analitik, dan perancangan aplikasi web fullstack end-to-end.
        </p>
      </div>

      <div className="space-y-6">
        {experience.map((item, idx) => (
          <GlassCard
            key={item.id || idx}
            className="p-6 md:p-8 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.role}
                  </h3>
                  {item.type && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.type}
                    </span>
                  )}
                </div>

                <div className="text-lg font-medium text-blue-400 mb-2">
                  {item.company}
                </div>
              </div>

              {/* Meta: Period & Location */}
              <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 text-xs text-gray-400 font-mono shrink-0">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.period}</span>
                </div>
                {item.location && (
                  <div className="flex items-center gap-1.5 text-gray-400 px-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                {item.description}
              </p>
            )}

            {/* Achievements Bullet List */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="mb-6 space-y-2 pt-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">
                  Pencapaian Kunci:
                </span>
                <ul className="space-y-2">
                  {item.achievements.map((ach, i) => (
                    <li key={i} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="pt-4 border-t border-gray-800/80 flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-gray-500 shrink-0 mr-1" />
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-900 border border-gray-700 text-gray-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
