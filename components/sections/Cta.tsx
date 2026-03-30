"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative overflow-hidden py-24 bg-blue-600 dark:bg-blue-900">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden leading-none z-0 mix-blend-overlay opacity-30">
        <svg fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 w-full h-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-white"
          >
            Siap Memulai Perjalananmu?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blue-100 max-w-[600px]"
          >
            Bergabunglah bersama ribuan mahasiswa lainnya dan jadilah bagian dari agen perubahan untuk masa depan bangsa.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <Link
              href="/register"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-white px-8 md:px-10 text-base font-bold text-blue-600 shadow-xl shadow-blue-900/20 transition-all hover:bg-gray-50 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              Daftar Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
