import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Keunggulan - SPMB",
  description: "Keunggulan dan fitur utama sistem pendaftaran mahasiswa baru.",
};

export default function KeunggulanPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Features />
      </main>
      <Footer />
    </>
  );
}
