"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Kapan periode pendaftaran mahasiswa baru dibuka?",
    answer: "Pendaftaran gelombang pertama dibuka mulai 1 Januari hingga 30 April. Gelombang kedua akan dibuka pada bulan Mei sesuai dengan kuota yang tersisa."
  },
  {
    question: "Apa saja dokumen yang perlu disiapkan?",
    answer: "Calon mahasiswa perlu menyiapkan scan Ijazah/SKL, KTP/Kartu Pelajar, Kartu Keluarga, dan pas foto terbaru dengan latar belakang merah."
  },
  {
    question: "Apakah sistem menyediakan jalur beasiswa?",
    answer: "Ya, kami menyediakan jalur beasiswa prestasi akademik dan non-akademik, serta beasiswa KIP-Kuliah untuk yang memenuhi syarat."
  },
  {
    question: "Bagaimana cara mengecek status kelulusan?",
    answer: "Kamu bisa login ke dalam dashboard menggunakan akun yang sudah didaftarkan, lalu cek menu 'Status Seleksi' untuk melihat hasil pengumuman."
  },
  {
    question: "Apakah biaya pendaftaran bisa dikembalikan jika batal?",
    answer: "Maaf, biaya pendaftaran yang sudah dibayarkan tidak dapat ditarik atau dikembalikan dengan alasan apapun."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-4 mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Pertanyaan Umum
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar pendaftaran.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
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
