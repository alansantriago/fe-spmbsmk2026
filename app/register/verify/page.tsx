"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, RefreshCw, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { resendVerificationEmail } from "@/lib/api";
import { ThemeToggle } from "@/components/ThemeToggle";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resendMessage, setResendMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;

    setResendStatus("loading");
    try {
      const res = await resendVerificationEmail(email);
      if (res.success) {
        setResendStatus("success");
        setResendMessage(res.message || "Tautan verifikasi baru telah dikirim ke email Anda.");
        setCooldown(60); // 60 second cooldown
      } else {
        setResendStatus("error");
        setResendMessage(res.message || "Gagal mengirim ulang email verifikasi.");
      }
    } catch {
      setResendStatus("error");
      setResendMessage("Tidak dapat terhubung ke server.");
    }
  };

  // Mask email for display
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@)/, (_, a, b, c) => a + b.replace(/./g, "•") + c)
    : "";

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />

      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500"
        >
          SPMB.
        </Link>
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800 text-center"
        >
          {/* Mail Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Verifikasi Email Anda
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
            Kami telah mengirimkan tautan verifikasi ke email:
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-6">
            {maskedEmail || "email Anda"}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed mb-6">
            Silakan buka email Anda dan klik tautan verifikasi untuk mengaktifkan akun.
            Periksa juga folder spam/junk jika tidak ditemukan di inbox.
          </p>

          {/* Resend status */}
          {resendStatus === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 flex items-center gap-2 justify-center text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">{resendMessage}</span>
            </motion.div>
          )}

          {resendStatus === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 flex items-center gap-2 justify-center text-red-600 dark:text-red-400"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{resendMessage}</span>
            </motion.div>
          )}

          {/* Resend button */}
          <button
            onClick={handleResend}
            disabled={resendStatus === "loading" || cooldown > 0}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {resendStatus === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {cooldown > 0
              ? `Kirim ulang dalam ${cooldown}s`
              : "Kirim Ulang Email Verifikasi"}
          </button>

          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all"
          >
            Ke Halaman Login
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

export default function RegisterVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
