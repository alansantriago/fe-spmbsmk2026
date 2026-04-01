import { RegisterMultiStepForm } from "@/components/RegisterMultiStepForm";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Daftar - SPMB",
  description: "Registrasi akun calon mahasiswa baru.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />

      {/* Top Navigation for Theme Toggle & Back to Home */}
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
        <RegisterMultiStepForm />
      </main>
    </div>
  );
}
