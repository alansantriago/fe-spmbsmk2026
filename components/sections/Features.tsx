"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, BarChart3, Fingerprint } from "lucide-react";

const features = [
  {
    title: "Pendaftaran Daring Terpadu",
    description:
      "Seluruh proses registrasi dapat diselesaikan secara online tanpa antrean. Cepat, mudah, dan efisien.",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Ragam Program Keahlian",
    description:
      "Tersedia beragam kompetensi keahlian unggulan yang dirancang sesuai kebutuhan dunia industri.",
    icon: Fingerprint,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Pemantauan Real-time",
    description:
      "Lacak status pendaftaran dan seleksi Anda secara langsung melalui dasbor personal.",
    icon: BarChart3,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Keamanan Data Terjamin",
    description:
      "Sistem dibangun dengan standar keamanan tinggi untuk melindungi privasi dan dokumen Anda.",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-green-500",
  },
];

export function Features() {
  return (
    <section id="fitur" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Subtle top separator */}
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
            Keunggulan
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Mengapa Memilih Sistem Kami?
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Infrastruktur pendaftaran yang mengedepankan efisiensi, transparansi,
            dan kemudahan bagi seluruh calon peserta didik.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-900 p-7 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 dark:hover:bg-gray-800/80 dark:hover:shadow-none border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-base">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
