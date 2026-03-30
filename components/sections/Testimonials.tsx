"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ahmad Rizky",
    role: "Mahasiswa Teknik Informatika",
    content: "Sistem pendaftarannya sangat mudah dipahami. Saya bisa memantau status kelulusan secara real-time tanpa harus bingung bertanya ke sana kemari.",
    avatar: "https://i.pravatar.cc/150?u=ahmad",
  },
  {
    name: "Siti Nurhaliza",
    role: "Mahasiswi Sistem Informasi",
    content: "Alur registrasinya jelas, dan pilihan jurusannya lengkap. Panduan di website ini sangat membantuku menentukan pilihan masa depanku.",
    avatar: "https://i.pravatar.cc/150?u=siti",
  },
  {
    name: "Budi Santoso",
    role: "Mahasiswa Teknik Komputer",
    content: "Tampilan websitenya sangat modern dan responsif meski dibuka dari HP. Pengalaman pendaftaran mahasiswa baru jadi tidak membosankan.",
    avatar: "https://i.pravatar.cc/150?u=budi",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-black overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Dengarkan langsung pengalaman dari mahasiswa yang telah berhasil mendaftar melalui sistem kami.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               key={index}
               className="flex flex-col rounded-3xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900/50 dark:ring-gray-800"
             >
               <div className="mb-6 flex space-x-1 text-yellow-400">
                  {/* 5 stars */}
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
               </div>
               
               <p className="flex-1 text-gray-700 dark:text-gray-300 italic mb-8 relative">
                 <span className="text-4xl absolute -top-4 -left-2 text-gray-300 dark:text-gray-700 font-serif leading-none">&quot;</span>
                 {testimonial.content}
               </p>

               <div className="flex items-center gap-4 mt-auto">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img
                   src={testimonial.avatar}
                   alt={testimonial.name}
                   className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                 />
                 <div>
                   <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                 </div>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
