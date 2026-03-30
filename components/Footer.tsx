"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tighter text-white">
                SPMB<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Sistem Penerimaan Mahasiswa Baru yang cepat, mudah, dan terintegrasi untuk menciptakan generasi unggul.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Tautan Cepat
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="#alur" className="hover:text-blue-400 transition-colors">Alur Pendaftaran</Link>
              </li>
              <li>
                <Link href="#jurusan" className="hover:text-blue-400 transition-colors">Program Studi</Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Bantuan
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Pusat Bantuan</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Panduan Pendaftaran</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Syarat & Ketentuan</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</Link>
              </li>
            </ul>
          </div>

          <div id="kontak">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
                <span>Jl. Pendidikan No. 123, Kampus Merdeka, Jakarta 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500 shrink-0" />
                <span>(021) 1234-5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                <a href="mailto:info@spmb.ac.id" className="hover:text-blue-400 transition-colors">info@spmb.ac.id</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SPMB. Hak cipta dilindungi undang-undang.
          </p>
          <div className="mt-4 flex space-x-6 text-sm text-gray-400 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
