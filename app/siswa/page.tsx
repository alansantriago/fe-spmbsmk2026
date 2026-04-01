"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  ArrowRight,
  Calendar,
  Download,
  MapPin,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// ─── Status Card Component ──────────────────────────────────────────
function StatusCard() {
  // This would come from API in production
  const status = "verifikasi"; // "belum", "verifikasi", "lolos", "ditolak"

  const statusConfig: Record<string, { label: string; desc: string; color: string; bg: string; icon: React.ElementType }> = {
    belum: {
      label: "Belum Mendaftar",
      desc: "Anda belum mengisi formulir pendaftaran. Silakan mulai proses pendaftaran.",
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
      icon: FileText,
    },
    verifikasi: {
      label: "Menunggu Verifikasi",
      desc: "Formulir pendaftaran Anda telah diterima dan sedang dalam proses verifikasi oleh tim seleksi.",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50",
      icon: Clock,
    },
    lolos: {
      label: "Lolos Seleksi",
      desc: "Selamat! Anda dinyatakan lolos seleksi. Silakan unduh surat penerimaan di bawah.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50",
      icon: CheckCircle2,
    },
    ditolak: {
      label: "Tidak Lolos",
      desc: "Mohon maaf, Anda belum memenuhi kriteria seleksi. Silakan hubungi panitia untuk informasi lebih lanjut.",
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50",
      icon: AlertCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border p-6 ${config.bg}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${status === "verifikasi" ? "bg-amber-100 dark:bg-amber-900/30" : status === "lolos" ? "bg-emerald-100 dark:bg-emerald-900/30" : status === "ditolak" ? "bg-red-100 dark:bg-red-900/30" : "bg-gray-100 dark:bg-gray-700"}`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className={`text-lg font-semibold ${config.color}`}>
              {config.label}
            </h3>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              status === "verifikasi" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
              : status === "lolos" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              : status === "ditolak" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}>
              No. Reg: SPMB-2026-0042
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            {config.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Timeline Step ──────────────────────────────────────────────────
const timelineSteps = [
  { label: "Registrasi Akun", done: true, date: "28 Mar 2026" },
  { label: "Isi Formulir", done: true, date: "29 Mar 2026" },
  { label: "Upload Dokumen", done: true, date: "29 Mar 2026" },
  { label: "Verifikasi", done: false, active: true, date: "Proses" },
  { label: "Pengumuman", done: false, date: "15 Apr 2026" },
];

// ─── Important Dates ────────────────────────────────────────────────
const importantDates = [
  { event: "Batas Upload Dokumen", date: "10 April 2026", urgent: true },
  { event: "Pengumuman Seleksi", date: "15 April 2026", urgent: false },
  { event: "Daftar Ulang", date: "20–25 April 2026", urgent: false },
  { event: "Awal Tahun Ajaran", date: "14 Juli 2026", urgent: false },
];

// ─── Quick Actions ──────────────────────────────────────────────────
const quickActions = [
  {
    label: "Edit Formulir",
    desc: "Perbarui data pendaftaran",
    href: "/siswa/pendaftaran",
    icon: FileText,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    label: "Unduh Bukti Daftar",
    desc: "Cetak bukti pendaftaran",
    href: "#",
    icon: Download,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  {
    label: "Lihat Profil",
    desc: "Data diri & dokumen",
    href: "/siswa/profil",
    icon: MapPin,
    color: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  },
  {
    label: "Info Jurusan",
    desc: "Detail kompetensi keahlian",
    href: "#jurusan",
    icon: GraduationCap,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  },
];

export default function SiswaDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Siswa";

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Halo, {userName.split(" ")[0]}! 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pantau status pendaftaran dan kelola data Anda di sini.
        </p>
      </motion.div>

      {/* Status Card */}
      <StatusCard />

      {/* Main Grid: Progress + Important Dates */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Progress Timeline — 3 cols */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">
            Progres Pendaftaran
          </h3>

          <div className="space-y-0">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                {/* Dot & Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done
                      ? "bg-blue-600 text-white"
                      : step.active
                      ? "bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}>
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : step.active ? (
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                    )}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className={`w-0.5 h-10 my-1 ${
                      step.done ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    }`} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className={`text-sm font-medium ${
                    step.done
                      ? "text-gray-900 dark:text-white"
                      : step.active
                      ? "text-amber-700 dark:text-amber-400 font-semibold"
                      : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${
                    step.active ? "text-amber-600 dark:text-amber-400" : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {step.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Dates — 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Jadwal Penting
            </h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-4">
            {importantDates.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  item.urgent
                    ? "bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30"
                    : "bg-gray-50 dark:bg-gray-800/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.urgent && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                  <p className={`text-sm font-medium ${
                    item.urgent ? "text-red-700 dark:text-red-400" : "text-gray-700 dark:text-gray-300"
                  }`}>
                    {item.event}
                  </p>
                </div>
                <p className={`text-xs font-medium flex-shrink-0 ml-4 ${
                  item.urgent ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
                }`}>
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${action.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {action.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {action.desc}
                </p>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 mt-3 ml-auto group-hover:text-blue-500 transition-colors" />
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl translate-x-10 -translate-y-10" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-base">Butuh Bantuan?</h3>
            <p className="text-sm text-blue-100 mt-1">
              Hubungi panitia SPMB atau kunjungi pusat bantuan untuk informasi lebih lanjut.
            </p>
          </div>
          <Link
            href="/siswa/bantuan"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-sm font-medium transition-colors flex-shrink-0 backdrop-blur-sm"
          >
            Pusat Bantuan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
