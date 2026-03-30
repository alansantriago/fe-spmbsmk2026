"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email harus diisi" }).email({ message: "Format email tidak valid" }),
  password: z.string().min(1, { message: "Kata sandi harus diisi" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    // Simulate API Call to Supabase / Backend auth
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login Data:", data);
    setIsSubmitting(false);
    // Typically redirect user here
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
              className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ${
                errors.email ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
              } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
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
              className={`block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset ${
                errors.password ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
              } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
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
                Masuk...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="mt-8 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400">atau</span>
        </div>
      </div>

      {/* Google Login Button */}
      <div className="mt-6">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white dark:bg-gray-950 px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:ring-transparent transition-all"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Masuk dengan Google
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Belum punya akun?{" "}
        <Link
          href="/#register"
          className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Daftar
        </Link>
      </div>
    </motion.div>
  );
}
