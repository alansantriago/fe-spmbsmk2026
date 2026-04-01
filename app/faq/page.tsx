import { Navbar } from "@/components/Navbar";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "FAQ - SPMB",
  description: "Pertanyaan yang sering diajukan mengenai sistem pendaftaran mahasiswa baru.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <Faq />
      </main>
      <Footer />
    </>
  );
}
