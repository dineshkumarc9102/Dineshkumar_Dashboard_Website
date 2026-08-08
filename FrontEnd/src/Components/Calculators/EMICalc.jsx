import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  CalendarDays,
  Wallet,
  PiggyBank,
  BadgeIndianRupee,
} from "lucide-react";

const EMICalc = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  const emi =
    monthlyRate > 0
      ? (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : loanAmount / months;

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4 sm:p-6 pb-20 sm:pb-24">
      <div className="w-full max-w-md lg:max-w-xl">
        <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5">
            EMI Calculator
          </h2>

          {/* Loan Amount */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <IndianRupee size={18} />
                <span>Loan Amount</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                ₹{loanAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={50000}
              max={10000000}
              step={50000}
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(Number(e.target.value))
              }
              className="w-full h-2 accent-blue-500 cursor-pointer"
            />

            <input
              type="number"
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <TrendingUp size={18} />
                <span>Interest Rate</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {rate}%
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
              className="w-full h-2 accent-green-500 cursor-pointer"
            />

            <input
              type="number"
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Loan Tenure */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <CalendarDays size={18} />
                <span>Loan Tenure</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {years} Years
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={40}
              value={years}
              onChange={(e) =>
                setYears(Number(e.target.value))
              }
              className="w-full h-2 accent-purple-500 cursor-pointer"
            />

            <input
              type="number"
              value={years}
              onChange={(e) =>
                setYears(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Results */}
          <div className="space-y-3">

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-300">
                <Wallet size={18} />
                <span>Loan Amount</span>
              </div>

              <span className="text-white font-semibold">
                ₹{loanAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-orange-400">
                <PiggyBank size={18} />
                <span>Total Interest</span>
              </div>

              <span className="text-orange-400 font-semibold">
                ₹{totalInterest.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-green-400">
                <BadgeIndianRupee size={18} />
                <span>Total Payment</span>
              </div>

              <span className="text-green-400 font-semibold">
                ₹{totalPayment.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <BadgeIndianRupee size={20} />
                <span className="font-bold">
                  Monthly EMI
                </span>
              </div>

              <span className="font-bold text-white text-lg">
                ₹{emi.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalc;