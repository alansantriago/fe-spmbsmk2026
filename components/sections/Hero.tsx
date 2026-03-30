"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300"
          >
            Penerimaan Mahasiswa Baru 2026 Dibuka
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            Wujudkan Masa Depanmu <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-500">Bersama Kami</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400 md:text-xl/relaxed"
          >
            Daftar sekarang melalui sistem SPMB yang cepat, mudah, dan transparan.
            Raih kesempatan belajar di lingkungan akademik terbaik.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
            >
              Daftar Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#alur"
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-8 text-base font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            >
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>
        </div>

        {/* Hero Image/Illustration (using a styled div structure as a placeholder for a polished look) */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.4 }}
           className="mt-16 mx-auto max-w-5xl rounded-2xl md:rounded-[32px] overflow-hidden border border-gray-200/50 bg-white/50 shadow-2xl shadow-blue-900/5 dark:border-gray-800/50 dark:bg-gray-900/50 dark:shadow-blue-900/20 backdrop-blur-sm p-2 md:p-4"
        >
          <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl md:rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-900/20 mix-blend-multiply dark:mix-blend-overlay" />
             {/* Decorative abstract elements */}
             <div className="absolute top-1/2 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2" />
             <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/4" />
             
             <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-white/80 dark:bg-black/80 shadow-lg backdrop-blur-md flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-3xl font-bold">🎓</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Kampus Merdeka
                </h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center max-w-md px-4">
                  Sistem Informasi Administrasi dan Pendaftaran Mahasiswa Baru yang terintegrasi.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
