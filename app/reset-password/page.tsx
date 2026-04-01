"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { resetPasswordApi } from "@/lib/api";
import { ThemeToggle } from "@/components/ThemeToggle";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Kata sandi minimal 8 karakter" })
      .regex(/[A-Z]/, { message: "Harus mengandung huruf besar" })
      .regex(/[0-9]/, { message: "Harus mengandung angka" }),
    password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi kata sandi harus diisi" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Kata sandi tidak cocok",
    path: ["password_confirmation"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  // Password strength logic (shared with Register form)
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strengthScore = calculateStrength(passwordValue);
  const strengthLabels = ["Sangat Lemah", "Lemah", "Sedang", "Kuat", "Sangat Kuat"];
  const strengthColors = [
    "bg-gray-300 dark:bg-gray-700",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token || !email) {
      setStatus("error");
      setMessage("Token reset password tidak valid atau sudah kedaluwarsa.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");

    try {
      const res = await resetPasswordApi({
        token,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (res.success) {
        setStatus("success");
        setMessage(res.message || "Kata sandi berhasil diatur ulang!");
        // Optional: redirect to login after few seconds
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setStatus("error");
        setMessage(res.message || "Gagal mengatur ulang kata sandi.");
      }
    } catch {
      setStatus("error");
      setMessage("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Token Tidak Valid</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tautan reset password sudah tidak berlaku atau tidak lengkap.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors pt-4"
        >
          Minta tautan baru
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-6 text-center space-y-4"
        >
          <div className="mx-auto w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-900 dark:text-white text-lg">Berhasil!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {message} Anda akan diarahkan ke halaman login dalam beberapa detik.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors pt-2"
          >
            Menuju Login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Buat kata sandi baru yang kuat untuk akun Anda.
            </p>
          </div>

          {status === "error" && (
            <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-lg p-4 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{message}</p>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Kata Sandi Baru
            </label>
            <div className="mt-2 relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                className={`block w-full rounded-xl border-0 py-3 pl-11 pr-12 shadow-sm ring-1 ring-inset ${
                  errors.password ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-all`}
                {...register("password")}
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {/* Strength meter */}
            {passwordValue.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 transition-all duration-300 ${
                        i < strengthScore ? strengthColors[strengthScore] : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <p className={`mt-1 text-xs font-semibold ${strengthScore > 2 ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-500"}`}>
                  Level: {strengthLabels[strengthScore] || "Lemah"}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="mt-2 relative group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi kata sandi baru"
                className={`block w-full rounded-xl border-0 py-3 pl-11 pr-12 shadow-sm ring-1 ring-inset ${
                  errors.password_confirmation ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-all`}
                {...register("password_confirmation")}
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password_confirmation.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Mengatur Ulang...
              </>
            ) : (
              "Simpan Kata Sandi"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 font-bold tracking-tight text-blue-600 dark:text-blue-500">
        <Link href="/">SPMB.</Link>
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Memuat formulir...</p>
              </div>
            }
          >
            <ResetPasswordFormContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
