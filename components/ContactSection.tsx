'use client';

import { useState } from 'react';
import GlassCard from './ui/GlassCard';
import { Mail, Phone, Send, Copy, Check, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import { Github, Linkedin, Instagram } from '@/components/ui/BrandIcons';

interface ContactSectionProps {
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    location?: string;
  };
  profileName?: string;
}

export default function ContactSection({ contact, profileName = 'Sofyan Saif' }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const cleanPhone = contact?.whatsapp || contact?.phone?.replace(/[^0-9]/g, '') || '';
  const email = contact?.email || 'sofyansaif@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Direct WhatsApp message formatting
    const waText = encodeURIComponent(
      `Halo ${profileName},\n\nNama saya: ${formData.name}\nEmail: ${formData.email || '-'}\n\nPesan:\n${formData.message}`
    );
    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    // Also open WhatsApp in new tab
    window.open(waUrl, '_blank');
    setSentStatus('Pesan telah disiapkan dan dialihkan ke WhatsApp!');
    setTimeout(() => setSentStatus(null), 5000);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Hubungi Saya</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Mari Berdiskusi & Berkolaborasi
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
          Tertarik mengembangkan proyek bersama, riset machine learning, atau peluang kerja? Saya selalu terbuka untuk berdiskusi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Info Channels (Left side) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Email Card with One-Click Copy */}
            <GlassCard className="p-5 hover:border-blue-500/50 transition-all flex items-center justify-between">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-mono text-gray-400 block">Kirim Email Langsung</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-white hover:text-blue-400 font-medium text-sm sm:text-base truncate block transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                title="Salin Email"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all shrink-0 ml-2"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </GlassCard>

            {/* Phone & WhatsApp Card */}
            {contact?.phone && (
              <GlassCard className="p-5 hover:border-emerald-500/50 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block">WhatsApp & Telepon</span>
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 font-medium text-sm sm:text-base block transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all text-xs font-medium flex items-center gap-1 shrink-0"
                >
                  <span>Chat WA</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </GlassCard>
            )}

            {/* Social Grid: GitHub, LinkedIn, Instagram */}
            <div className="grid grid-cols-3 gap-3">
              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gray-600 transition-all flex flex-col items-center justify-center text-center group"
                >
                  <Github className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs text-gray-300 font-medium">GitHub</span>
                </a>
              )}

              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center justify-center text-center group"
                >
                  <Linkedin className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs text-gray-300 font-medium">LinkedIn</span>
                </a>
              )}

              {contact?.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/50 transition-all flex flex-col items-center justify-center text-center group"
                >
                  <Instagram className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs text-gray-300 font-medium">Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick status pill */}
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/40 text-xs text-gray-400 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              Waktu respon rata-rata di bawah 24 jam untuk email & chat WhatsApp.
            </span>
          </div>
        </div>

        {/* Quick Message Form (Right side) */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>Kirim Pesan Langsung</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Isi form di bawah untuk mengirim pesan cepat melalui WhatsApp / Email.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 font-mono">
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Lengkap"
                    className="w-full bg-[#18181b] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 font-mono">
                    Email Anda (Opsional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-[#18181b] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 font-mono">
                  Pesan Anda *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan ide proyek, penawaran kolaborasi, atau pertanyaan Anda di sini..."
                  className="w-full bg-[#18181b] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {sentStatus && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  {sentStatus}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                </button>

                <a
                  href={`mailto:${email}?subject=Inquiry%20dari%20Website%20Portofolio&body=${encodeURIComponent(
                    formData.message || 'Halo Sofyan, saya ingin mendiskusikan peluang proyek.'
                  )}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Kirim via Email</span>
                </a>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
