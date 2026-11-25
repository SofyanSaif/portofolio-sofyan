import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionContainer from '@/components/ui/SectionContainer';
import GlassCard from '@/components/ui/GlassCard';
import HeroTyping from '@/components/HeroTyping';
import ProjectsFilter from '@/components/ProjectsFilter';
import BackToTop from '@/components/BackToTop';
import InteractiveTerminal from '@/components/ui/InteractiveTerminal';
import MasonryGallery from '@/components/ui/MasonryGallery';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import { getPortfolioData } from '@/lib/getPortfolioData';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Layers
} from 'lucide-react';
import { Github, Linkedin, Instagram } from '@/components/ui/BrandIcons';

export default function Portfolio() {
  const data = getPortfolioData();

  if (!data) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-400 font-mono">
        Konfigurasi data portofolio tidak ditemukan.
      </div>
    );
  }

  const { profile, about, contact, education, experience, certificates, projects, gallery, terminal } = data;

  return (
    <div className="min-h-screen text-gray-200 font-sans overflow-x-hidden relative flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* --- TOP NAVBAR --- */}
      <Navbar name={profile?.name} />

      <main className="relative z-10 flex-1">
        {/* =================================================================
            HERO SECTION
        ================================================================= */}
        <SectionContainer className="pt-28 sm:pt-36 pb-16 md:pb-24">
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-14">
            {/* Left Content Column */}
            <div className="flex-1 text-center lg:text-left flex flex-col justify-between py-2">
              <div>
                {/* Status chip */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{profile?.status || 'Available for freelance & projects'}</span>
                </div>

                {/* Animated Typing Header (Micro Client Island) */}
                <HeroTyping name={profile?.name} />

                {/* Subtitle / Headline */}
                <p className="text-blue-400 font-medium text-sm sm:text-base md:text-lg mb-3">
                  {profile?.headline || 'Fullstack Developer & Aspiring Machine Learning Engineer'}
                </p>

                {/* Short Bio */}
                <p className="text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg mb-8 leading-relaxed mx-auto lg:mx-0">
                  {profile?.bio}
                </p>

                {/* Social Quick-Bar on Hero */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                  {contact?.github && (
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gray-500 text-gray-300 hover:text-white transition-all"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {contact?.linkedin && (
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {contact?.instagram && (
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/50 text-pink-400 hover:text-pink-300 transition-all"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {contact?.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-xs"
                      title="Email"
                    >
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="hidden sm:inline font-mono">{contact.email}</span>
                    </a>
                  )}
                  {contact?.phone && (
                    <a
                      href={`https://wa.me/${contact.whatsapp || contact.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-emerald-400 transition-all flex items-center gap-2 text-xs"
                      title="WhatsApp"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline font-mono">{contact.phone}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(59,130,246,0.55)] transition-all transform hover:-translate-y-0.5"
                >
                  Lihat Proyek Unggulan
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-xl border border-gray-700 hover:border-gray-400 text-gray-200 hover:text-white font-medium text-sm bg-white/5 hover:bg-white/10 transition-all transform hover:-translate-y-0.5"
                >
                  Hubungi Saya
                </a>
                <a
                  href="#playground"
                  className="px-5 py-3.5 rounded-xl border border-gray-800 hover:border-yellow-500/50 text-gray-300 hover:text-yellow-400 font-medium text-sm transition-all"
                >
                  Coba Terminal &gt;_
                </a>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="relative w-64 sm:w-72 md:w-80 h-[360px] sm:h-[420px] lg:h-auto shrink-0 flex flex-col p-2 group">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-[2.5rem] blur-[50px] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Cyber Frame */}
              <div className="absolute inset-0 border-2 border-gray-700/80 rounded-[2.5rem] bg-gradient-to-b from-blue-950/20 via-gray-900/60 to-gray-950 pointer-events-none z-0 shadow-2xl overflow-hidden backdrop-blur-xs">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>

              {/* Profile Image with async decoding */}
              <img
                src={profile?.profileImage || '/images/sofyan-no-bg.png'}
                alt={profile?.name || 'Sofyan Saif'}
                decoding="async"
                className="relative z-10 w-full h-full flex-1 object-cover rounded-[2.2rem] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Meta Tag */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl bg-[#161616]/90 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-white font-bold text-xs block">{profile?.name}</span>
                  <span className="text-gray-400 text-[11px] font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    {profile?.location || 'Semarang, Jawa Tengah'}
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* =================================================================
            ABOUT & SKILLS SECTION
        ================================================================= */}
        <SectionContainer id="about" className="py-16 md:py-24">
          <AboutSection about={about} profile={profile} />
        </SectionContainer>

        {/* =================================================================
            EDUCATION SECTION
        ================================================================= */}
        <SectionContainer id="education" className="py-16 md:py-24">
          <EducationSection education={education} />
        </SectionContainer>

        {/* =================================================================
            EXPERIENCE SECTION
        ================================================================= */}
        <SectionContainer id="experience" className="py-16 md:py-24">
          <ExperienceSection experience={experience} />
        </SectionContainer>

        {/* =================================================================
            FEATURED PROJECTS SECTION WITH FILTER TABS (CLIENT COMPONENT)
        ================================================================= */}
        <SectionContainer id="projects" className="py-16 md:py-24">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4" />
              <span>Karya & Implementasi</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-blue-500 font-mono">{"</>"}</span>
              <span>Featured Projects</span>
            </h2>
          </div>

          <ProjectsFilter projects={projects || []} />
        </SectionContainer>

        {/* =================================================================
            CERTIFICATES SECTION
        ================================================================= */}
        <SectionContainer id="certificates" className="py-16 md:py-24">
          <CertificatesSection certificates={certificates} />
        </SectionContainer>

        {/* =================================================================
            LOGIC PLAYGROUND (INTERACTIVE TERMINAL)
        ================================================================= */}
        <SectionContainer id="playground" className="py-16 md:py-24">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Simulasi Interaktif</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-yellow-500 font-mono">{">_"}</span>
              <span>Logic Playground</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Ketik perintah seperti <code className="text-yellow-400 bg-yellow-950/40 px-1.5 py-0.5 rounded">help</code>, <code className="text-yellow-400 bg-yellow-950/40 px-1.5 py-0.5 rounded">skills</code>, <code className="text-yellow-400 bg-yellow-950/40 px-1.5 py-0.5 rounded">education</code>, atau <code className="text-yellow-400 bg-yellow-950/40 px-1.5 py-0.5 rounded">contact</code>.
            </p>
          </div>
          <GlassCard className="p-0 overflow-hidden border-gray-700/50">
            <InteractiveTerminal customCommands={terminal} />
          </GlassCard>
        </SectionContainer>

        {/* =================================================================
            GALLERY SECTION (LIFE OUTSIDE CODE)
        ================================================================= */}
        <SectionContainer id="gallery" className="py-16 md:py-24">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Life Outside Code
            </h2>
            <p className="text-gray-400 text-sm">
              Momen perjalanan, petualangan, dan hobi di luar jam coding.
            </p>
          </div>
          <MasonryGallery images={gallery} />
        </SectionContainer>

        {/* =================================================================
            CONTACT SECTION
        ================================================================= */}
        <SectionContainer id="contact" className="py-16 md:py-24">
          <ContactSection contact={contact} profileName={profile?.name} />
        </SectionContainer>
      </main>

      {/* --- FOOTER --- */}
      <Footer profile={profile} contact={contact} />

      {/* --- FLOATING BACK TO TOP BUTTON (MICRO CLIENT ISLAND) --- */}
      <BackToTop />
    </div>
  );
}
