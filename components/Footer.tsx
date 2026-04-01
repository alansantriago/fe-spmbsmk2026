import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-spmb.png"
                alt="Logo SPMB"
                width={48}
                height={48}
                className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none uppercase">
                  SPMB SMK
                </span>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5 leading-none">
                  Provinsi Bengkulu
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500">
              Sistem Penerimaan Peserta Didik Baru SMK Provinsi Bengkulu —
              portal pendaftaran resmi yang cepat, transparan, dan terintegrasi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Beranda", href: "/" },
                { label: "Prosedur", href: "#alur" },
                { label: "Program Keahlian", href: "#jurusan" },
                { label: "Pusat Bantuan", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  Dinas Pendidikan Provinsi Bengkulu
                  <br />
                  Jl. Pembangunan No. 16, Kota Bengkulu
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm">+62 736-123-456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm">spmb@disdik.bengkuluprov.go.id</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1 space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Informasi Terkini
            </h3>
            <p className="text-sm">
              Daftarkan surel Anda untuk menerima pemberitahuan terbaru seputar
              jadwal seleksi dan pengumuman resmi.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Alamat surel"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold transition-colors hover:bg-blue-700 flex-shrink-0"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} SPMB SMK Provinsi Bengkulu. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Ketentuan Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
