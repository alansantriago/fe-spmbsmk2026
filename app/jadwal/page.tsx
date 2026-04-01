"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const JADWAL_DATA = {
  afirmasi: [
    { num: "01", event: "Sosialisasi & Pengumuman", date: "Maret 2026", desc: "Informasi resmi persyaratan tahap afirmasi.", status: "selesai" },
    { num: "02", event: "Pendaftaran & Verifikasi", date: "April 2026", desc: "Unggah dokumen pendukung (KIP/PKH).", status: "berlangsung" },
    { num: "03", event: "Pengumuman Hasil Tahap 1", date: "Mei 2026", desc: "Hasil seleksi tahap afirmasi.", status: "mendatang" },
  ],
  prestasi: [
    { num: "01", event: "Pendaftaran Online", date: "Mei 2026", desc: "Pengisian nilai raport & sertifikat prestasi.", status: "mendatang" },
    { num: "02", event: "Verifikasi Berkas Fisik", date: "Juni 2026", desc: "Validasi dokumen asli di sekolah tujuan.", status: "mendatang" },
    { num: "03", event: "Tes Kompetensi Keahlian", date: "Juni 2026", desc: "Pelaksanaan tes praktik peminatan.", status: "mendatang" },
  ],
  zonasi: [
    { num: "01", event: "Pendaftaran Tahap 2", date: "Juni 2026", desc: "Pendaftaran berdasarkan jarak koordinat rumah.", status: "mendatang" },
    { num: "02", event: "Pemetaan & Reranking", date: "Juni 2026", desc: "Proses seleksi otomatis berdasarkan sistem zonasi.", status: "mendatang" },
    { num: "03", event: "Pengumuman Hasil Akhir", date: "Juli 2026", desc: "Keputusan final penerimaan seluruh jalur.", status: "mendatang" },
  ],
};

const tracks = [
  { id: "afirmasi", label: "Afirmasi & Prestasi Lomba" },
  { id: "prestasi", label: "Jalur Nilai Raport" },
  { id: "zonasi", label: "Jalur Zonasi & Pindah Tugas" },
];

export default function JadwalPage() {
  const [activeTrack, setActiveTrack] = useState<keyof typeof JADWAL_DATA>("afirmasi");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-jakarta">
      <Navbar />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Home-style Background Patterns */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 -z-10" />

        <div className="container mx-auto px-6 md:px-8 max-w-6xl pt-36 pb-24 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
               <Calendar className="w-3 h-3" />
               Agenda Resmi 2026/2027
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.2]">
               Penjadwalan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Multijalur</span>
             </h1>
             <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
               Pantau setiap tahapan seleksi sesuai dengan jalur pendaftaran yang Anda pilih.
             </p>
          </div>

          {/* Pathway Tabs - Elegant Glass Design */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 p-2 bg-white/50 backdrop-blur-sm dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 max-w-3xl mx-auto">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id as keyof typeof JADWAL_DATA)}
                className={`px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTrack === track.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>

          {/* Timeline UI - Matching the "Steps" Home Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {JADWAL_DATA[activeTrack].map((item, index) => (
                <div key={item.num} className="group relative">
                  {/* Connector line for desktop - consistent with Steps.tsx */}
                  {index < JADWAL_DATA[activeTrack].length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%_-_12px)] w-[calc(100%_-_40px)] h-px bg-gradient-to-r from-blue-300 to-blue-100 dark:from-blue-700 dark:to-blue-900 z-0" />
                  )}

                  <div className={`relative z-10 flex flex-col rounded-2xl bg-white dark:bg-gray-900 p-8 h-full border transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 ${
                    item.status === 'berlangsung' 
                      ? "border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-600/10 ring-4 ring-blue-600/5 scale-[1.02]" 
                      : "border-gray-100 dark:border-gray-800"
                  }`}>
                    <div className="flex items-center justify-between mb-8">
                       <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-black text-sm shadow-md ${
                         item.status === 'selesai' ? 'bg-emerald-500 text-white' :
                         item.status === 'berlangsung' ? 'bg-blue-600 text-white shadow-blue-600/20 animate-pulse' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                       }`}>
                         {item.num}
                       </div>
                       {item.status === 'berlangsung' ? (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[9px] font-black tracking-widest uppercase">
                             <Clock className="w-3 h-3" /> Aktif
                          </div>
                       ) : item.status === 'selesai' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                       ) : null}
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${
                          item.status === 'berlangsung' ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {item.date}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                          {item.event}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 opacity-80 font-medium">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800">
                      <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-all">
                        Detail Kegiatan <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Sticky Notification Bar */}
          <div className="mt-24 p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center shrink-0">
                   <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-1">
                   <h4 className="text-lg font-bold text-gray-900 dark:text-white">Peringatan Tahapan</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                     Jangan sampai melewatkan hari pendaftaran. Aktifkan integrasi kalender untuk mendapatkan notifikasi otomatis.
                   </p>
                </div>
             </div>
             <button className="px-8 py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all hover:bg-gray-800 active:scale-95 whitespace-nowrap shadow-xl shadow-blue-600/10">
                Sinkronkan Kalender
             </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
