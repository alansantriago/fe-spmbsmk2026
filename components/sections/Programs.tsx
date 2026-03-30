"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Briefcase, BookOpen, Calculator, Laptop } from "lucide-react";

const programs = [
  {
    title: "Teknik Komputer & Jaringan",
    description: "Perakitan, jaringan komputer, administrasi server, dan keamanan sistem.",
    icon: Laptop,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Akuntansi & Keuangan",
    description: "Akuntansi dasar, perpajakan, perbankan, dan keuangan lembaga.",
    icon: Calculator,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    title: "Teknik Kendaraan Ringan",
    description: "Perawatan mesin, kelistrikan, sasis, dan sistem pemindah tenaga.",
    icon: Building2,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    title: "Bisnis Daring & Pemasaran",
    description: "E-commerce, pemasaran digital, manajemen bisnis online, dan branding.",
    icon: Briefcase,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    title: "Desain Komunikasi Visual",
    description: "Desain grafis, multimedia, fotografi, dan animasi 2D/3D.",
    icon: Landmark,
    color: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    title: "Tata Boga",
    description: "Pengolahan makanan, pastry & bakery, tata hidang, dan wirausaha kuliner.",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

export function Programs() {
  return (
    <section
      id="jurusan"
      className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
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
            Program Studi
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Kompetensi Keahlian Unggulan
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Pilih kompetensi keahlian yang sesuai dengan minat dan bakat Anda
            untuk mempersiapkan karier profesional di masa depan.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                key={program.title}
                className="group flex items-start gap-5 rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 dark:hover:bg-gray-800/80 dark:hover:shadow-none border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${program.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">
                    {program.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {program.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
