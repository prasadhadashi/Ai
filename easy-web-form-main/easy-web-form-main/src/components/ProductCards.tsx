
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCards = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Loan Against Property Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-50 p-4 rounded-full">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDNiN2UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgOC0xMC04djE3YzAgLjgxNy42NzggMS41IDEuNSAxLjVoNWMuODIyIDAgMS41LS42NzggMS41LTEuNXYtNWMwLS44MjIuNjc4LTEuNSAxLjUtMS41aDJjLjgyMiAwIDEuNS42NzggMS41IDEuNXY1YzAgLjgyMi42NzggMS41IDEuNSAxLjVoNWMuODIyIDAgMS41LS42ODMgMS41LTEuNVYwTDEyIDhaIi8+PC9zdmc+" 
                  alt="Property Icon" 
                  className="h-12 w-12"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-bank-blue">Loan Against Property</h3>
            <p className="text-gray-600 mb-6">
              Fuel your business growth with customized loan solutions
            </p>
            <Button
              variant="outline"
              className="rounded-full border-bank-gold text-bank-blue hover:bg-bank-gold hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Gold Loan Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-50 p-4 rounded-full">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmOWEwMWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjxsaW5lIHgxPSIxMiIgeTE9IjEiIHgyPSIxMiIgeTI9IjMiLz48bGluZSB4MT0iMTIiIHkxPSIyMSIgeDI9IjEyIiB5Mj0iMjMiLz48bGluZSB4MT0iNC4yMiIgeTE9IjQuMjIiIHgyPSI1LjY0IiB5Mj0iNS42NCIvPjxsaW5lIHgxPSIxOC4zNiIgeTE9IjE4LjM2IiB4Mj0iMTkuNzgiIHkyPSIxOS43OCIvPjxsaW5lIHgxPSIxIiB5MT0iMTIiIHgyPSIzIiB5Mj0iMTIiLz48bGluZSB4MT0iMjEiIHkxPSIxMiIgeDI9IjIzIiB5Mj0iMTIiLz48bGluZSB4MT0iNC4yMiIgeTE9IjE5Ljc4IiB4Mj0iNS42NCIgeTI9IjE4LjM2Ii8+PGxpbmUgeDE9IjE4LjM2IiB5MT0iNS42NCIgeDI9IjE5Ljc4IiB5Mj0iNC4yMiIvPjwvc3ZnPg==" 
                  alt="Gold Icon" 
                  className="h-12 w-12"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-bank-blue">Gold Loan</h3>
            <p className="text-gray-600 mb-6">
              Monetize your gold effortlessly and ease financial worries
            </p>
            <Button
              variant="outline"
              className="rounded-full border-bank-gold text-bank-blue hover:bg-bank-gold hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Home Loan Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-50 p-4 rounded-full">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDNiN2UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMyA5bDkgLTlsOSA5Ii8+PHBhdGggZD0iTTUgOHYxMGExIDEgMCAwIDAgMSAxaDEybTAgLTExdjlhMyAzIDAgMCAwIDYgMHYtMSIvPjwvc3ZnPg==" 
                  alt="Home Icon" 
                  className="h-12 w-12"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-bank-blue">Home Loan</h3>
            <p className="text-gray-600 mb-6">
              Affordable home loans to make your homeownership dream a reality
            </p>
            <Button
              variant="outline"
              className="rounded-full border-bank-gold text-bank-blue hover:bg-bank-gold hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
