"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import { User, LogOut, LayoutDashboard, ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Pemeringkatan", href: "/pemeringkatan" },
  { label: "Statistik", href: "/statistik" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "Regulasi", href: "/regulasi" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClick = () => setIsProfileOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isProfileOpen]);

  const dashboardHref = session?.user?.role === "siswa" ? "/siswa" : "/admin";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-6xl w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl italic leading-none">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              SPMB.
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        isActive
                          ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-800">
              <ThemeToggle />

              {status === "loading" ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ) : session ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen(!isProfileOpen);
                    }}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 transition-all group-hover:ring-2 group-hover:ring-blue-500/20">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex flex-col items-start mr-1">
                      <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[100px]">
                        {session.user.name}
                      </span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                        {session.user.role}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div 
                      className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-500/10 p-2 transform origin-top-right transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 mb-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Akun Anda</p>
                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                      </div>
                      
                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      
                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl p-6 transform origin-top transition-all">
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-bold rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            
            <li className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              {session ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{session.user.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{session.user.role}</p>
                    </div>
                  </div>
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full h-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold transition-all hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex w-full h-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 font-bold transition-all"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full h-12 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold transition-all hover:border-blue-600"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full h-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
                  >
                    Daftar Sekarang
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

