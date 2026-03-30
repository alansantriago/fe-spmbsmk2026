import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Masuk - SPMB",
  description: "Masuk ke akun SPMB Anda.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />

      {/* Top Navigation for Theme Toggle & Back to Home */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-blue-600 dark:text-blue-500 transition-transform hover:scale-105"
        >
          SPMB.
        </Link>
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}
