import { Navbar } from "@/components/Navbar";
import { Programs } from "@/components/sections/Programs";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Jurusan - SPMB",
  description: "Daftar jurusan dan program studi yang tersedia di SPMB.",
};

export default function JurusanPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Programs />
      </main>
      <Footer />
    </>
  );
}
