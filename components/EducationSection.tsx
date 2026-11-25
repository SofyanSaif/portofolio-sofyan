import GlassCard from './ui/GlassCard';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface EducationItem {
  id: number | string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location?: string;
  gpa?: string;
  description?: string;
  badge?: string;
  highlights?: string[];
}

export default function EducationSection({ education }: { education?: EducationItem[] }) {
  if (!education || education.length === 0) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Latar Belakang Akademik</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Pendidikan & Fondasi Keilmuan
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
          Kombinasi teori komputasi yang kuat dan praktek pemrograman mendalam sejak masa kejuruan hingga perguruan tinggi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item, idx) => (
          <GlassCard
            key={item.id || idx}
            className="flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50"
          >
            {/* Ambient accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Top row: badge & period */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pt-1">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {item.badge || 'Pendidikan'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Institution and degree */}
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {item.institution}
              </h3>
              <div className="text-blue-400 font-medium text-sm mt-1">
                {item.degree} • <span className="text-gray-300">{item.field}</span>
              </div>

              {/* Meta: Location and GPA */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-800">
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.gpa && (
                  <div className="flex items-center gap-1 text-emerald-400 font-mono font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>IPK / Nilai: {item.gpa}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {/* Highlights list */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-5 pt-4 border-t border-gray-800/80 space-y-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                  Sorotan & Aktivitas:
                </span>
                <ul className="space-y-1.5">
                  {item.highlights.map((hl, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
