"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  GraduationCap,
  BarChart3,
  Bell,
  ChevronLeft,
  Menu,
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
      {/* Logo Section - Text Only, No PNG */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
               <span className="text-white font-black text-lg italic leading-none">S</span>
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white uppercase">
              SPMB
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="mx-auto group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
               <span className="text-white font-black text-xl italic leading-none">S</span>
            </div>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors hidden lg:flex"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
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
