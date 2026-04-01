"use client";

import { SessionProvider } from "next-auth/react";
import { SiswaNavbar } from "@/components/siswa/SiswaNavbar";

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <SiswaNavbar />
        <main className="flex-1 py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
        {/* Minimal footer */}
        <footer className="py-6 border-t border-gray-100 dark:border-gray-800">
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            &copy; 2026 SPMB SMK Provinsi Bengkulu. Hak Cipta Dilindungi.
          </p>
        </footer>
      </div>
    </SessionProvider>
  );
}
