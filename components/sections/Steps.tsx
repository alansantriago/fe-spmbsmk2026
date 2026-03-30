"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Registrasi Akun",
    description:
      "Buat akun menggunakan alamat surel aktif untuk mendapatkan akses penuh ke sistem pendaftaran.",
  },
  {
    num: "02",
    title: "Kelengkapan Data",
    description:
      "Lengkapi identitas, asal sekolah, serta unggah seluruh dokumen administrasi yang dipersyaratkan.",
  },
  {
    num: "03",
    title: "Pemilihan Program Keahlian",
    description:
      "Tentukan maksimal 3 pilihan kompetensi keahlian sesuai minat dan kualifikasi akademik Anda.",
  },
  {
    num: "04",
    title: "Verifikasi & Konfirmasi",
    description:
      "Pastikan seluruh data sudah terunggah. Simpan nomor pendaftaran dan tunggu hasil seleksi.",
  },
];

export function Steps() {
  return (
    <section id="alur" className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Prosedur
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Alur Pendaftaran
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Ikuti empat tahapan sederhana berikut untuk menyelesaikan proses
            pendaftaran Anda dengan lancar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%_-_12px)] w-[calc(100%_-_40px)] h-px bg-gradient-to-r from-blue-300 to-blue-100 dark:from-blue-700 dark:to-blue-900 z-0" />
              )}

              <div className="relative z-10 flex flex-col rounded-2xl bg-white dark:bg-gray-900 p-7 h-full border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900/50">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-600/20">
                    {step.num}
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
