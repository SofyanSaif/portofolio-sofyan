'use client';
import { useEffect, useState } from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import GlassCard from '@/components/ui/GlassCard';
import Timeline from '@/components/ui/Timeline';
import MasonryGallery from '@/components/ui/MasonryGallery';
import InteractiveTerminal from '@/components/ui/InteractiveTerminal';
import ProjectCard from '@/components/ui/ProjectCard';

export default function Portfolio() {
  const [data, setData] = useState<any>(null);
  const [typedText, setTypedText] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Tombol akan muncul jika layar di-scroll lebih dari 300px ke bawah
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (!data?.profile?.name) return;
    const fullText = `Hello, World. I'm ${data.profile.name}`;
    setTypedText(''); 
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-400 font-mono">Loading Config...</div>;

  return (
    <main className="min-h-screen bg-[#121212] text-gray-200 font-sans overflow-x-hidden relative">
      
      {/* ANIMATED BACKGROUND */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none duration-[8000ms]" />
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-purple-600/5 rounded-full blur-[150px] animate-bounce pointer-events-none duration-[12000ms]" />

      {/* --- HERO SECTION --- */}
      <SectionContainer className="pt-32 pb-16 relative z-10">
        {/* PERUBAHAN 1: Menggunakan items-stretch agar tinggi kiri dan kanan sama persis */}
        <div className="flex flex-col-reverse md:flex-row items-stretch justify-between gap-12">
          
          {/* PERUBAHAN 2: Kolom Teks (Kiri) menggunakan flex-col dan justify-between */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-between py-2">
            
            {/* Grup Atas (Teks) */}
            <div>
              <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 tracking-tight h-[120px] md:h-[180px] text-white">
                {typedText.includes("I'm") ? (
                  <>
                    Hello, World. <br />
                    I'm <span className="text-blue-500 font-sans">{typedText.substring(typedText.indexOf("I'm") + 4)}</span>
                  </>
                ) : (
                  typedText
                )}
                {/* INI KURSORNYA: Stabil dan kebal re-render */}
                <span className="text-blue-500 animate-blink ml-1 font-light">_</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-base md:text-lg mb-8 leading-relaxed">
                {data.profile.bio}
              </p>
            </div>
            
            {/* Grup Bawah (Tombol) - Akan otomatis terdorong sejajar dengan bawah foto */}
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#projects" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                Lihat Proyek
              </a>
              <a href="#playground" className="px-6 py-3 rounded-xl border border-gray-600 hover:border-white text-gray-300 font-medium transition-all">
                Coba Terminal
              </a>
            </div>
          </div>

          {/* PERUBAHAN 3: KOTAK FOTO (Kanan) - Akan melar otomatis mengikuti tinggi kolom teks */}
          <div className="relative w-64 h-[350px] md:w-[320px] md:h-auto shrink-0 mt-8 md:mt-0 flex flex-col p-2 group">
            
            {/* Aura Glow di luar kartu */}
            <div className="absolute inset-0 bg-blue-500 rounded-[2rem] blur-[60px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500"></div>

            {/* Bingkai Utama */}
            <div className="absolute inset-0 border-4 border-gray-800 rounded-[2rem] bg-gradient-to-b from-blue-900/10 to-gray-900 pointer-events-none z-0 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Gambar Profil Sofyan */}
            <img 
              src={data.profile.profileImage} 
              alt={data.profile.name} 
              className="relative z-10 w-full h-full flex-1 object-cover rounded-[1.75rem] transition-transform duration-500 hover:scale-105"
            />
            
          </div>

        </div>
      </SectionContainer>

      {/* --- LOGIC PLAYGROUND --- */}
      <SectionContainer id="playground" className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3">
          <span className="text-yellow-500">{">_"}</span> Logic Playground
        </h2>
        <GlassCard className="p-0 overflow-hidden border-gray-700/50">
          <InteractiveTerminal customCommands={data.terminal} />
        </GlassCard>
      </SectionContainer>

      {/* --- FEATURED PROJECTS --- */}
      <SectionContainer id="projects" className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3">
          <span className="text-blue-500">{"</>"}</span> Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects?.map((project: any) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
              metrics={project.metrics}
              techStack={project.techStack}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </SectionContainer>

      {/* --- TIMELINE --- */}
      <SectionContainer id="experience" className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Riwayat & Pencapaian</h2>
        <GlassCard>
           {data && data.timeline && <Timeline data={data.timeline} />}
        </GlassCard>
      </SectionContainer>

      {/* --- GALLERY --- */}
      <SectionContainer id="gallery" className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Life Outside Code</h2>
        <MasonryGallery images={data.gallery} />
      </SectionContainer>
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 p-3 md:p-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500 z-50 flex items-center justify-center ${
          showBackToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
        aria-label="Kembali ke atas"
      >
        {/* Ikon Panah ke Atas (SVG) */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

    </main>
  );
}