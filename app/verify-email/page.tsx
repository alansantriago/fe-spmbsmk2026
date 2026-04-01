"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { verifyEmailApi } from "@/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const queryUrl = searchParams.get("query_url");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!queryUrl) {
      setStatus("error");
      setMessage("Link verifikasi tidak valid.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const decodedUrl = decodeURIComponent(queryUrl);
        const res = await verifyEmailApi(decodedUrl, email);

        if (res.success) {
          setStatus("success");
          setMessage(res.message || "Email berhasil diverifikasi!");
        } else {
          setStatus("error");
          setMessage(res.message || "Verifikasi gagal. Link mungkin sudah kedaluwarsa.");
        }
      } catch {
        setStatus("error");
        setMessage("Tidak dapat terhubung ke server. Silakan coba lagi nanti.");
      }
    };

    verifyEmail();
  }, [queryUrl, email]);

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />

      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/logo-spmb.png"
            alt="Logo SPMB"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-blue-600 dark:text-blue-500 uppercase leading-none">
              SPMB SMK
            </span>
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-500/80 uppercase tracking-widest mt-0.5 leading-none">
              Provinsi Bengkulu
            </span>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-6 md:px-8 max-w-6xl flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800 text-center"
        >
          {/* Loading State */}
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Memverifikasi Email...
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mohon tunggu, kami sedang memverifikasi email Anda.
              </p>
            </motion.div>
          )}

          {/* Success State */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Email Terverifikasi!
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Akun Anda telah aktif. Silakan masuk untuk melanjutkan proses pendaftaran.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all mt-2"
              >
                Masuk ke Akun
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {/* Error State */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Verifikasi Gagal
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {message}
              </p>
              <div className="space-y-3 pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all"
                >
                  Daftar Ulang
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  Ke Halaman Login
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
