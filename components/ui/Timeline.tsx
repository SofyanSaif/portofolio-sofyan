'use client';

export default function Timeline({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="relative border-l-2 border-gray-800 ml-3 md:ml-6">
      {data.map((item, index) => {
        // Cek apakah item ini adalah pencapaian spesial
        const isHighlight = item.highlight === true;

        return (
          <div key={item.id || index} className="mb-10 ml-8 relative group">
            {/* Titik Timeline (Bulatan di garis) */}
            <span 
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-[49px] ring-4 ring-[#0D1117] transition-all duration-300 ${
                isHighlight 
                  ? 'bg-yellow-500/20 text-yellow-500 ring-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                  : 'bg-blue-900/50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white'
              }`}
            >
              {isHighlight ? (
                // Ikon Piala Emas untuk Highlight
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a4.5 4.5 0 013.196 1.42 1.5 1.5 0 011.054.43.75.75 0 010 1.06c-.252.252-.577.41-.926.444A5.972 5.972 0 0113.5 12h-7a5.972 5.972 0 01-.574-4.396 1.5 1.5 0 01-.926-.444.75.75 0 010-1.06 1.5 1.5 0 011.054-.43 4.5 4.5 0 013.196-1.42v-1.5A.75.75 0 0110 2zM7.5 13.5a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z" clipRule="evenodd" />
                </svg>
              ) : (
                // Ikon Titik Biasa
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="5" />
                </svg>
              )}
            </span>

            {/* Kotak Konten Timeline */}
            <div 
              className={`p-6 rounded-2xl transition-all duration-500 ${
                isHighlight
                  ? 'bg-gradient-to-br from-yellow-900/20 to-gray-900/50 border border-yellow-700/50 shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:border-yellow-500/50'
                  : 'bg-gray-900/40 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/40'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className={`text-xl font-bold ${isHighlight ? 'text-yellow-400' : 'text-white'}`}>
                  {item.title}
                </h3>
                <span className={`text-sm font-mono px-3 py-1 rounded-full w-fit ${
                  isHighlight ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {item.year}
                </span>
              </div>
              
              <h4 className="text-gray-400 font-medium mb-3">{item.subtitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                
                {/* GAMBAR BUKTI (Jika ada) */}
                {item.image && (
                  <div className="mt-4 relative rounded-xl overflow-hidden border border-gray-800 group/img">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto max-h-64 object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">Bukti Dokumentasi</span>
                    </div>
                  </div>
                )}
              {/* Render Activities and Societies jika ada */}
              {item.activities && item.activities.length > 0 && (
                <div className={`mt-4 pt-4 border-t ${isHighlight ? 'border-yellow-900/50' : 'border-gray-800'}`}>
                  <ul className="space-y-2">
                    {item.activities.map((activity: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className={`mt-1 ${isHighlight ? 'text-yellow-500' : 'text-blue-500'}`}>▹</span>
                        <span className={isHighlight ? 'font-semibold text-yellow-100' : ''}>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}