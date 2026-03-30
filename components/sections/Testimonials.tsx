"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Rizky",
    role: "Siswa TKJ — SMKN 1 Bengkulu",
    content:
      "Proses pendaftaran sangat terstruktur dan mudah dipahami. Saya bisa melacak status seleksi secara langsung tanpa harus datang ke sekolah.",
    avatar: "https://i.pravatar.cc/150?u=ahmad",
  },
  {
    name: "Siti Nurhaliza",
    role: "Siswi Akuntansi — SMKN 3 Bengkulu",
    content:
      "Informasi kompetensi keahlian dan prosedur seleksi disajikan dengan sangat jelas. Sangat membantu saya dalam menentukan pilihan program.",
    avatar: "https://i.pravatar.cc/150?u=siti",
  },
  {
    name: "Budi Santoso",
    role: "Siswa TKR — SMKN 2 Rejang Lebong",
    content:
      "Antarmuka pendaftaran sangat intuitif dan profesional. Seluruh proses registrasi saya berjalan lancar tanpa kendala teknis apa pun.",
    avatar: "https://i.pravatar.cc/150?u=budi",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
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
            Testimoni
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Apa Kata Mereka?
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Pengalaman langsung dari siswa yang telah berhasil mendaftar melalui
            sistem SPMB.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="flex flex-col rounded-2xl bg-white dark:bg-gray-900 p-7 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none hover:border-gray-200 dark:hover:border-gray-700"
            >
              <div className="mb-5 flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="flex-1 text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-7">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
