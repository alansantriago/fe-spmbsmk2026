"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  Eye,
} from "lucide-react";

const statsCards = [
  {
    title: "Total Pendaftar",
    value: "1,247",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    color: "from-blue-600 to-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Lolos Seleksi",
    value: "834",
    change: "+8.2%",
    trend: "up" as const,
    icon: UserCheck,
    color: "from-emerald-600 to-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    title: "Menunggu Verifikasi",
    value: "289",
    change: "-3.1%",
    trend: "down" as const,
    icon: Clock,
    color: "from-amber-600 to-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    title: "Ditolak",
    value: "124",
    change: "+1.4%",
    trend: "up" as const,
    icon: XCircle,
    color: "from-red-600 to-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
];

const recentRegistrants = [
  { id: "SPMB-2026-0001", name: "Ahmad Fauzan", jurusan: "TKJ", status: "Lolos", date: "30 Mar 2026", avatar: "AF" },
  { id: "SPMB-2026-0002", name: "Siti Rahmawati", jurusan: "Akuntansi", status: "Verifikasi", date: "30 Mar 2026", avatar: "SR" },
  { id: "SPMB-2026-0003", name: "Budi Pratama", jurusan: "TKR", status: "Lolos", date: "29 Mar 2026", avatar: "BP" },
  { id: "SPMB-2026-0004", name: "Dewi Anggraini", jurusan: "DKV", status: "Ditolak", date: "29 Mar 2026", avatar: "DA" },
  { id: "SPMB-2026-0005", name: "Rizky Maulana", jurusan: "Bisnis Daring", status: "Verifikasi", date: "28 Mar 2026", avatar: "RM" },
  { id: "SPMB-2026-0006", name: "Nadia Putri", jurusan: "Tata Boga", status: "Lolos", date: "28 Mar 2026", avatar: "NP" },
];

const jurusanData = [
  { name: "TKJ", count: 312, percentage: 25, color: "bg-blue-500" },
  { name: "Akuntansi", count: 245, percentage: 20, color: "bg-indigo-500" },
  { name: "TKR", count: 198, percentage: 16, color: "bg-emerald-500" },
  { name: "DKV", count: 187, percentage: 15, color: "bg-orange-500" },
  { name: "Bisnis Daring", count: 168, percentage: 13, color: "bg-pink-500" },
  { name: "Tata Boga", count: 137, percentage: 11, color: "bg-amber-500" },
];

const weeklyData = [
  { day: "Sen", value: 45 },
  { day: "Sel", value: 62 },
  { day: "Rab", value: 58 },
  { day: "Kam", value: 71 },
  { day: "Jum", value: 55 },
  { day: "Sab", value: 89 },
  { day: "Min", value: 32 },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Lolos: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
    Verifikasi: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    Ditolak: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const maxWeekly = Math.max(...weeklyData.map((d) => d.value));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Ringkasan Pendaftaran
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Data penerimaan peserta didik baru SMK Provinsi Bengkulu — Tahun Ajaran 2026
          </p>
        </div>
        <button className="hidden md:inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          Unduh Laporan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 p-5 transition-all hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-none"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${card.bg}`}>
                  <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${card.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                  {card.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {card.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {card.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Pendaftaran Mingguan
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                7 hari terakhir
              </p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Simple bar chart */}
          <div className="flex items-end justify-between gap-3 h-40">
            {weeklyData.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                  {item.value}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxWeekly) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                  className={`w-full rounded-lg ${
                    item.value === maxWeekly
                      ? "bg-blue-600"
                      : "bg-blue-100 dark:bg-blue-900/30"
                  } min-h-[8px]`}
                />
                <span className="text-[11px] text-gray-400">{item.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Distribution chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Distribusi per Jurusan
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Total: 1,247 pendaftar
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {jurusanData.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage * 4}%` }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Registrants Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Pendaftar Terbaru
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Data registrasi yang baru masuk ke sistem
            </p>
          </div>
          <button className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1">
            Lihat Semua
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-gray-100 dark:border-gray-800">
                <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                  Pendaftar
                </th>
                <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                  No. Registrasi
                </th>
                <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                  Jurusan
                </th>
                <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                  Status
                </th>
                <th className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                  Tanggal
                </th>
                <th className="text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrants.map((person, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                        {person.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {person.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono text-xs">
                      {person.id}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{person.jurusan}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={person.status} />
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{person.date}</span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
