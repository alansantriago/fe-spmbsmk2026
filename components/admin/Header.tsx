"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Page context */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Selamat datang kembali, Admin
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

        {/* User avatar */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
              Administrator
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
