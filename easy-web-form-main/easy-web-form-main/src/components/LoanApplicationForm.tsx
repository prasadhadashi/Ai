
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const LoanApplicationForm = () => {
  const [loanType, setLoanType] = useState("Gold Loan");
  return <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Loan Type Select */}
        <select 
          value={loanType} 
          onChange={e => setLoanType(e.target.value)} 
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bank-gold text-gray-800 bg-white"
        >
          <option value="Gold Loan">Gold Loan</option>
          <option value="Home Loan">Home Loan</option>
          <option value="Loan Against Property">Loan Against Property</option>
        </select>

        {/* Pincode Input */}
        <Input type="text" placeholder="Pincode" className="bg-white text-gray-800" />

        {/* Mobile Number Input */}
        <Input type="tel" placeholder="Mobile Number" className="bg-white text-gray-800" />
      </div>

      {/* Apply Button */}
      <div className="space-y-2">
        <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold w-32">
          Apply
        </Button>
        <p className="text-sm text-gray-800">
          By clicking the Apply button, you agree to the{" "}
          <a href="#" className="text-bank-gold underline">
            T&C
          </a>
          .
        </p>
      </div>
    </div>;
};

export default LoanApplicationForm;
