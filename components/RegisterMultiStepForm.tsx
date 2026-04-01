"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerApi, getWilayahChildren, type WilayahItem } from "@/lib/api";

const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
    email: z
      .string()
      .min(1, { message: "Email harus diisi" })
      .email({ message: "Format email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Kata sandi minimal 8 karakter" })
      .regex(/[A-Z]/, { message: "Harus mengandung huruf besar" })
      .regex(/[0-9]/, { message: "Harus mengandung angka" }),
    password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi kata sandi harus diisi" }),
    province_id: z.string().min(1, { message: "Provinsi harus dipilih" }),
    regency_id: z.string().min(1, { message: "Kabupaten/Kota harus dipilih" }),
    agree: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat & ketentuan",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Kata sandi tidak cocok",
    path: ["password_confirmation"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterMultiStepForm() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const totalSteps = 3;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  // Wilayah states
  const [provinces, setProvinces] = React.useState<WilayahItem[]>([]);
  const [regencies, setRegencies] = React.useState<WilayahItem[]>([]);
  const [loadingProvinces, setLoadingProvinces] = React.useState(false);
  const [loadingRegencies, setLoadingRegencies] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      province_id: "",
      regency_id: "",
    },
  });

  const passwordValue = watch("password", "");
  const selectedProvinceId = watch("province_id");

  // Load provinces on mount
  React.useEffect(() => {
    const loadProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const res = await getWilayahChildren(0);
        if (res.success && res.data) {
          setProvinces(res.data);
        }
      } catch {
        console.error("Gagal memuat data provinsi");
      }
      setLoadingProvinces(false);
    };
    loadProvinces();
  }, []);

  // Load regencies when province changes
  React.useEffect(() => {
    if (!selectedProvinceId) {
      setRegencies([]);
      return;
    }
    const loadRegencies = async () => {
      setLoadingRegencies(true);
      setValue("regency_id", ""); // Reset regency
      try {
        const res = await getWilayahChildren(Number(selectedProvinceId));
        if (res.success && res.data) {
          setRegencies(res.data);
        }
      } catch {
        console.error("Gagal memuat data kabupaten");
      }
      setLoadingRegencies(false);
    };
    loadRegencies();
  }, [selectedProvinceId, setValue]);

  // Password strength
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

  const handleNext = async () => {
    let fieldsToValidate: (keyof RegisterFormValues)[] = [];
    if (step === 1) fieldsToValidate = ["name"];
    if (step === 2) fieldsToValidate = ["province_id", "regency_id"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmittingForm(true);
    setApiError(null);

    try {
      const res = await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        regency_id: Number(data.regency_id),
      });

      if (!res.success) {
        // Handle 422 validation errors with field-specific messages
        if (res.errors) {
          Object.keys(res.errors).forEach((key) => {
            setError(key as keyof RegisterFormValues, {
              type: "server",
              message: res.errors![key][0],
            });
          });

          // Navigate to the step that has the error
          if (res.errors.name || res.errors.email) {
            setStep(1);
          } else if (res.errors.province_id || res.errors.regency_id) {
            setStep(2);
          } else if (res.errors.password || res.errors.password_confirmation) {
            setStep(3);
          }
        }
        setApiError(res.message || "Pendaftaran gagal. Silakan coba lagi.");
        setIsSubmittingForm(false);
        return;
      }

      // Success — redirect to email verification pending page
      router.push(`/register/verify?email=${encodeURIComponent(data.email)}`);
    } catch {
      setApiError("Tidak dapat terhubung ke server. Pastikan server backend aktif.");
      setIsSubmittingForm(false);
    }
  };

  // Shared input className
  const inputClass = (hasError: boolean) =>
    `block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ${
      hasError
        ? "ring-red-500 focus:ring-red-500"
        : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;

  const selectClass = (hasError: boolean) =>
    `block w-full rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset appearance-none cursor-pointer ${
      hasError
        ? "ring-red-500 focus:ring-red-500"
        : "ring-gray-300 dark:ring-gray-700 focus:ring-blue-600"
    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-gray-100 text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800">
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
              className={`h-2 flex-1 max-w-12 rounded-full transition-colors ${
                i + 1 <= step
                  ? "bg-blue-600 dark:bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Error Alert */}
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 px-4 py-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Pendaftaran Gagal
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                {apiError}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* ─── Step 1: Identitas ─────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Data Identitas
              </p>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Nama Lengkap *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Sesuai ijazah atau KTP"
                    autoComplete="name"
                    className={inputClass(!!errors.name)}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Alamat Email *
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    className={inputClass(!!errors.email)}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex w-full justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
                >
                  Selanjutnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Step 2: Wilayah ───────────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Asal Wilayah
              </p>

              {/* Province */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Provinsi *
                </label>
                <div className="mt-2 relative">
                  <select
                    className={selectClass(!!errors.province_id)}
                    disabled={loadingProvinces}
                    {...register("province_id")}
                  >
                    <option value="">
                      {loadingProvinces ? "Memuat..." : "Pilih Provinsi"}
                    </option>
                    {provinces.map((p) => (
                      <option key={p.id} value={String(p.id)}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  {errors.province_id && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.province_id.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Regency */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Kabupaten/Kota *
                </label>
                <div className="mt-2 relative">
                  <select
                    className={selectClass(!!errors.regency_id)}
                    disabled={!selectedProvinceId || loadingRegencies}
                    {...register("regency_id")}
                  >
                    <option value="">
                      {loadingRegencies
                        ? "Memuat..."
                        : !selectedProvinceId
                        ? "Pilih provinsi terlebih dahulu"
                        : "Pilih Kabupaten/Kota"}
                    </option>
                    {regencies.map((r) => (
                      <option key={r.id} value={String(r.id)}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  {errors.regency_id && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.regency_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex w-[30%] justify-center items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex flex-1 justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
                >
                  Selanjutnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Step 3: Password & Submit ─────────────────────── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Keamanan Akun
              </p>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Kata Sandi *
                </label>
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    autoComplete="new-password"
                    className={`${inputClass(!!errors.password)} pr-12`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordValue.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 transition-all duration-300 ${
                            i < strengthScore
                              ? strengthColors[strengthScore]
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`mt-1 text-xs font-semibold ${
                        strengthScore > 2
                          ? "text-green-600 dark:text-green-400"
                          : "text-yellow-600 dark:text-yellow-500"
                      }`}
                    >
                      Level: {strengthLabels[strengthScore] || "Lemah"}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
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
                    autoComplete="new-password"
                    className={`${inputClass(!!errors.password_confirmation)} pr-12`}
                    {...register("password_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              {/* T&C Checkbox */}
              <div className="flex items-start gap-3">
                <div className="flex h-6 items-center">
                  <input
                    id="agree"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-900 cursor-pointer"
                    {...register("agree")}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="agree"
                    className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Saya setuju dengan{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      Syarat & Ketentuan
                    </a>{" "}
                    dan{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      Kebijakan Privasi
                    </a>
                    .
                  </label>
                  {errors.agree && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.agree.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex w-[30%] justify-center items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingForm || !isValid}
                  className="flex flex-1 justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
