import Link from 'next/link';
import { Phone, Mail, Heart, Shield, ArrowUp } from 'lucide-react';
import { Github, Linkedin, Instagram } from '@/components/ui/BrandIcons';

interface FooterProps {
  profile?: any;
  contact?: any;
}

export default function Footer({ profile, contact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0c0c0e] border-t border-white/10 text-gray-400 text-sm overflow-hidden z-20">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-mono font-bold text-xl tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-mono font-bold shadow-sm">
                &lt;/&gt;
              </div>
              <span>
                {profile?.name || 'Sofyan Saif'}
                <span className="text-blue-500">.dev</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              {profile?.bio ||
                'Fullstack Developer & Machine Learning Enthusiast berdedikasi membangun aplikasi web modern, cerdas, dan responsif.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile?.status || 'Terbuka untuk Peluang Baru & Proyek'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-mono tracking-wider uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-blue-400 transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-blue-400 transition-colors">
                  Certificates
                </a>
              </li>
              <li>
                <Link href="/about" className="text-blue-400 hover:text-blue-300 font-medium">
                  Full Story Page →
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-mono tracking-wider uppercase">
              Hubungi & Terhubung
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                </li>
              )}
              {contact?.phone && (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp || contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{contact.phone}</span>
                  </a>
                </li>
              )}
              {contact?.github && (
                <li>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-gray-300 shrink-0" />
                    <span>GitHub Profile</span>
                  </a>
                </li>
              )}
              {contact?.linkedin && (
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>LinkedIn Profile</span>
                  </a>
                </li>
              )}
              {contact?.instagram && (
                <li>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>Instagram Profile</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© {currentYear} {profile?.name || 'Sofyan Saif'}. Hak cipta dilindungi.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
