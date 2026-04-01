"use client";

import { Bell, Search, Moon, Sun, LogOut, Loader2, Settings, User, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      if (session?.accessToken) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        await fetch(`${apiUrl}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }).catch(() => {});
      }
    } catch {
      // Continue client-side logout
    }

    await signOut({ redirect: false });
    router.push("/login");
  };

  const userName = session?.user?.name || "Administrator";
  const userRole = session?.user?.role || "admin";
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
    "admin": "Super Admin",
    "siswa": "Siswa",
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Page context - Styled like the main navigation */}
      <div className="flex items-center gap-4">
        <div className="space-y-0.5">
          <h1 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Overview
          </h1>
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest leading-none">
            Welcome back, {userName.split(" ")[0]}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search - Standardized with main theme */}
        <div className="hidden md:flex items-center gap-3 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-2 border border-gray-100 dark:border-gray-800 w-64 group focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Cari pendaftar..."
            className="bg-transparent border-none outline-none text-xs font-semibold text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
          />
        </div>

        {/* Action Buttons Strip */}
        <div className="flex items-center gap-1 border-l border-gray-100 dark:border-gray-800 ml-2 pl-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 transition-all active:scale-95"
            title="Switch Theme"
          >
            {theme === "light" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 transition-all active:scale-95">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white dark:ring-gray-950" />
          </button>
        </div>

        {/* User Dropdown - Premium Styled */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl transition-all active:scale-95 border ${
              isDropdownOpen 
                ? "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800" 
                : "hover:bg-gray-50 dark:hover:bg-gray-900 border-transparent"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-blue-600/20">
              {userInitials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-black text-gray-900 dark:text-white leading-none uppercase">
                {userName.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-1">
                {roleLabels[userRole] || userRole}
              </p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-900/10 overflow-hidden"
              >
                <div className="p-3">
                  <div className="px-3 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight truncate">{userName}</p>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-0.5">{roleLabels[userRole] || userRole}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Link 
                      href="/admin/profil" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all uppercase tracking-widest group"
                    >
                      <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Lihat Profil
                    </Link>
                    <Link 
                      href="/admin/pengaturan" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all uppercase tracking-widest group"
                    >
                      <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      Pengaturan
                    </Link>
                  </div>

                  <div className="h-px bg-gray-50 dark:bg-gray-800 my-2 mx-1" />

                  <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all uppercase tracking-widest group disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                    <span>Keluar Sesi</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
