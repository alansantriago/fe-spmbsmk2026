"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      <div className="container mx-auto mt-20 px-6 md:px-8 max-w-6xl z-10 py-32 lg:py-0">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Left Column: Content — 3 of 5 cols */}
          <div className="lg:col-span-3 flex flex-col items-start text-left space-y-7">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400">
                Selamat Datang di
              </p>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] text-gray-900 dark:text-white">
                SPMB SMK{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-500">
                  Provinsi Bengkulu
                </span>
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-gray-400 dark:text-gray-500">
                Tahun Ajaran 2026
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg"
            >
              Sistem penerimaan peserta didik baru yang memudahkan proses
              pendaftaran secara profesional, transparan, dan terintegrasi
              bagi seluruh SMK di Provinsi Bengkulu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
            >
              <Link
                href="/register"
                className="group inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-7 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Mulai Pendaftaran
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#alur"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm px-7 text-sm font-semibold text-gray-700 transition-all hover:bg-white hover:border-gray-300 focus-visible:outline-none dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Lihat Prosedur
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>

            {/* Quick stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-8 pt-6 border-t border-gray-200/70 dark:border-gray-800"
            >
              {[
                { val: "50+", label: "SMK Terintegrasi" },
                { val: "12K+", label: "Pendaftar" },
                { val: "98%", label: "Kepuasan" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.val}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Carousel — 2 of 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 relative h-[400px] lg:h-[560px] w-full"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/10 dark:to-blue-600/5 blur-xl" />

            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 dark:shadow-black/30 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Carousel indicators */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                      ? "w-7 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/60"
                      }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
