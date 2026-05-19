import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    // Mengubah file menjadi Buffer agar bisa ditulis ke sistem penyimpanan lokal
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Memberikan nama unik menggunakan timestamp agar tidak ada file yang bertabrakan
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const targetPath = path.join(process.cwd(), 'public', 'images', uniqueFilename);

    // Pastikan folder public/images sudah terbentuk
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    
    // Menulis file ke folder public/images
    fs.writeFileSync(targetPath, buffer);

    // Mengembalikan URL publik gambar baru
    return NextResponse.json({ url: `/images/${uniqueFilename}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengunggah file' }, { status: 500 });
  }
}