import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Mendapatkan jalur file JSON data
const dataPath = path.join(process.cwd(), 'data', 'portfolioData.json');

// API untuk mengambil data
export async function GET() {
  try {
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membaca data dari file lokal' }, { status: 500 });
  }
}

// =================================================================
// Fungsi POST: Untuk MENULIS/MENGUBAH data (Dipanggil oleh Admin/Thunder Client)
// =================================================================
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    // Tulis ulang file JSON dengan data yang baru (format rapi)
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Data portofolio berhasil diupdate!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan data ke server lokal' }, { status: 500 });
  }
}