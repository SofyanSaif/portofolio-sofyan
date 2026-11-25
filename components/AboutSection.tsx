import Link from 'next/link';
import GlassCard from './ui/GlassCard';
import { Sparkles, Code2, Database, Brain, Wrench, ArrowRight, Award, FolderCheck, Clock, Layers } from 'lucide-react';

interface AboutSectionProps {
  about?: any;
  profile?: any;
}

export default function AboutSection({ about, profile }: AboutSectionProps) {
  const stats = about?.stats || [
    { label: 'Tahun Pengalaman', value: '3+' },
    { label: 'Proyek Selesai', value: '12+' },
    { label: 'Pencapaian & Juara', value: '2' },
    { label: 'Teknologi Dikuasai', value: '15+' },
  ];

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 1:
        return <FolderCheck className="w-5 h-5 text-emerald-400" />;
      case 2:
        return <Award className="w-5 h-5 text-yellow-400" />;
      default:
        return <Layers className="w-5 h-5 text-purple-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('front')) return <Code2 className="w-4 h-4 text-cyan-400" />;
    if (cat.includes('back')) return <Database className="w-4 h-4 text-emerald-400" />;
    if (cat.includes('machine') || cat.includes('data') || cat.includes('ai')) return <Brain className="w-4 h-4 text-purple-400" />;
    return <Wrench className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Dedikasi pada Logika, Kualitas & Inovasi
          </h2>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors group"
        >
          <span>Baca Cerita Lengkap</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat: any, idx: number) => (
          <GlassCard key={idx} className="p-5 flex items-center gap-4 border-gray-800 hover:border-blue-500/40">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
              {getStatIcon(idx)}
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Story & Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative Bio */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-500 font-mono">01.</span>
                <span>{about?.headline || 'Profil Profesional'}</span>
              </h3>
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-3 whitespace-pre-line">
                {about?.story || profile?.bio}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-400">
              <div>
                <span className="text-gray-500 block">Pendidikan Aktif:</span>
                <span className="text-white font-medium">{profile?.education || 'Universitas Dian Nuswantoro'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Lokasi:</span>
                <span className="text-white font-medium">{profile?.location || 'Semarang & Madiun'}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Skills Matrix */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-blue-500 font-mono">02.</span>
              <span>Keahlian & Core Tech Stack</span>
            </h3>

            <div className="space-y-6">
              {about?.skills?.map((skillGroup: any, idx: number) => (
                <div key={idx} className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                    {getCategoryIcon(skillGroup.category)}
                    <span>{skillGroup.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items?.map((item: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-gray-900/60 border border-gray-800 text-gray-300 text-xs font-mono hover:border-blue-500/50 hover:text-white transition-all hover:scale-105"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
