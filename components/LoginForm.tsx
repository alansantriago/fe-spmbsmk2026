"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email harus diisi" }).email({ message: "Format email tidak valid" }),
  password: z.string().min(1, { message: "Kata sandi harus diisi" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // We handle redirect manually
      });

      if (result?.error) {
        // Map Auth.js error codes to user-friendly messages
        const errorMap: Record<string, string> = {
          CredentialsSignin: "Email atau password salah!",
          Configuration: "Terjadi masalah pada server autentikasi.",
          AccessDenied: "Akses ditolak. Pastikan email Anda sudah terverifikasi.",
          default: "Gagal masuk. Silakan coba lagi nanti.",
        };

        const errorMessage = errorMap[result.error] || errorMap.default;
        setApiError(errorMessage);
        setIsSubmitting(false);
        return;
      }

      if (result?.ok) {
        setSuccessMessage("Login berhasil! Mengalihkan ke dashboard...");
        // Short delay so user sees the success message, then refresh to trigger middleware redirect
        await new Promise((resolve) => setTimeout(resolve, 600));
        router.refresh();
        router.push("/login"); // Middleware will catch this and redirect to correct dashboard
      }
    } catch {
      setApiError("Tidak dapat terhubung ke server. Pastikan server backend aktif.");
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800"
    >
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Masuk ke Akun Anda
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Masukkan email dan kata sandi yang telah terdaftar
        </p>
      </div>

      {/* API Error Alert */}
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 px-4 py-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Autentikasi Gagal
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                {apiError}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Alert */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-6 flex items-start gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 px-4 py-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              {successMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            Alamat Email
          </label>
          <div className="mt-2 text-gray-900">
            <input
              type="email"
              placeholder="nama@email.com"
              autoComplete="email"
              disabled={isSubmitting}
              className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ${
                errors.email ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
              } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              {...register("email")}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Kata Sandi
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Lupa kata sandi?
            </Link>
          </div>
          <div className="mt-2 relative text-gray-900">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isSubmitting}
              className={`block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset ${
                errors.password ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
              } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || (!isValid && isDirty)}
            className="flex w-full justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Daftar
        </Link>
      </div>
    </motion.div>
  );
}
