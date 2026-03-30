"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-8 py-16 md:py-20 text-center shadow-2xl shadow-blue-900/20 dark:shadow-blue-900/40"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.04),transparent)]" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
              Jangan Lewatkan Kesempatan Ini
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Siap Bergabung?
            </h2>
            <p className="text-base md:text-lg text-blue-100/80 leading-relaxed max-w-lg mx-auto">
              Daftarkan diri Anda sekarang dan jadilah bagian dari
              generasi unggul SMK Provinsi Bengkulu tahun ajaran 2026.
            </p>
            <div className="pt-4">
              <Link
                href="/register"
                className="group inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                Mulai Pendaftaran
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
