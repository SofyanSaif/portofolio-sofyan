import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sofyan Saif | Fullstack Developer & Machine Learning Engineer",
  description: "Portofolio profesional Sofyan Saif - Fullstack Web Developer & Machine Learning Engineer. Pendidikan, Pengalaman, Karya Proyek, dan Sertifikasi Terverifikasi.",
  keywords: ["Sofyan Saif", "Portfolio", "Fullstack Developer", "Machine Learning", "Teknik Informatika", "UDINUS", "React", "Next.js", "Laravel"],
  authors: [{ name: "Sofyan Saif" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#121212] text-gray-200">{children}</body>
    </html>
  );
}
