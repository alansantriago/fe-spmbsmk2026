"use client";

import { motion } from "framer-motion";
import { Laptop, ShieldCheck, GitMerge, Activity } from "lucide-react";

const features = [
  {
    title: "Pendaftaran Online Mudah",
    description: "Proses pendaftaran full online yang dapat diakses dari mana saja dan kapan saja dengan cepat.",
    icon: Laptop,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Seleksi Transparan",
    description: "Sistem penilaian dan seleksi yang terbuka, adil, dan dapat dipantau langsung oleh peserta.",
    icon: ShieldCheck,
    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Multi Jalur Pendaftaran",
    description: "Berbagai pilihan jalur masuk mulai dari Prestasi, Reguler, Mandiri, hingga Beasiswa.",
    icon: GitMerge,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Real-time Status",
    description: "Pantau status pendaftaran, jadwal ujian, dan pengumuman hasil secara seketika.",
    icon: Activity,
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section id="fitur" className="py-20 lg:py-32 bg-gray-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Kenapa Memilih Kami?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Sistem kami dirancang untuk memberikan kemudahan dan kepastian bagi seluruh calon mahasiswa.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 dark:bg-gray-950 dark:ring-gray-800 dark:hover:ring-blue-500/30"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
