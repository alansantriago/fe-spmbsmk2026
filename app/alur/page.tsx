import { Navbar } from "@/components/Navbar";
import { Steps } from "@/components/sections/Steps";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Alur Pendaftaran - SPMB",
  description: "Langkah-langkah pendaftaran mahasiswa baru di SPMB.",
};

export default function AlurPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Steps />
      </main>
      <Footer />
    </>
  );
}
