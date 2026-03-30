"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "SMK Terintegrasi", value: 50, suffix: "+" },
  { label: "Kompetensi Keahlian", value: 24, suffix: "" },
  { label: "Peserta Didik Terdaftar", value: 12, suffix: "K+" },
  { label: "Tingkat Kepuasan", value: 98, suffix: "%" },
];

function Counter({ from, to, delay = 0 }: { from: number; to: number; delay?: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timePassed = currentTime - startTime;
      const progress = Math.min(timePassed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * (to - from) + from));
      if (timePassed < duration) requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
    return () => clearTimeout(timeout);
  }, [from, to, delay]);

  return <span>{count}</span>;
}

export function Stats() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-900">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center text-white py-4"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                <Counter from={0} to={stat.value} delay={0.3} />
                {stat.suffix}
              </div>
              <div className="text-sm text-blue-200/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
