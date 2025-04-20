
import { User, MapPin, Phone, Smartphone } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-1/4 right-0 z-40">
      <div className="flex flex-col space-y-2">
        {/* Login Portals */}
        <a 
          href="#login" 
          className="flex flex-col items-center justify-center bg-bank-blue-light hover:bg-bank-blue text-white p-4 transition-colors"
        >
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs text-center">Login<br />Portals</span>
        </a>

        {/* Branch Locator */}
        <a 
          href="#branches" 
          className="flex flex-col items-center justify-center bg-bank-blue-light hover:bg-bank-blue text-white p-4 transition-colors"
        >
          <MapPin className="h-6 w-6 mb-1" />
          <span className="text-xs text-center">Branch<br />Locator</span>
        </a>

        {/* Support */}
        <a 
          href="#support" 
          className="flex flex-col items-center justify-center bg-bank-blue-light hover:bg-bank-blue text-white p-4 transition-colors"
        >
          <Phone className="h-6 w-6 mb-1" />
          <span className="text-xs text-center">Support</span>
        </a>

        {/* Download the App */}
        <a 
          href="#app" 
          className="flex flex-col items-center justify-center bg-bank-blue-light hover:bg-bank-blue text-white p-4 transition-colors"
        >
          <Smartphone className="h-6 w-6 mb-1" />
          <span className="text-xs text-center">Download<br />the App</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
