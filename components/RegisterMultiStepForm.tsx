"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const registerSchema = z
  .object({
    fullName: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
    phone: z.string().optional(),
    email: z.string().min(1, { message: "Email harus diisi" }).email({ message: "Format email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Kata sandi minimal 8 karakter" })
      .regex(/[A-Z]/, { message: "Harus mengandung huruf besar" })
      .regex(/[0-9]/, { message: "Harus mengandung angka" }),
    confirmPassword: z.string().min(1, { message: "Konfirmasi kata sandi harus diisi" }),
    agree: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat & ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterMultiStepForm() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 2;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  // Password strength logic
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
  const strengthColors = ["bg-gray-300 dark:bg-gray-700", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

  const handleNext = async () => {
    let fieldsToValidate: (keyof RegisterFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ["fullName", "phone"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmittingForm(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Register Data:", data);
    setIsSubmittingForm(false);
    // Redirect or show success
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl shadow-blue-900/10 ring-1 ring-gray-100 dark:ring-gray-800">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Buat Akun SPMB
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Langkah {step} dari {totalSteps}
        </p>
        
        {/* Stepper progress */}
        <div className="flex gap-2 justify-center mt-4">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-16 rounded-full transition-colors ${
                i + 1 <= step ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-800"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Nama Lengkap *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Sesuai ijazah atau KTP"
                    className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ${
                      errors.fullName ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Nomor Telepon (Opsional)
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    placeholder="081234567890"
                    className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ${
                      errors.phone ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone?.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex w-full justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                >
                  Selanjutnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Alamat Email *
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    className={`block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ${
                      errors.email ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Kata Sandi *
                </label>
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    className={`block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset ${
                      errors.password ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
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
                    <p className={`mt-1 text-xs font-semibold ${strengthScore > 2 ? "text-green-600" : "text-yellow-600"} dark:${strengthScore > 2 ? "text-green-400" : "text-yellow-500"}`}>
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
                  Ulangi Kata Sandi *
                </label>
                <div className="mt-2 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ketik ulang kata sandi"
                    className={`block w-full rounded-xl border-0 py-3 pl-4 pr-12 shadow-sm ring-1 ring-inset ${
                      errors.confirmPassword ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
                    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 transition-colors`}
                    {...register("confirmPassword")}
                  />
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* T&C Checkbox */}
              <div className="flex items-start gap-3 mt-4">
                <div className="flex h-6 items-center">
                  <input
                    id="agree"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-blue-500 cursor-pointer"
                    {...register("agree")}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="agree" className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    Saya setuju dengan{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Syarat & Ketentuan</a> dan {" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Kebijakan Privasi</a>.
                  </label>
                  {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree.message}</p>}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex w-[30%] justify-center items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingForm || !isValid}
                  className="flex flex-1 justify-center items-center rounded-xl bg-blue-600 w-full px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Mendaftar...
                    </>
                  ) : (
                    "Daftar"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Masuk
        </Link>
      </div>
    </div>
  );
}
