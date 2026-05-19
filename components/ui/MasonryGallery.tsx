import React from 'react';

interface GalleryItem {
  id: number;
  url: string;
  caption: string;
}

export default function MasonryGallery({ images }: { images: GalleryItem[] }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {images.map((img) => (
        <div 
          key={img.id} 
          className="break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 relative group"
        >
          {/* Kita gunakan tag img standar untuk demonstrasi, bisa diganti <Image> Next.js nanti */}
          <img 
            src={img.url} 
            alt={img.caption}
            className="w-full object-cover filter grayscale contrast-125 transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm text-white font-medium">{img.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}