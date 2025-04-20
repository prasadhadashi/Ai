
import { Button } from "@/components/ui/button";
import LoanApplicationForm from "./LoanApplicationForm";
import ImageSlider from "./ImageSlider";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-bank-blue to-bank-blue-light pt-8 pb-16 overflow-hidden">
      {/* Background Pattern with Gold Images */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-3 gap-8 h-full p-8">
          <img 
            src="https://images.unsplash.com/photo-1610375461246-83df859d849d" 
            alt="Gold Background" 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1624365169364-0640dd10e180" 
            alt="Gold Jewelry" 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1586861256632-5d436966b997" 
            alt="Gold Coins" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Text Content */}
          <div className="text-white z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-bank-gold">
              Your Path to Financial Freedom Starts Here
            </h1>
            <p className="text-lg mb-8">
              Unlock the power of your gold & property, with our customized loan solutions
              designed to help you achieve your dreams.
            </p>

            {/* Loan Application Form */}
            <LoanApplicationForm />
          </div>

          {/* Image Slider - Only visible on larger screens */}
          <div className="hidden lg:block relative z-10">
            <ImageSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
