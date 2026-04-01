"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  GraduationCap,
  BarChart3,
  Bell,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pendaftar", href: "/admin/pendaftar", icon: Users },
  { label: "Seleksi", href: "/admin/seleksi", icon: FileText },
  { label: "Jurusan", href: "/admin/jurusan", icon: GraduationCap },
  { label: "Laporan", href: "/admin/laporan", icon: BarChart3 },
  { label: "Notifikasi", href: "/admin/notifikasi", icon: Bell },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen flex flex-col bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-64"
        } hidden lg:flex`}
    >
      {/* Logo Section - Official Branding */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-spmb.png"
              alt="Logo SPMB"
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tighter text-gray-900 dark:text-white leading-none uppercase">
                SPMB SMK
              </span>
              <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5 leading-none">
                Provinsi Bengkulu
              </span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="mx-auto group">
            <Image
              src="/images/logo-spmb.png"
              alt="Logo SPMB"
              width={36}
              height={36}
              className="w-9 h-9 object-contain transition-transform group-hover:rotate-6"
            />
          </Link>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {!collapsed && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 px-3 mb-4">
            Menu Utama
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-300 group ${isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200"
                } ${collapsed ? "justify-center px-0 h-12 w-12 mx-auto" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-transform ${collapsed ? "" : "group-hover:scale-110"} ${isActive ? "text-white" : "text-gray-400 dark:text-gray-600 group-hover:text-blue-600"}`} />
              {!collapsed && <span className="tracking-tight">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer info - Minimalist */}
      {!collapsed && (
        <div className="p-6 border-t border-gray-100 dark:border-gray-800">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest text-center">Admin Portal v1.0</p>
        </div>
      )}
    </aside>
  );
}
