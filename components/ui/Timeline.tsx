import React from 'react';

interface TimelineItem {
  id: number;
  date: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  isHighlight?: boolean;
}

// Fungsi pembantu untuk mengubah format YYYY-MM-DD menjadi format teks yang indah
const formatIndonesianDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback jika format teks manual lama masih ada
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-gray-700 ml-4 md:ml-8 space-y-12 py-4">
      {items.map((item) => (
        <div key={item.id} className="relative pl-6 md:pl-8">
          <span className={`absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-4 border-[#121212] transition-all duration-300
            ${item.isHighlight 
              ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse' 
              : 'bg-gray-600'
            }`} 
          />
          
          {/* Format Tanggal Otomatis yang rapi */}
          <span className="inline-block px-3 py-1 bg-gray-800/80 rounded-md text-xs font-bold text-blue-400 mb-2 border border-gray-700">
            {formatIndonesianDate(item.date)}
          </span>
          
          <h4 className={`text-xl font-bold mt-1 ${item.isHighlight ? 'text-white' : 'text-gray-300'}`}>
            {item.title}
          </h4>
          <p className="text-gray-400 mt-2 max-w-xl">{item.description}</p>
          
          {item.image && (
             <div className="mt-4 overflow-hidden rounded-xl border border-gray-700/50 max-w-sm bg-white/5">
                <img src={item.image} alt={item.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
             </div>
          )}
        </div>
      ))}
    </div>
  );
}