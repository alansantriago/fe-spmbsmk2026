"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Keunggulan", href: "#fitur" },
  { label: "Alur Pendaftaran", href: "#alur" },
  { label: "Jurusan", href: "#jurusan" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl w-full text-gray-900 dark:text-white">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">
              SPMB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 pl-6">
              <ThemeToggle />
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Pendaftaran
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 dark:text-white hover:text-blue-600 transition-colors focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full mt-2 left-4 right-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl p-6">
          <ul className="space-y-4 text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full h-11 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-6 text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full h-11 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Pendaftaran
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
