"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main content area — offset by sidebar width, transitions with sidebar */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        }`}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
