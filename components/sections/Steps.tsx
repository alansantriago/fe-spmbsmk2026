"use client";

import { motion } from "framer-motion";
import { UserPlus, FileText, Bookmark, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Registrasi Akun",
    description: "Buat akun SPMB menggunakan email aktif yang akan digunakan selama proses seleksi.",
    icon: UserPlus,
  },
  {
    title: "Isi Data Diri",
    description: "Lengkapi biodata berupa detail pribadi, data akademik, dan unggah dokumen pendukung.",
    icon: FileText,
  },
  {
    title: "Pilih Jurusan",
    description: "Tentukan program studi pilihanmu. Pastikan sudah sesuai dengan minat dan bakat.",
    icon: Bookmark,
  },
  {
    title: "Verifikasi & Hasil",
    description: "Setelah seluruh data diverifikasi, hasil seleksi akan diumumkan pada dashboard.",
    icon: CheckCircle,
  },
];

export function Steps() {
  return (
    <section id="alur" className="py-20 lg:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Alur Pendaftaran Mudah
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Hanya 4 langkah singkat untuk menjadi bagian dari masa depan cerah.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 hidden md:block h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2" />
          
          <div className="grid gap-10 md:grid-cols-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="relative flex flex-col items-center text-center space-y-4"
              >
                {/* Number / Icon Circle */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-gray-950 border-4 border-blue-50 dark:border-gray-900 shadow-xl shadow-blue-500/10 text-blue-600 dark:text-blue-500 z-10 transition-transform hover:scale-110">
                  <step.icon className="h-6 w-6" />
                </div>
                
                {/* Step indicator */}
                <div className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase">
                  Langkah {index + 1}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
