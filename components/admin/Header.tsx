"use client";

import { Bell, Search, Moon, Sun, LogOut, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Step 1: Call Laravel logout API to invalidate the token on backend
      if (session?.accessToken) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        await fetch(`${apiUrl}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }).catch(() => {}); // Silent fail — token will expire anyway
      }
    } catch {
      // Continue with client-side logout even if API fails
    }

    // Step 2: Clear NextAuth session and redirect to login
    await signOut({ redirect: false });
    router.push("/login");
  };

  const userName = session?.user?.name || "Administrator";
  const userRole = session?.user?.role || "Admin";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const roleLabels: Record<string, string> = {
    "admin-dinas": "Admin Dinas",
    "admin-dinas-kab": "Admin Dinas Kab",
    "admin-sekolah": "Admin Sekolah",
    siswa: "Siswa",
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Page context */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Selamat datang kembali, {userName.split(" ")[0]}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-800 w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pendaftar..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
          />
          <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            ⌘K
          </kbd>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 -mt-[18px]" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-950" />
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50"
          title="Keluar"
        >
          {isLoggingOut ? (
            <Loader2 className="w-[18px] h-[18px] animate-spin" />
          ) : (
            <LogOut className="w-[18px] h-[18px]" />
          )}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {userInitials}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
              {userName}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              {roleLabels[userRole] || userRole}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
