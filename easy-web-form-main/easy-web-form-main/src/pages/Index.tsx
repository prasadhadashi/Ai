
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCards from "@/components/ProductCards";
import Sidebar from "@/components/Sidebar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductCards />
      </main>
      <Sidebar />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
