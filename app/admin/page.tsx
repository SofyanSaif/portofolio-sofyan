'use client';
import { useState, useEffect } from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [formData, setFormData] = useState<any>(null);
  const [status, setStatus] = useState({ loading: true, message: '', error: false });
  const [uploadingIndex, setUploadingIndex] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setStatus({ loading: false, message: '', error: false });
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin2026') setIsAuthenticated(true);
    else alert('Akses Ditolak: Kata sandi salah!');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  // --- LOGIKA CERDAS: FILE UPLOAD HANDLER ---
  const uploadFile = async (file: File, uploadId: string, callback: (url: string) => void) => {
    setUploadingIndex(uploadId);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const resData = await res.json();
      if (res.ok) {
        callback(resData.url);
      } else {
        alert('Gagal mengunggah gambar');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi saat mengunggah');
    } finally {
      setUploadingIndex(null);
    }
  };

  const updateArrayItem = (arrayName: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: string, defaultItem: any) => {
    setFormData((prev: any) => ({ ...prev, [arrayName]: [...prev[arrayName], defaultItem] }));
  };

  const removeArrayItem = (arrayName: string, indexToRemove: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_: any, idx: number) => idx !== indexToRemove)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: false, message: 'Menyimpan data...', error: false });
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus({ loading: false, message: '✅ Perubahan Berhasil Disimpan!', error: false });
        setTimeout(() => setStatus({ loading: false, message: '', error: false }), 3000);
      }
    } catch (error) {
      setStatus({ loading: false, message: '❌ Gagal menyimpan data.', error: true });
    }
  };

  if (status.loading) return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-400">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
        <GlassCard className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-white text-center mb-6">🔒 Admin Area</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Masukkan Kata Sandi" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500" />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg">Masuk</button>
          </form>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] text-gray-200 font-sans py-12 pb-32">
      <SectionContainer>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">⚙️ Ultimate Control Panel</h1>
          <div className="flex gap-4">
            <a href="/" target="_blank" className="text-blue-400 text-sm hover:text-blue-300">Lihat Web Utama ↗</a>
            <button onClick={() => setIsAuthenticated(false)} className="text-red-400 text-sm hover:text-red-300">Logout</button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* 1. SECTION: HERO & PROFILE */}
          <GlassCard>
            <h3 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-4">1. Pengaturan Hero & Profil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nama Tampilan</label>
                <input type="text" name="name" value={formData.profile.name} onChange={handleProfileChange} className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Foto Profil ({uploadingIndex === 'profileImage' ? 'Mengunggah...' : 'Upload JPG/PNG'})</label>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], 'profileImage', (url) => setFormData((prev: any) => ({ ...prev, profile: { ...prev.profile, profileImage: url } })))} className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-1.5 text-sm text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Deskripsi Bio</label>
              <textarea name="bio" rows={3} value={formData.profile.bio} onChange={handleProfileChange} className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </GlassCard>

          {/* 2. SECTION: LOGIC PLAYGROUND */}
          <GlassCard>
            <h3 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-4">2. Logic Playground (Terminal)</h3>
            {formData.terminal?.map((item: any, idx: number) => (
              <div key={idx} className="bg-gray-800/30 p-4 rounded-lg mb-4 border border-gray-700/50">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-gray-400">Command #{idx + 1}</span>
                  <button type="button" onClick={() => removeArrayItem('terminal', idx)} className="text-red-400 text-xs hover:underline">Hapus</button>
                </div>
                <input type="text" value={item.command} onChange={(e) => updateArrayItem('terminal', idx, 'command', e.target.value)} placeholder="Perintah terminal" className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-2 text-white mb-2 font-mono text-sm" />
                <textarea value={item.output} onChange={(e) => updateArrayItem('terminal', idx, 'output', e.target.value)} placeholder="Output respon" rows={2} className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm" />
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('terminal', { command: '', output: '' })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">+ Tambah Command</button>
          </GlassCard>

          {/* 3. SECTION: PROJECTS */}
          <GlassCard>
            <h3 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-4">3. Featured Projects</h3>
            {formData.projects?.map((item: any, idx: number) => (
              <div key={idx} className="bg-gray-800/30 p-4 rounded-lg mb-4 border border-gray-700/50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-gray-400">Proyek #{idx + 1}</span>
                  <button type="button" onClick={() => removeArrayItem('projects', idx)} className="text-red-400 text-xs hover:underline">Hapus</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" value={item.title} onChange={(e) => updateArrayItem('projects', idx, 'title', e.target.value)} placeholder="Judul" className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                  <input type="text" value={item.category} onChange={(e) => updateArrayItem('projects', idx, 'category', e.target.value)} placeholder="Kategori" className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                </div>
                <textarea value={item.description} onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)} placeholder="Deskripsi" rows={2} className="w-full bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input type="text" value={item.metrics} onChange={(e) => updateArrayItem('projects', idx, 'metrics', e.target.value)} placeholder="Metrik Keberhasilan" className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                   <input type="text" value={item.techStack.join(', ')} onChange={(e) => updateArrayItem('projects', idx, 'techStack', e.target.value.split(',').map(s=>s.trim()))} placeholder="Tech Stack (pisahkan dengan koma)" className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('projects', { id: Date.now(), title: '', category: '', description: '', metrics: '', techStack: [], githubLink: '#' })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">+ Tambah Proyek</button>
          </GlassCard>

          {/* 4. SECTION: TIMELINE WITH NATIVE DATE & UPLOAD */}
          <GlassCard>
            <h3 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-4">4. Riwayat & Pencapaian</h3>
            {formData.timeline?.map((item: any, idx: number) => (
              <div key={idx} className="bg-gray-800/30 p-4 rounded-lg mb-4 border border-gray-700/50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-gray-400">Riwayat #{idx + 1}</span>
                  <button type="button" onClick={() => removeArrayItem('timeline', idx)} className="text-red-400 text-xs hover:underline">Hapus</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* UPDATE: Menggunakan INPUT TYPE DATE */}
                  <input type="date" value={item.date} onChange={(e) => updateArrayItem('timeline', idx, 'date', e.target.value)} className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                  <input type="text" value={item.title} onChange={(e) => updateArrayItem('timeline', idx, 'title', e.target.value)} placeholder="Judul Pencapaian" className="md:col-span-2 bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                </div>
                <textarea value={item.description} onChange={(e) => updateArrayItem('timeline', idx, 'description', e.target.value)} placeholder="Deskripsi Riwayat" rows={2} className="w-full bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* UPDATE: Direct Upload untuk gambar riwayat */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Gambar Lampiran ({uploadingIndex === `tl-${idx}` ? 'Mengunggah...' : 'Upload File'})</label>
                    <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], `tl-${idx}`, (url) => updateArrayItem('timeline', idx, 'image', url))} className="w-full bg-[#1e1e1e] border border-gray-700 rounded px-2 py-1 text-xs text-gray-400 file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-2 file:py-0.5" />
                  </div>
                  <label className="flex items-center gap-2 text-gray-400 text-sm mt-4 cursor-pointer">
                    <input type="checkbox" checked={item.isHighlight} onChange={(e) => updateArrayItem('timeline', idx, 'isHighlight', e.target.checked)} className="w-4 h-4 accent-blue-500" />
                    Aktifkan Highlight Efek Menyala
                  </label>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('timeline', { id: Date.now(), date: '', title: '', description: '', image: '', isHighlight: false })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">+ Tambah Riwayat</button>
          </GlassCard>

          {/* 5. SECTION: GALLERY WITH UPLOAD */}
          <GlassCard>
            <h3 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-4">5. Galeri (Life Outside Code)</h3>
            {formData.gallery?.map((item: any, idx: number) => (
              <div key={idx} className="bg-gray-800/20 p-3 rounded-lg border border-gray-700/30 flex flex-col md:flex-row gap-4 items-center mb-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-xs text-gray-400 mb-1">Foto ({uploadingIndex === `gal-${idx}` ? 'Mengunggah...' : 'Upload'})</label>
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], `gal-${idx}`, (url) => updateArrayItem('gallery', idx, 'url', url))} className="w-full bg-[#1e1e1e] border border-gray-700 rounded px-2 py-1 text-xs text-white file:bg-blue-600 file:text-white file:border-0 file:rounded" />
                </div>
                <input type="text" value={item.caption} onChange={(e) => updateArrayItem('gallery', idx, 'caption', e.target.value)} placeholder="Caption Gambar" className="w-full md:w-1/2 bg-[#1e1e1e] border border-gray-700 rounded px-3 py-2 text-white text-sm mt-4 md:mt-0" />
                <button type="button" onClick={() => removeArrayItem('gallery', idx)} className="bg-red-950/40 hover:bg-red-900 text-red-400 px-3 py-2 rounded-lg text-xs w-full md:w-auto mt-4 md:mt-0">Hapus</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('gallery', { id: Date.now(), url: '', caption: '' })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">+ Tambah Foto Galeri</button>
          </GlassCard>

          {/* --- FINISHING: FLOATING ACTIONS BAR (GLASSMORPHISM WIDGET) --- */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#1a1a1a]/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-fade-in">
            {status.message && (
              <div className={`text-xs font-bold px-3 py-2 rounded-xl border ${status.error ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                {status.message}
              </div>
            )}
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all transform hover:scale-105 text-sm flex items-center gap-2">
              💾 Simpan Perubahan
            </button>
          </div>

        </form>
      </SectionContainer>
    </main>
  );
}