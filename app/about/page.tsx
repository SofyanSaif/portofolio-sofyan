import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionContainer from '@/components/ui/SectionContainer';
import GlassCard from '@/components/ui/GlassCard';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import { getPortfolioData } from '@/lib/getPortfolioData';
import {
  ArrowLeft,
  Sparkles,
  Code2,
  Brain,
  Rocket,
  Compass,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function AboutPage() {
  const data = getPortfolioData();

  if (!data) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-400 font-mono">
        Konfigurasi data portofolio tidak ditemukan.
      </div>
    );
  }

  const { profile, about, contact, education, experience, certificates } = data;

  return (
    <div className="min-h-screen text-gray-200 font-sans overflow-x-hidden relative flex flex-col justify-between">
      {/* Main Top Navbar */}
      <Navbar name={profile?.name} />

      <main className="pt-28 pb-20 relative z-10 flex-1">
        <SectionContainer>
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>

          {/* Hero Header on About Page */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mengenal Lebih Dekat</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Di Balik Kode & Data: Perjalanan Saya Menjadi Rekayasawan Perangkat Lunak
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {about?.headline || profile?.headline || 'Associate Data Scientist & Fullstack Developer'}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Hubungi Saya</span>
                </a>
                <Link
                  href="/#projects"
                  className="px-5 py-2.5 rounded-xl border border-gray-700 hover:border-gray-400 text-gray-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
                >
                  <span>Lihat Portofolio Proyek</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Profile Photo with Glow */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 bg-gray-900 shadow-2xl">
                  <img
                    src={profile?.profileImage || '/images/sofyan-no-bg.png'}
                    alt={profile?.name}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <span className="text-white font-bold text-sm block">{profile?.name}</span>
                    <span className="text-blue-400 text-xs font-mono">{profile?.location || 'Semarang, Jawa Tengah'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Story / Journey */}
          <div className="mb-20">
            <GlassCard className="p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Compass className="w-6 h-6 text-blue-500" />
                <span>Kisah & Perjalanan Saya</span>
              </h2>
              <div className="prose prose-invert max-w-none text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line">
                {about?.story || profile?.bio}
              </div>

              {/* Core Values / Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">Clean Architecture</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Menulis kode yang mudah dipelihara, modular, dan mematuhi best practices industri.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                    <Brain className="w-4 h-4" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">Data-Driven Logic</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Memanfaatkan algoritma pembelajaran mesin untuk mengekstrak pola dan wawasan bermakna.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">Adaptive & Agile</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Cepat beradaptasi dengan stack teknologi baru dan tanggap terhadap kebutuhan pengguna.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Education Section in About */}
          <div id="education" className="mb-20">
            <EducationSection education={education} />
          </div>

          {/* Experience Section in About */}
          <div id="experience" className="mb-20">
            <ExperienceSection experience={experience} />
          </div>

          {/* Certificates Section in About */}
          <div id="certificates" className="mb-20">
            <CertificatesSection certificates={certificates} />
          </div>

          {/* Contact Section in About */}
          <div id="contact" className="mb-10">
            <ContactSection contact={contact} profileName={profile?.name} />
          </div>
        </SectionContainer>
      </main>

      {/* Main Footer */}
      <Footer profile={profile} contact={contact} />
    </div>
  );
}
