import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BarChart3, Users, School, TrendingUp, ArrowUpRight, PieChart } from "lucide-react";

export const metadata = {
  title: "Statistik - SPMB",
  description: "Statistik pendaftaran mahasiswa baru Provinsi Bengkulu 2026.",
};

const STAT_CARDS = [
  { label: "Total Pendaftar", value: "12,450", change: "+12.5%", icon: Users, color: "text-blue-600 bg-blue-100/50 dark:bg-blue-900/30" },
  { label: "Kuota Tersedia", value: "8,200", icon: School, color: "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/30" },
  { label: "Terverifikasi", value: "10,120", change: "+8.2%", icon: TrendingUp, color: "text-amber-600 bg-amber-100/50 dark:bg-amber-900/30" },
];

export default function StatistikPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-jakarta">
      <Navbar />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Home-style Background Patterns */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950 -z-10" />
        <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800 -z-10" />

        <div className="container mx-auto px-6 md:px-8 max-w-6xl pt-36 pb-24 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
               <BarChart3 className="w-3 h-3" />
               Laporan Penerimaan 2026
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.2]">
               Data & Statistik <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">SPMB</span>
             </h1>
             <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
               Visualisasi data pendaftaran yang transparan untuk memantau tren pendaftaran SMK di seluruh Provinsi Bengkulu.
             </p>
          </div>

          {/* Stats Cards - Consistent with Home Page "Quick stats" but expanded */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {STAT_CARDS.map((stat, i) => (
              <div key={i} className="group relative flex flex-col items-start p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} transition-transform group-hover:rotate-6`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl font-black text-gray-900 dark:text-white flex-1">{stat.value}</h3>
                  {stat.change && (
                    <div className="flex items-center gap-0.5 text-emerald-600 text-[10px] font-black bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Charts Layout - Elegant & Simple */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5">
              <div className="flex items-center justify-between mb-10 border-b border-gray-50 dark:border-gray-800 pb-6">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <PieChart className="w-5 h-5 text-blue-600" />
                   Distribusi Pendaftar per Wilayah
                </h3>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update 5 menit lalu</span>
              </div>
              <div className="space-y-8">
                {[
                  { name: "Kota Bengkulu", val: 85, color: "bg-blue-600" },
                  { name: "Bengkulu Utara", val: 62, color: "bg-blue-500" },
                  { name: "Rejang Lebong", val: 48, color: "bg-blue-400" },
                  { name: "Mukomuko", val: 35, color: "bg-blue-300" },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">{item.name}</span>
                      <span className="text-sm font-black text-blue-600">{item.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="bg-gradient-to-br from-gray-900 to-slate-900 dark:from-blue-900/40 dark:to-blue-950/40 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-jakarta">Analisis Jalur</h3>
                    <p className="text-sm text-slate-300 leading-relaxed opacity-90">
                      Jalur Prestasi mencatat lonjakan pendaftar tertinggi sebesar 15% dibandingkan tahun lalu, menunjukkan tingginya minat pada program unggulan.
                    </p>
                  </div>
                  <div className="pt-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="opacity-60 uppercase tracking-widest">Target Pendaftar</span>
                       <span>15,000</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[83%]" />
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
