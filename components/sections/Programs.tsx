"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, Database, Network, Server, Code } from "lucide-react";

const programs = [
  {
    title: "Teknik Informatika",
    description: "Mempelajari pengembangan perangkat lunak, kecerdasan buatan, dan komputasi awan.",
    icon: Code,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    title: "Sistem Informasi",
    description: "Fokus pada manajemen sistem informasi bisnis, analisis data, dan e-commerce.",
    icon: Database,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
  },
  {
    title: "Teknik Komputer",
    description: "Kombinasi ilmu perangkat keras komputasi dengan perangkat lunak (IoT, Sistem Tertanam).",
    icon: Cpu,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
  },
  {
    title: "Desain Komunikasi Visual",
    description: "Mempelajari desain grafis, animasi, dan komunikasi kreatif multimedia.",
    icon: Monitor,
    color: "bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400",
  },
  {
    title: "Jaringan Komputer",
    description: "Spesialisasi arsitektur jaringan, keamanan siber (Cybersecurity), dan administrasi server.",
    icon: Network,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    title: "Manajemen IT",
    description: "Membentuk pemimpin proyekt IT dengan pengetahuan mendalam soal tata kelola perusahaan.",
    icon: Server,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
  },
];

export function Programs() {
  return (
    <section id="jurusan" className="py-20 lg:py-32 bg-gray-50/50 dark:bg-gray-900/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Program Studi Pilihan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Temukan jurusan yang sesuai dengan passion dan wujudkan karir impianmu.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="group relative flex flex-col items-start rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 dark:bg-gray-950 dark:ring-gray-800 dark:hover:bg-gray-950 dark:hover:shadow-blue-500/10"
            >
              <div className={`mb-6 p-4 rounded-2xl ${program.color} transition-transform group-hover:scale-110`}>
                <program.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                {program.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {program.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-500">
                Lihat Selengkapnya <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
