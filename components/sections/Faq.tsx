"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Kapan periode pendaftaran dibuka dan ditutup?",
    answer:
      "Pendaftaran Gelombang 1 dibuka mulai 1 Maret hingga 30 April 2026. Gelombang 2 akan diumumkan lebih lanjut melalui portal resmi dan email pendaftar.",
  },
  {
    question: "Apa saja persyaratan dokumen pendaftaran?",
    answer:
      "Dokumen utama meliputi: scan Ijazah/SKL legalisir, Kartu Keluarga, KTP/Kartu Pelajar, pas foto berwarna terbaru, serta transkrip nilai semester 1–5 (khusus jalur prestasi).",
  },
  {
    question: "Apakah pendaftaran dikenakan biaya administrasi?",
    answer:
      "Pendaftaran SPMB SMK Provinsi Bengkulu tidak dipungut biaya apa pun. Seluruh proses seleksi bersifat gratis dan transparan.",
  },
  {
    question: "Bagaimana cara mengecek status kelulusan?",
    answer:
      "Hasil seleksi akan dipublikasikan langsung di dasbor personal Anda. Login menggunakan akun terdaftar pada tanggal pengumuman yang telah dijadwalkan.",
  },
  {
    question: "Apakah tersedia jalur beasiswa atau jalur prestasi?",
    answer:
      "Ya. Tersedia jalur Prestasi Akademik dan Prestasi Non-Akademik. Silakan unduh pedoman lengkap di menu 'Pusat Unduhan' pada dasbor utama.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Pusat Bantuan
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Pertanyaan Umum
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Informasi yang sering ditanyakan seputar pendaftaran peserta didik baru.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-950/20"
                    : "border-gray-100 bg-white hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold pr-4 ${
                      isOpen
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                      isOpen
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
