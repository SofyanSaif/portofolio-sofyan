'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import {
  User,
  Phone,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  Terminal,
  Image as ImageIcon,
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Search,
  CheckCircle2,
  AlertCircle,
  Download,
  Lock,
  Menu,
  X,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'contact' | 'about' | 'education' | 'experience' | 'projects' | 'certificates' | 'terminal' | 'gallery'>('profile');
  const [formData, setFormData] = useState<any>(null);
  const [initialData, setInitialData] = useState<any>(null);
  const [status, setStatus] = useState({ loading: true, message: '', error: false });
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        const safeData = {
          profile: data.profile || {},
          contact: data.contact || {
            phone: '',
            email: '',
            whatsapp: '',
            github: '',
            instagram: '',
            linkedin: '',
            location: ''
          },
          about: data.about || {
            headline: '',
            story: '',
            stats: [],
            skills: []
          },
          education: data.education || [],
          experience: data.experience || [],
          certificates: data.certificates || [],
          projects: data.projects || [],
          terminal: data.terminal || [],
          gallery: data.gallery || [],
          timeline: data.timeline || []
        };
        setFormData(safeData);
        setInitialData(JSON.stringify(safeData));
        setStatus({ loading: false, message: '', error: false });
      })
      .catch((err) => {
        setStatus({ loading: false, message: 'Gagal memuat data dari server.', error: true });
      });
  }, []);

  const hasUnsavedChanges = useMemo(() => {
    if (!formData || !initialData) return false;
    return JSON.stringify(formData) !== initialData;
  }, [formData, initialData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin2026' || passwordInput === 'sofyan2026') {
      setIsAuthenticated(true);
    } else {
      alert('Akses Ditolak: Kata sandi salah!');
    }
  };

  const uploadFile = async (file: File, uploadId: string, callback: (url: string) => void) => {
    setUploadingId(uploadId);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const resData = await res.json();
      if (res.ok && resData.url) {
        callback(resData.url);
      } else {
        alert('Gagal mengunggah gambar: ' + (resData.error || 'Server error'));
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi saat mengunggah');
    } finally {
      setUploadingId(null);
    }
  };

  const updateSectionField = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const updateArrayItem = (arrayName: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: string, defaultItem: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [arrayName]: [defaultItem, ...(prev[arrayName] || [])]
    }));
    // Expand the newly added item by default
    const newKey = `${arrayName}-0`;
    setExpandedItems((prev) => ({ ...prev, [newKey]: true }));
  };

  const removeArrayItem = (arrayName: string, indexToRemove: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    setFormData((prev: any) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_: any, idx: number) => idx !== indexToRemove)
    }));
  };

  const moveArrayItem = (arrayName: string, fromIndex: number, toIndex: number) => {
    setFormData((prev: any) => {
      const list = [...(prev[arrayName] || [])];
      if (toIndex < 0 || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, [arrayName]: list };
    });
  };

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setAllExpanded = (arrayName: string, count: number, value: boolean) => {
    const next: Record<string, boolean> = { ...expandedItems };
    for (let i = 0; i < count; i++) {
      next[`${arrayName}-${i}`] = value;
    }
    setExpandedItems(next);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus({ loading: false, message: 'Menyimpan data...', error: false });
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setInitialData(JSON.stringify(formData));
        setStatus({ loading: false, message: 'Perubahan berhasil disimpan!', error: false });
        setTimeout(() => setStatus({ loading: false, message: '', error: false }), 3500);
      } else {
        setStatus({ loading: false, message: 'Gagal menyimpan perubahan.', error: true });
      }
    } catch (error) {
      setStatus({ loading: false, message: 'Terjadi kesalahan koneksi server.', error: true });
    }
  };

  const downloadJsonBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (status.loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-gray-400 font-mono gap-3">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Memuat Control Panel...</span>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-6 sm:p-8 border-gray-800">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-1">Admin Control Center</h2>
          <p className="text-gray-400 text-xs text-center mb-6">
            Masuk untuk memperbarui profil, pendidikan, pengalaman, dan portofolio.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="Masukkan Kata Sandi Admin"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 text-base sm:text-sm"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">Default: admin2026</span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer text-sm"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              ← Kembali ke Portofolio
            </Link>
          </div>
        </GlassCard>
      </main>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profil & Hero', icon: <User className="w-4 h-4" />, count: null },
    { id: 'contact', label: 'Kontak & Medsos', icon: <Phone className="w-4 h-4" />, count: null },
    { id: 'about', label: 'Tentang & Skills', icon: <BookOpen className="w-4 h-4" />, count: formData.about?.skills?.length || 0 },
    { id: 'education', label: 'Pendidikan', icon: <GraduationCap className="w-4 h-4" />, count: formData.education?.length || 0 },
    { id: 'experience', label: 'Pengalaman', icon: <Briefcase className="w-4 h-4" />, count: formData.experience?.length || 0 },
    { id: 'projects', label: 'Featured Projects', icon: <Layers className="w-4 h-4" />, count: formData.projects?.length || 0 },
    { id: 'certificates', label: 'Sertifikat', icon: <Award className="w-4 h-4" />, count: formData.certificates?.length || 0 },
    { id: 'terminal', label: 'Playground', icon: <Terminal className="w-4 h-4" />, count: formData.terminal?.length || 0 },
    { id: 'gallery', label: 'Galeri Foto', icon: <ImageIcon className="w-4 h-4" />, count: formData.gallery?.length || 0 },
  ] as const;

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-sans flex flex-col">
      {/* =================================================================
          STICKY TOP HEADER (RESPONSIVE FOR MOBILE & DESKTOP)
      ================================================================= */}
      <header className="sticky top-0 z-40 bg-[#161618] border-b border-gray-800 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2 text-white font-mono font-bold text-sm sm:text-base">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-mono font-bold shadow-md">
                &lt;/&gt;
              </div>
              <span className="hidden sm:inline">Control Center</span>
            </Link>

            {hasUnsavedChanges && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Ada perubahan belum disimpan
              </span>
            )}
          </div>

          {/* Right: Actions (Save, Backup, View Site, Logout) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {status.message && (
              <div
                className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                  status.error
                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {status.error ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              onClick={() => handleSave()}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>

            <button
              onClick={downloadJsonBackup}
              title="Download Backup Data"
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline">Backup</span>
            </button>

            <Link
              href="/"
              target="_blank"
              title="Lihat Web Utama"
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden lg:inline">Web Utama</span>
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =================================================================
          MAIN WORKSPACE WITH RESPONSIVE SIDEBAR + CONTENT
      ================================================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* DESKTOP SIDEBAR / MOBILE DRAWER */}
        <aside
          className={`lg:w-64 shrink-0 fixed lg:static inset-0 z-30 bg-[#161618] lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile drawer header */}
          <div className="flex lg:hidden items-center justify-between pb-4 mb-4 border-b border-gray-800">
            <span className="text-white font-bold text-sm">Pilih Kategori</span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#161619] border border-gray-800 rounded-2xl p-2.5 space-y-1 sticky top-20 shadow-sm">
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider px-3 py-1.5 block">
              Menu Pengaturan
            </span>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileSidebarOpen(false);
                  setSearchQuery('');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* MOBILE HORIZONTAL CHIP BAR (FAST HORIZONTAL SCROLL) */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchQuery('');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-[#18181b] border border-gray-800 text-gray-400'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="text-[10px] opacity-75 font-mono">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* =================================================================
            RIGHT MAIN CANVAS (FORM CONTROLS)
        ================================================================= */}
        <main className="flex-1 min-w-0">
          <form onSubmit={handleSave} className="space-y-6 pb-20">
            {/* =================================================================
                TAB 1: PROFILE & HERO
            ================================================================= */}
            {activeTab === 'profile' && (
              <GlassCard className="p-5 sm:p-7 space-y-6">
                <div className="border-b border-gray-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-400" />
                      <span>Profil & Hero Section</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Nama tampilan, foto profil, deskripsi bio, dan status ketersediaan.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      value={formData.profile?.name || ''}
                      onChange={(e) => updateSectionField('profile', 'name', e.target.value)}
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">Headline / Job Title</label>
                    <input
                      type="text"
                      value={formData.profile?.headline || ''}
                      onChange={(e) => updateSectionField('profile', 'headline', e.target.value)}
                      placeholder="Associate Data Scientist & Fullstack Developer"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">Status Ketersediaan</label>
                    <input
                      type="text"
                      value={formData.profile?.status || ''}
                      onChange={(e) => updateSectionField('profile', 'status', e.target.value)}
                      placeholder="Terbuka untuk Kolaborasi & Proyek"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">Lokasi Utama</label>
                    <input
                      type="text"
                      value={formData.profile?.location || ''}
                      onChange={(e) => updateSectionField('profile', 'location', e.target.value)}
                      placeholder="Semarang, Jawa Tengah, Indonesia"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Profile Image & Upload */}
                <div className="p-4 rounded-xl bg-[#1c1c1f] border border-gray-800 space-y-3">
                  <label className="block text-xs font-mono text-gray-400">
                    Foto Profil ({uploadingId === 'profileImg' ? 'Mengunggah...' : 'Upload JPG/PNG'})
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {formData.profile?.profileImage && (
                      <img
                        src={formData.profile.profileImage}
                        alt="Profile preview"
                        className="w-20 h-20 rounded-xl object-cover border border-gray-700 shrink-0"
                      />
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          uploadFile(e.target.files[0], 'profileImg', (url) =>
                            updateSectionField('profile', 'profileImage', url)
                          )
                        }
                        className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-blue-600 file:text-white"
                      />
                      <input
                        type="text"
                        value={formData.profile?.profileImage || ''}
                        onChange={(e) => updateSectionField('profile', 'profileImage', e.target.value)}
                        placeholder="Atau masukkan path gambar (/images/...)"
                        className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">Deskripsi Bio Singkat</label>
                  <textarea
                    rows={4}
                    value={formData.profile?.bio || ''}
                    onChange={(e) => updateSectionField('profile', 'bio', e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm leading-relaxed focus:border-blue-500 outline-none"
                  />
                </div>
              </GlassCard>
            )}

            {/* =================================================================
                TAB 2: CONTACT & SOCIALS
            ================================================================= */}
            {activeTab === 'contact' && (
              <GlassCard className="p-5 sm:p-7 space-y-6">
                <div className="border-b border-gray-800 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <span>Informasi Kontak & Media Sosial</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Data ini tampil pada Hero bar, tombol kontak langsung, dan footer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">Email Resmi</label>
                    <input
                      type="email"
                      value={formData.contact?.email || ''}
                      onChange={(e) => updateSectionField('contact', 'email', e.target.value)}
                      placeholder="email@gmail.com"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">Nomor Telepon (Format Tampilan)</label>
                    <input
                      type="text"
                      value={formData.contact?.phone || ''}
                      onChange={(e) => updateSectionField('contact', 'phone', e.target.value)}
                      placeholder="0878-6046-2909"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">
                      Nomor WhatsApp (Angka saja, cth: 6287860462909)
                    </label>
                    <input
                      type="text"
                      value={formData.contact?.whatsapp || ''}
                      onChange={(e) => updateSectionField('contact', 'whatsapp', e.target.value)}
                      placeholder="6287860462909"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">URL GitHub</label>
                    <input
                      type="url"
                      value={formData.contact?.github || ''}
                      onChange={(e) => updateSectionField('contact', 'github', e.target.value)}
                      placeholder="https://github.com/SofyanSaif"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">URL LinkedIn</label>
                    <input
                      type="url"
                      value={formData.contact?.linkedin || ''}
                      onChange={(e) => updateSectionField('contact', 'linkedin', e.target.value)}
                      placeholder="https://www.linkedin.com/in/sofyansaif2214006"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">URL Instagram</label>
                    <input
                      type="url"
                      value={formData.contact?.instagram || ''}
                      onChange={(e) => updateSectionField('contact', 'instagram', e.target.value)}
                      placeholder="https://www.instagram.com/sofyansaif_/"
                      className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </GlassCard>
            )}

            {/* =================================================================
                TAB 3: ABOUT & SKILLS
            ================================================================= */}
            {activeTab === 'about' && (
              <GlassCard className="p-5 sm:p-7 space-y-6">
                <div className="border-b border-gray-800 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    <span>Halaman Tentang & Keahlian</span>
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">Judul Headline Cerita</label>
                  <input
                    type="text"
                    value={formData.about?.headline || ''}
                    onChange={(e) => updateSectionField('about', 'headline', e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">Narasi Lengkap Cerita</label>
                  <textarea
                    rows={6}
                    value={formData.about?.story || ''}
                    onChange={(e) => updateSectionField('about', 'story', e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm leading-relaxed focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Stats Counters */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Statistik Ringkas ({formData.about?.stats?.length || 0})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const currentStats = formData.about?.stats || [];
                        updateSectionField('about', 'stats', [...currentStats, { label: 'Item Baru', value: '0' }]);
                      }}
                      className="text-xs bg-white/5 hover:bg-white/10 text-blue-400 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Stat
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.about?.stats?.map((stat: any, idx: number) => (
                      <div key={idx} className="p-3 bg-[#1c1c1f] border border-gray-800 rounded-xl space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-mono text-gray-500">#{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newStats = formData.about.stats.filter((_: any, i: number) => i !== idx);
                              updateSectionField('about', 'stats', newStats);
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...formData.about.stats];
                            newStats[idx] = { ...newStats[idx], value: e.target.value };
                            updateSectionField('about', 'stats', newStats);
                          }}
                          placeholder="Nilai (e.g. 15+)"
                          className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-2.5 py-1 text-white text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...formData.about.stats];
                            newStats[idx] = { ...newStats[idx], label: e.target.value };
                            updateSectionField('about', 'stats', newStats);
                          }}
                          placeholder="Label (e.g. Sertifikasi Resmi)"
                          className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-2.5 py-1 text-gray-300 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categorized Skills */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Kategori Keahlian ({formData.about?.skills?.length || 0})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const currentSkills = formData.about?.skills || [];
                        updateSectionField('about', 'skills', [
                          ...currentSkills,
                          { category: 'Kategori Baru', items: ['Skill A', 'Skill B'] }
                        ]);
                      }}
                      className="text-xs bg-white/5 hover:bg-white/10 text-blue-400 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Kategori
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.about?.skills?.map((cat: any, idx: number) => (
                      <div key={idx} className="p-4 bg-[#1c1c1f] border border-gray-800 rounded-xl space-y-3">
                        <div className="flex justify-between items-center gap-3">
                          <input
                            type="text"
                            value={cat.category}
                            onChange={(e) => {
                              const newSkills = [...formData.about.skills];
                              newSkills[idx] = { ...newSkills[idx], category: e.target.value };
                              updateSectionField('about', 'skills', newSkills);
                            }}
                            placeholder="Nama Kategori"
                            className="bg-[#18181b] border border-gray-700 rounded-lg px-3 py-1.5 text-white font-medium text-xs sm:text-sm flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSkills = formData.about.skills.filter((_: any, i: number) => i !== idx);
                              updateSectionField('about', 'skills', newSkills);
                            }}
                            className="text-red-400 hover:text-red-300 text-xs p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1 font-mono">
                            Daftar Skill (pisahkan dengan koma):
                          </label>
                          <input
                            type="text"
                            value={cat.items?.join(', ') || ''}
                            onChange={(e) => {
                              const newSkills = [...formData.about.skills];
                              newSkills[idx] = {
                                ...newSkills[idx],
                                items: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                              };
                              updateSectionField('about', 'skills', newSkills);
                            }}
                            placeholder="Python, SQL, React"
                            className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-3 py-1.5 text-gray-300 text-xs font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}

            {/* =================================================================
                TAB 4: EDUCATION
            ================================================================= */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#161619] border border-gray-800 rounded-2xl">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                      <span>Riwayat Pendidikan ({formData.education?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Universitas, sekolah kejuruan, gelar, periode, dan sorotan akademik.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem('education', {
                          id: Date.now(),
                          institution: 'Nama Institusi / Universitas Baru',
                          degree: 'Gelar / Tingkat',
                          field: 'Jurusan / Bidang',
                          period: '2026',
                          location: 'Semarang, Jawa Tengah',
                          gpa: '3.85 / 4.00',
                          description: 'Keterangan fokus studi...',
                          badge: 'Mahasiswa Aktif',
                          highlights: ['Pencapaian atau sorotan']
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Pendidikan</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.education?.map((item: any, idx: number) => {
                    const isExpanded = expandedItems[`education-${idx}`] ?? true;
                    return (
                      <div key={item.id || idx} className="bg-[#161619] border border-gray-800 rounded-2xl overflow-hidden transition-all">
                        {/* Header bar of accordion card */}
                        <div
                          onClick={() => toggleExpand(`education-${idx}`)}
                          className="p-4 flex items-center justify-between gap-3 bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] cursor-pointer select-none border-b border-gray-800/80"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">
                                {item.institution || 'Institusi Tanpa Nama'}
                              </h4>
                              <span className="text-xs text-gray-400 block truncate">
                                {item.degree} • {item.field} ({item.period})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveArrayItem('education', idx, idx - 1)}
                              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                              title="Pindahkan ke atas"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.education.length - 1}
                              onClick={() => moveArrayItem('education', idx, idx + 1)}
                              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                              title="Pindahkan ke bawah"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('education', idx)}
                              className="p-1.5 text-red-400 hover:text-red-300 ml-1"
                              title="Hapus item ini"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleExpand(`education-${idx}`)}
                              className="p-1.5 text-gray-400 hover:text-white ml-1"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Body */}
                        {isExpanded && (
                          <div className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Institusi / Universitas</label>
                                <input
                                  type="text"
                                  value={item.institution}
                                  onChange={(e) => updateArrayItem('education', idx, 'institution', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Gelar (Degree)</label>
                                <input
                                  type="text"
                                  value={item.degree}
                                  onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Jurusan / Bidang</label>
                                <input
                                  type="text"
                                  value={item.field}
                                  onChange={(e) => updateArrayItem('education', idx, 'field', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Periode (Tahun)</label>
                                <input
                                  type="text"
                                  value={item.period}
                                  onChange={(e) => updateArrayItem('education', idx, 'period', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Status Badge</label>
                                <input
                                  type="text"
                                  value={item.badge || ''}
                                  onChange={(e) => updateArrayItem('education', idx, 'badge', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Lokasi</label>
                                <input
                                  type="text"
                                  value={item.location || ''}
                                  onChange={(e) => updateArrayItem('education', idx, 'location', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">IPK / Predikat</label>
                                <input
                                  type="text"
                                  value={item.gpa || ''}
                                  onChange={(e) => updateArrayItem('education', idx, 'gpa', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">Deskripsi Pendidikan</label>
                              <textarea
                                rows={2}
                                value={item.description || ''}
                                onChange={(e) => updateArrayItem('education', idx, 'description', e.target.value)}
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs leading-relaxed"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">
                                Poin Sorotan (Gunakan Enter / baris baru untuk setiap poin)
                              </label>
                              <textarea
                                rows={2}
                                value={item.highlights?.join('\n') || ''}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'education',
                                    idx,
                                    'highlights',
                                    e.target.value.split('\n').filter(Boolean)
                                  )
                                }
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================================
                TAB 5: EXPERIENCE
            ================================================================= */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#161619] border border-gray-800 rounded-2xl">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                      <span>Pengalaman Kerja & Magang ({formData.experience?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Magang, riset machine learning, dan proyek perangkat lunak.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem('experience', {
                          id: Date.now(),
                          role: 'Posisi / Role Baru',
                          company: 'Nama Instansi / Perusahaan',
                          period: '2026',
                          type: 'Internship / Work',
                          location: 'Semarang, Jawa Tengah',
                          description: 'Deskripsi tanggung jawab...',
                          achievements: ['Pencapaian utama'],
                          technologies: ['Tech 1', 'Tech 2']
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Pengalaman</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.experience?.map((item: any, idx: number) => {
                    const isExpanded = expandedItems[`experience-${idx}`] ?? (idx === 0);
                    return (
                      <div key={item.id || idx} className="bg-[#161619] border border-gray-800 rounded-2xl overflow-hidden transition-all">
                        {/* Header bar */}
                        <div
                          onClick={() => toggleExpand(`experience-${idx}`)}
                          className="p-4 flex items-center justify-between gap-3 bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] cursor-pointer select-none border-b border-gray-800/80"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">
                                {item.role} @ <span className="text-blue-400">{item.company}</span>
                              </h4>
                              <span className="text-xs text-gray-400 block truncate">
                                {item.period} • {item.type || 'Experience'} • {item.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveArrayItem('experience', idx, idx - 1)}
                              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                              title="Pindahkan ke atas"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.experience.length - 1}
                              onClick={() => moveArrayItem('experience', idx, idx + 1)}
                              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                              title="Pindahkan ke bawah"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('experience', idx)}
                              className="p-1.5 text-red-400 hover:text-red-300 ml-1"
                              title="Hapus pengalaman ini"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleExpand(`experience-${idx}`)}
                              className="p-1.5 text-gray-400 hover:text-white ml-1"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Content */}
                        {isExpanded && (
                          <div className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Posisi / Role</label>
                                <input
                                  type="text"
                                  value={item.role}
                                  onChange={(e) => updateArrayItem('experience', idx, 'role', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Perusahaan / Instansi</label>
                                <input
                                  type="text"
                                  value={item.company}
                                  onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Periode Waktu</label>
                                <input
                                  type="text"
                                  value={item.period}
                                  onChange={(e) => updateArrayItem('experience', idx, 'period', e.target.value)}
                                  placeholder="2026 - Sekarang"
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Tipe Pekerjaan</label>
                                <input
                                  type="text"
                                  value={item.type || ''}
                                  onChange={(e) => updateArrayItem('experience', idx, 'type', e.target.value)}
                                  placeholder="Internship / Healthcare IT"
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Lokasi</label>
                                <input
                                  type="text"
                                  value={item.location || ''}
                                  onChange={(e) => updateArrayItem('experience', idx, 'location', e.target.value)}
                                  placeholder="Semarang, Jawa Tengah"
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">Deskripsi Pekerjaan</label>
                              <textarea
                                rows={2}
                                value={item.description || ''}
                                onChange={(e) => updateArrayItem('experience', idx, 'description', e.target.value)}
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs leading-relaxed"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">
                                Poin Pencapaian Kunci (Gunakan Enter / baris baru untuk setiap poin)
                              </label>
                              <textarea
                                rows={3}
                                value={item.achievements?.join('\n') || ''}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'experience',
                                    idx,
                                    'achievements',
                                    e.target.value.split('\n').filter(Boolean)
                                  )
                                }
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">
                                Teknologi (pisahkan dengan koma)
                              </label>
                              <input
                                type="text"
                                value={item.technologies?.join(', ') || ''}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'experience',
                                    idx,
                                    'technologies',
                                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                                  )
                                }
                                placeholder="SIMRS, SQL, Network Infrastructure"
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================================
                TAB 6: PROJECTS
            ================================================================= */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#161619] border border-gray-800 rounded-2xl">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-400" />
                      <span>Featured Projects ({formData.projects?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Proyek unggulan, metrik optimasi, dan link GitHub / Live Demo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem('projects', {
                        id: Date.now(),
                        title: 'Judul Proyek Baru',
                        category: 'Web Developer',
                        description: 'Deskripsi proyek ini...',
                        techStack: ['React', 'Next.js', 'Tailwind CSS'],
                        metrics: {
                          label: 'Metrik Optimasi',
                          start: 0,
                          end: 100,
                          suffix: '%'
                        },
                        githubLink: '#',
                        demoLink: ''
                      })
                    }
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Proyek</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.projects?.map((item: any, idx: number) => {
                    const isExpanded = expandedItems[`projects-${idx}`] ?? (idx === 0);
                    return (
                      <div key={item.id || idx} className="bg-[#161619] border border-gray-800 rounded-2xl overflow-hidden transition-all">
                        <div
                          onClick={() => toggleExpand(`projects-${idx}`)}
                          className="p-4 flex items-center justify-between gap-3 bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] cursor-pointer select-none border-b border-gray-800/80"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">
                                {item.title || 'Proyek Tanpa Judul'}
                              </h4>
                              <span className="text-xs text-gray-400 block truncate">
                                {item.category} • {item.techStack?.join(', ')}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveArrayItem('projects', idx, idx - 1)}
                              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                              title="Pindahkan ke atas"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.projects.length - 1}
                              onClick={() => moveArrayItem('projects', idx, idx + 1)}
                              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                              title="Pindahkan ke bawah"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('projects', idx)}
                              className="p-1.5 text-red-400 hover:text-red-300 ml-1"
                              title="Hapus proyek ini"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleExpand(`projects-${idx}`)}
                              className="p-1.5 text-gray-400 hover:text-white ml-1"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Judul Proyek</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => updateArrayItem('projects', idx, 'title', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Kategori</label>
                                <input
                                  type="text"
                                  value={item.category}
                                  onChange={(e) => updateArrayItem('projects', idx, 'category', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">Deskripsi Proyek</label>
                              <textarea
                                rows={3}
                                value={item.description}
                                onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)}
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs leading-relaxed"
                              />
                            </div>

                            <div className="p-3 bg-[#18181b] rounded-xl border border-gray-800 space-y-2">
                              <span className="text-xs text-gray-400 block font-mono">
                                Metrik Optimasi (Opsional)
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                                <input
                                  type="text"
                                  value={item.metrics?.label || ''}
                                  onChange={(e) =>
                                    updateArrayItem('projects', idx, 'metrics', {
                                      ...item.metrics,
                                      label: e.target.value
                                    })
                                  }
                                  placeholder="Label Metrik"
                                  className="bg-[#141416] border border-gray-700 rounded px-2.5 py-1.5 text-white text-xs"
                                />
                                <input
                                  type="number"
                                  step="0.01"
                                  value={item.metrics?.start ?? ''}
                                  onChange={(e) =>
                                    updateArrayItem('projects', idx, 'metrics', {
                                      ...item.metrics,
                                      start: parseFloat(e.target.value) || 0
                                    })
                                  }
                                  placeholder="Nilai Awal (67.33)"
                                  className="bg-[#141416] border border-gray-700 rounded px-2.5 py-1.5 text-white text-xs font-mono"
                                />
                                <input
                                  type="number"
                                  step="0.01"
                                  value={item.metrics?.end ?? ''}
                                  onChange={(e) =>
                                    updateArrayItem('projects', idx, 'metrics', {
                                      ...item.metrics,
                                      end: parseFloat(e.target.value) || 0
                                    })
                                  }
                                  placeholder="Nilai Akhir (75.25)"
                                  className="bg-[#141416] border border-gray-700 rounded px-2.5 py-1.5 text-white text-xs font-mono"
                                />
                                <input
                                  type="text"
                                  value={item.metrics?.suffix || ''}
                                  onChange={(e) =>
                                    updateArrayItem('projects', idx, 'metrics', {
                                      ...item.metrics,
                                      suffix: e.target.value
                                    })
                                  }
                                  placeholder="Akhiran (%)"
                                  className="bg-[#141416] border border-gray-700 rounded px-2.5 py-1.5 text-white text-xs"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">URL GitHub</label>
                                <input
                                  type="text"
                                  value={item.githubLink || ''}
                                  onChange={(e) => updateArrayItem('projects', idx, 'githubLink', e.target.value)}
                                  placeholder="https://github.com/..."
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">URL Live Demo</label>
                                <input
                                  type="text"
                                  value={item.demoLink || ''}
                                  onChange={(e) => updateArrayItem('projects', idx, 'demoLink', e.target.value)}
                                  placeholder="https://..."
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-gray-400 mb-1">
                                Tech Stack (pisahkan dengan koma)
                              </label>
                              <input
                                type="text"
                                value={item.techStack?.join(', ') || ''}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'projects',
                                    idx,
                                    'techStack',
                                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                                  )
                                }
                                placeholder="Python, XGBoost, Scikit-Learn"
                                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================================
                TAB 7: CERTIFICATES (WITH SEARCH FILTER & ACCORDIONS)
            ================================================================= */}
            {activeTab === 'certificates' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#161619] border border-gray-800 rounded-2xl">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <span>Sertifikat & Lisensi ({formData.certificates?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Kelola 16 sertifikat, nomor kredensial, dan link verifikasi.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAllExpanded('certificates', formData.certificates.length, false)}
                      className="px-2.5 py-1.5 rounded-lg border border-gray-700 bg-white/5 hover:bg-white/10 text-[11px] text-gray-300"
                    >
                      Tutup Semua
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllExpanded('certificates', formData.certificates.length, true)}
                      className="px-2.5 py-1.5 rounded-lg border border-gray-700 bg-white/5 hover:bg-white/10 text-[11px] text-gray-300"
                    >
                      Buka Semua
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem('certificates', {
                          id: Date.now(),
                          title: 'Nama Sertifikat Baru',
                          issuer: 'Dicoding Indonesia / BNSP',
                          issueDate: '2026',
                          credentialId: 'CRED-ID',
                          credentialUrl: '#',
                          image: '',
                          category: 'Sertifikasi Keahlian',
                          description: 'Deskripsi kompetensi yang diraih...'
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>

                {/* Search Bar for 16 certificates */}
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari sertifikat (cth: Machine Learning, Dicoding, BNSP)..."
                    className="w-full bg-[#161619] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs sm:text-sm placeholder-gray-500 outline-none focus:border-blue-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-mono"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {formData.certificates
                    ?.map((item: any, idx: number) => ({ item, originalIndex: idx }))
                    ?.filter(({ item }: any) => {
                      if (!searchQuery.trim()) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        item.title?.toLowerCase().includes(q) ||
                        item.issuer?.toLowerCase().includes(q) ||
                        item.category?.toLowerCase().includes(q)
                      );
                    })
                    ?.map(({ item, originalIndex }: any) => {
                      const isExpanded = expandedItems[`certificates-${originalIndex}`] ?? false;
                      return (
                        <div key={item.id || originalIndex} className="bg-[#161619] border border-gray-800 rounded-2xl overflow-hidden transition-all">
                          {/* Accordion Bar Header */}
                          <div
                            onClick={() => toggleExpand(`certificates-${originalIndex}`)}
                            className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] cursor-pointer select-none border-b border-gray-800/80"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                                {originalIndex + 1}
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                  {item.title}
                                </h4>
                                <span className="text-[11px] text-gray-400 block truncate">
                                  {item.issuer} • <span className="text-yellow-400">{item.issueDate}</span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                disabled={originalIndex === 0}
                                onClick={() => moveArrayItem('certificates', originalIndex, originalIndex - 1)}
                                className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                                title="Pindahkan ke atas"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={originalIndex === formData.certificates.length - 1}
                                onClick={() => moveArrayItem('certificates', originalIndex, originalIndex + 1)}
                                className="p-1.5 text-gray-400 hover:text-white disabled:opacity-25"
                                title="Pindahkan ke bawah"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('certificates', originalIndex)}
                                className="p-1.5 text-red-400 hover:text-red-300 ml-1"
                                title="Hapus sertifikat ini"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleExpand(`certificates-${originalIndex}`)}
                                className="p-1.5 text-gray-400 hover:text-white ml-1"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* Accordion Form Body */}
                          {isExpanded && (
                            <div className="p-4 sm:p-6 space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">Judul Sertifikat</label>
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateArrayItem('certificates', originalIndex, 'title', e.target.value)}
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">Penerbit (Issuer)</label>
                                  <input
                                    type="text"
                                    value={item.issuer}
                                    onChange={(e) => updateArrayItem('certificates', originalIndex, 'issuer', e.target.value)}
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-base sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">Tahun / Tanggal Terbit</label>
                                  <input
                                    type="text"
                                    value={item.issueDate}
                                    onChange={(e) => updateArrayItem('certificates', originalIndex, 'issueDate', e.target.value)}
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">Kategori Badge</label>
                                  <input
                                    type="text"
                                    value={item.category || ''}
                                    onChange={(e) => updateArrayItem('certificates', originalIndex, 'category', e.target.value)}
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">Credential ID</label>
                                  <input
                                    type="text"
                                    value={item.credentialId || ''}
                                    onChange={(e) => updateArrayItem('certificates', originalIndex, 'credentialId', e.target.value)}
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">URL Verifikasi Online</label>
                                  <input
                                    type="text"
                                    value={item.credentialUrl || ''}
                                    onChange={(e) => updateArrayItem('certificates', originalIndex, 'credentialUrl', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-mono text-gray-400 mb-1">
                                    Gambar Sertifikat ({uploadingId === `cert-${originalIndex}` ? 'Mengunggah...' : 'Upload File'})
                                  </label>
                                  <div className="flex gap-2 items-center">
                                    <input
                                      type="file"
                                      accept=".jpg,.jpeg,.png,.webp"
                                      onChange={(e) =>
                                        e.target.files?.[0] &&
                                        uploadFile(e.target.files[0], `cert-${originalIndex}`, (url) =>
                                          updateArrayItem('certificates', originalIndex, 'image', url)
                                        )
                                      }
                                      className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-400 file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-2 file:py-0.5"
                                    />
                                    {item.image && (
                                      <img
                                        src={item.image}
                                        alt="Thumbnail"
                                        className="w-10 h-7 object-cover rounded border border-gray-700 shrink-0"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">Keterangan Sertifikat</label>
                                <textarea
                                  rows={2}
                                  value={item.description || ''}
                                  onChange={(e) => updateArrayItem('certificates', originalIndex, 'description', e.target.value)}
                                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs leading-relaxed"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* =================================================================
                TAB 8: TERMINAL PLAYGROUND
            ================================================================= */}
            {activeTab === 'terminal' && (
              <GlassCard className="p-5 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-yellow-400" />
                      <span>Logic Playground Terminal ({formData.terminal?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Perintah kustom yang dapat diketik pengunjung pada terminal interaktif.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('terminal', { command: '', output: '' })}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Command</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.terminal?.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-[#1c1c1f] border border-gray-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-yellow-400">Command #{idx + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveArrayItem('terminal', idx, idx - 1)}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-25"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.terminal.length - 1}
                            onClick={() => moveArrayItem('terminal', idx, idx + 1)}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-25"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('terminal', idx)}
                            className="p-1 text-red-400 hover:text-red-300 ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={item.command}
                        onChange={(e) => updateArrayItem('terminal', idx, 'command', e.target.value)}
                        placeholder="Nama perintah (cth: experience)"
                        className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                      />

                      <textarea
                        rows={3}
                        value={item.output}
                        onChange={(e) => updateArrayItem('terminal', idx, 'output', e.target.value)}
                        placeholder="Output yang tampil di layar..."
                        className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs font-mono leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* =================================================================
                TAB 9: GALLERY
            ================================================================= */}
            {activeTab === 'gallery' && (
              <GlassCard className="p-5 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                      <span>Galeri Foto ({formData.gallery?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Foto dokumentasi kegiatan, traveling, dan hobi.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('gallery', { id: Date.now(), url: '', caption: '' })}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Foto</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.gallery?.map((item: any, idx: number) => (
                    <div key={item.id || idx} className="p-4 bg-[#1c1c1f] border border-gray-800 rounded-xl flex flex-col sm:flex-row gap-4 items-center">
                      {item.url && (
                        <img
                          src={item.url}
                          alt="Thumbnail"
                          className="w-24 h-24 object-cover rounded-xl border border-gray-700 shrink-0"
                        />
                      )}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-400">
                            Foto #{idx + 1} ({uploadingId === `gal-${idx}` ? 'Mengunggah...' : 'Upload JPG/PNG'})
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveArrayItem('gallery', idx, idx - 1)}
                              className="p-1 text-gray-400 hover:text-white disabled:opacity-25"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.gallery.length - 1}
                              onClick={() => moveArrayItem('gallery', idx, idx + 1)}
                              className="p-1 text-gray-400 hover:text-white disabled:opacity-25"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('gallery', idx)}
                              className="p-1 text-red-400 hover:text-red-300 ml-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            uploadFile(e.target.files[0], `gal-${idx}`, (url) =>
                              updateArrayItem('gallery', idx, 'url', url)
                            )
                          }
                          className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-400 file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-2 file:py-0.5"
                        />
                        <input
                          type="text"
                          value={item.caption || ''}
                          onChange={(e) => updateArrayItem('gallery', idx, 'caption', e.target.value)}
                          placeholder="Caption foto..."
                          className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </form>
        </main>
      </div>

      {/* =================================================================
          MOBILE FLOATING SAVE BAR
      ================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161618]/95 backdrop-blur-md border-t border-gray-800 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-xs truncate">
          {hasUnsavedChanges ? (
            <span className="text-amber-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Perubahan belum disimpan
            </span>
          ) : (
            <span className="text-gray-400">Data tersinkronisasi</span>
          )}
        </div>

        <button
          onClick={() => handleSave()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-md text-xs flex items-center gap-1.5 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Data</span>
        </button>
      </div>
    </div>
  );
}
