import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Trophy, Search, ChevronRight, MapPin, School, Filter, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Pemeringkatan - SPMB",
  description: "Hasil pemeringkatan seleksi pendaftaran mahasiswa baru secara real-time.",
};

const MOCK_RANKINGS = [
  { rank: 1, name: "Ahmad Fatih", school: "SMKN 1 Bengkulu", regency: "Kota Bengkulu", score: 94.5, status: "LULUS" },
  { rank: 2, name: "Siti Aminah", school: "SMKN 2 Bengkulu", regency: "Kota Bengkulu", score: 92.8, status: "LULUS" },
  { rank: 3, name: "Rizky Pratama", school: "SMKN 1 Argamakmur", regency: "Bengkulu Utara", score: 91.2, status: "LULUS" },
  { rank: 4, name: "Dewi Sartika", school: "SMKN 3 Bengkulu", regency: "Kota Bengkulu", score: 89.5, status: "CADANGAN" },
  { rank: 5, name: "Budi Santoso", school: "SMKN 1 Rejang Lebong", regency: "Rejang Lebong", score: 88.7, status: "CADANGAN" },
  { rank: 6, name: "Fajri Hidayat", school: "SMKN 4 Bengkulu", regency: "Kota Bengkulu", score: 87.2, status: "TIDAK LULUS" },
  { rank: 7, name: "Luthfi Ramadhan", school: "SMKN 1 Kepahiang", regency: "Kepahiang", score: 86.5, status: "TIDAK LULUS" },
];

export default function PemeringkatanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-jakarta">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Home-style Background Patterns */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 -z-10" />

        <div className="container mx-auto px-6 md:px-8 max-w-6xl pt-36 pb-24">
          {/* Section Header */}
          <div className="text-center md:text-left space-y-4 mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
               <Trophy className="w-3 h-3" />
               Hasil Seleksi Real-time
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.2]">
               Pemeringkatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Pendaftar</span>
             </h1>
             <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
               Informasi posisi seleksi pendaftaran berdasarkan akumulasi skor dan kuota sekolah tujuan.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Filter - Glass Styled */}
            <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-32 order-2 lg:order-1">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-7 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-widest leading-none mt-0.5">Filter Data</h2>
                </div>

                <div className="space-y-6">
                  {/* Search Input Styling from Main App */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pencarian</label>
                    <div className="relative group">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      <input 
                        type="text"
                        placeholder="Cari nama..."
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Select Styling from Main App */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kabupaten / Kota</label>
                    <select className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl py-3 px-4 text-xs font-semibold focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all dark:text-white outline-none cursor-pointer">
                      <option>Seluruh Wilayah</option>
                      <option>Kota Bengkulu</option>
                      <option>Bengkulu Utara</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SMK Tujuan</label>
                    <select className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl py-3 px-4 text-xs font-semibold focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:outline-none transition-all dark:text-white outline-none cursor-pointer">
                      <option>Seluruh Sekolah</option>
                      <option>SMKN 1 Bengkulu</option>
                      <option>SMKN 2 Bengkulu</option>
                    </select>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400 font-bold text-xs rounded-xl border border-gray-200 dark:border-gray-700 transition-all active:scale-[0.98]">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Semua
                  </button>
                </div>
              </div>

              {/* Status Info Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                <h3 className="text-sm font-bold mb-2">Informasi Seleksi</h3>
                <p className="text-[11px] leading-relaxed opacity-85 text-blue-50 pr-2 italic">
                  "Data pemeringkatan ini bersifat dinamis dan dapat berubah sewaktu-waktu sesuai masuknya pendaftar baru."
                </p>
              </div>
            </aside>

            {/* Data Content - Grid Styling consistent with "Steps" */}
            <div className="lg:col-span-9 order-1 lg:order-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[750px]">
                    <thead>
                      <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800/50">
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Rank</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Nama Pendaftar</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status Hasil</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Skor Seleksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/30">
                      {MOCK_RANKINGS.map((item) => (
                        <tr key={item.rank} className="group hover:bg-gray-50/70 dark:hover:bg-gray-800/20 transition-all duration-300">
                          <td className="px-8 py-6">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-transform group-hover:rotate-6 ${
                              item.rank <= 3 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                            }`}>
                              {item.rank}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-gray-900 dark:text-white transition-colors group-hover:text-blue-600">
                                {item.name}
                              </span>
                              <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1">
                                  <School className="w-3 h-3" />
                                  {item.school}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.regency}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                              item.status === 'LULUS' ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600' :
                              item.status === 'CADANGAN' ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-600' :
                              'bg-red-50 dark:bg-red-900/10 text-red-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                item.status === 'LULUS' ? 'bg-emerald-500' : 
                                item.status === 'CADANGAN' ? 'bg-amber-500' : 'bg-red-500'
                              }`} />
                              {item.status}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex flex-col items-end">
                                <span className="text-xl font-black text-gray-900 dark:text-white font-jakarta">
                                  {item.score}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase opacity-60">Verified Admin</span>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Styling matching the Navbar active state */}
                <div className="p-8 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Page 1 / 15</span>
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-400 border border-gray-200 dark:border-gray-700 cursor-not-allowed">
                       <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <div className="flex items-center gap-1.5 px-1.5 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                      {[1, 2, 3].map(i => (
                        <button key={i} className={`h-8 w-8 rounded-full text-xs font-bold transition-all ${
                          i === 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-gray-500 hover:text-blue-600'
                        }`}>
                          {i}
                        </button>
                      ))}
                    </div>
                    <button className="p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95">
                       <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
