
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LoginDialog from "./LoginDialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-bank-blue sticky top-0 z-50 border-b-[3px] border-bank-gold">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="mr-4 text-white md:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-bank-blue-light">
                <nav className="flex flex-col space-y-4 mt-8">
                  <a href="#about" className="text-white hover:text-bank-gold transition-colors">
                    About Us
                  </a>
                  <a href="#property-loan" className="text-white hover:text-bank-gold transition-colors">
                    Loan Against Property
                  </a>
                  <a href="#gold-loan" className="text-white hover:text-bank-gold transition-colors">
                    Gold Loan
                  </a>
                  <a href="#home-loan" className="text-white hover:text-bank-gold transition-colors">
                    Home Loan
                  </a>
                  <a href="#investor" className="text-white hover:text-bank-gold transition-colors">
                    Investor Relations
                  </a>
                  <a href="#join" className="text-white hover:text-bank-gold transition-colors">
                    Join Us
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/" className="flex items-center">
              <img 
                src="/lovable-uploads/b53786b1-0dc6-4208-b584-d10261c1bd66.png" 
                alt="FEDBANK Logo" 
                className="h-10 mr-2"
              />
            </a>
          </div>

          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="text-white hover:text-bank-gold transition-colors">
              About Us
            </a>
            <a href="#property-loan" className="text-white hover:text-bank-gold transition-colors">
              Loan Against Property
            </a>
            <a href="#gold-loan" className="text-white hover:text-bank-gold transition-colors">
              Gold Loan
            </a>
            <a href="#home-loan" className="text-white hover:text-bank-gold transition-colors">
              Home Loan
            </a>
            <a href="#investor" className="text-white hover:text-bank-gold transition-colors">
              Investor Relations
            </a>
            <a href="#join" className="text-white hover:text-bank-gold transition-colors">
              Join Us
            </a>
          </nav>

          <div className="flex items-center">
            <LoginDialog />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
