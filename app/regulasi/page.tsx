import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Download, ShieldCheck, ChevronRight, Gavel, Scale } from "lucide-react";

export const metadata = {
  title: "Regulasi - SPMB",
  description: "Daftar regulasi dan dokumen resmi pendaftaran mahasiswa baru Provinsi Bengkulu 2026.",
};

const REGULATIONS = [
  { title: "Pergub No. 12 Tahun 2026", desc: "Peraturan Gubernur tentang Juknis Penerimaan Peserta Didik Baru.", size: "2.4 MB", type: "PDF" },
  { title: "Keputusan Kadisdik 2026", desc: "Penetapan Wilayah Zonasi dan Kuota Sekolah SMK Negeri.", size: "1.8 MB", type: "PDF" },
  { title: "Pakta Integritas Pendaftar", desc: "Format pernyataan kebenaran data dan dokumen pendaftaran.", size: "450 KB", type: "DOCX" },
  { title: "Panduan Pendaftaran Online", desc: "Tutorial lengkap pengisian data pada portal SPMB.", size: "5.2 MB", type: "PDF" },
];

export default function RegulasiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-jakarta">
      <Navbar />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Home-style Background Patterns */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950 -z-10" />
        <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800 -z-10" />

        <div className="container mx-auto px-6 md:px-8 max-w-6xl pt-36 pb-24 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-20">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Gavel className="w-3 h-3" />
                Landasan Hukum SPMB
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.2]">
                Regulasi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Kebijakan</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                Kumpulan dokumen resmi, peraturan gubernur, dan panduan teknis yang menjadi dasar pelaksanaan penerimaan mahasiswa baru.
              </p>
            </div>
            {/* Visual Glass Card consistent with Home Page */}
            <div className="w-64 h-64 relative hidden lg:block">
               <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-6 opacity-10 blur-2xl" />
               <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-900/5 flex flex-col items-center justify-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-blue-100/50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Transparansi Data Terjamin</p>
               </div>
            </div>
          </div>

          {/* Regulations Grid - Consistent with Home Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {REGULATIONS.map((item, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-900/50"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-[10px] font-black tracking-widest text-gray-400 rounded-lg uppercase">
                    {item.type}
                  </span>
                </div>
                
                <div className="space-y-3 flex-1 mb-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ukuran: {item.size}</span>
                  <button className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-all">
                    Unduh Berkas <Download className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Helpdesk Strip - Consistent with main page CTA sections */}
          <div className="p-1.5 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-900/5 overflow-hidden">
             <div className="p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Butuh Bantuan Lainnya?</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xl leading-relaxed">
                    Jika Anda mengalami kendala teknis saat mengunduh dokumen regulasi, silakan hubungi pusat bantuan atau kunjungi kantor Dinas Pendidikan terdekat.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                   <button className="px-8 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                     Hubungi Helpdesk <ChevronRight className="w-4 h-4" />
                   </button>
                   <button className="px-8 py-4 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                     <Scale className="w-4 h-4" /> Kanal Aduan
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
