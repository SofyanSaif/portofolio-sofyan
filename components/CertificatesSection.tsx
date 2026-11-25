'use client';

import { useState } from 'react';
import GlassCard from './ui/GlassCard';
import { Award, ExternalLink, Calendar, ShieldCheck, Eye, X } from 'lucide-react';

interface CertificateItem {
  id: number | string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  category?: string;
  description?: string;
}

export default function CertificatesSection({ certificates }: { certificates?: CertificateItem[] }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Award className="w-4 h-4" />
          <span>Sertifikasi & Penghargaan</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Lisensi & Bukti Kompetensi
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
          Dokumentasi sertifikasi keahlian profesional dan prestasi kompetisi teknologi terverifikasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <GlassCard
            key={cert.id || idx}
            className="flex flex-col justify-between overflow-hidden group hover:border-yellow-500/50 transition-all p-5"
          >
            <div>
              {/* Image Preview with click to enlarge */}
              {cert.image ? (
                <div
                  onClick={() => setSelectedImage({ url: cert.image!, title: cert.title })}
                  className="relative h-44 rounded-xl overflow-hidden mb-4 bg-gray-900 border border-gray-800 cursor-pointer group/img"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-xs">
                    <Eye className="w-4 h-4" />
                    <span>Perbesar Gambar</span>
                  </div>
                  {cert.category && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-black/70 text-yellow-300 border border-yellow-500/30 backdrop-blur-md">
                      {cert.category}
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-28 rounded-xl bg-gradient-to-br from-yellow-900/10 via-gray-900 to-gray-900 border border-yellow-700/20 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
                  <div className="flex items-center gap-2 text-yellow-400/80 font-mono text-xs">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              )}

              {/* Title & Issuer */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-base group-hover:text-yellow-300 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
              </div>

              <div className="text-yellow-400 text-xs font-medium mb-2">
                {cert.issuer}
              </div>

              {/* Description */}
              {cert.description && (
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                  {cert.description}
                </p>
              )}
            </div>

            {/* Bottom info: Date, Credential ID, Link */}
            <div className="pt-3 border-t border-gray-800/80 space-y-2 mt-auto">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span>{cert.issueDate}</span>
                </div>
                {cert.credentialId && (
                  <span className="text-gray-500 truncate max-w-[140px]" title={cert.credentialId}>
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>

              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors pt-1"
                >
                  <span>Verifikasi Kredensial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Lightbox Modal for enlarged certificate image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#161616]">
              <h4 className="text-white font-medium text-sm sm:text-base truncate pr-4">
                {selectedImage.title}
              </h4>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center max-h-[calc(90vh-70px)]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
