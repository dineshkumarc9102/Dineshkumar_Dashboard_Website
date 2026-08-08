import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  CalendarDays,
  Wallet,
  PiggyBank,
  BadgeIndianRupee,
} from "lucide-react";

const InflationCalc = () => {
  const [amount, setAmount] = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(10);

  const futureValue =
    amount * Math.pow(1 + inflation / 100, years);

  const increase = futureValue - amount;

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4 sm:p-6 pb-20 sm:pb-24">
      <div className="w-full max-w-md lg:max-w-xl">

        <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5">
            Inflation Calculator
          </h2>

          {/* Current Cost */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <IndianRupee size={18} />
                <span>Current Cost</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={1000}
              max={10000000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 accent-blue-500 cursor-pointer"
            />

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Inflation Rate */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <TrendingUp size={18} />
                <span>Inflation Rate</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {inflation}%
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={20}
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-full h-2 accent-green-500 cursor-pointer"
            />

            <input
              type="number"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <CalendarDays size={18} />
                <span>Duration</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {years} Years
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={50}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 accent-purple-500 cursor-pointer"
            />

            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Results */}
          <div className="space-y-3">

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <Wallet size={18} />
                <span>Current Value</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-semibold">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-orange-400">
                <PiggyBank size={18} />
                <span>Increase Due To Inflation</span>
              </div>

              <span className="text-sm sm:text-xl text-orange-400 font-semibold">
                ₹{increase.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-white">
                <BadgeIndianRupee size={20} />
                <span className="font-bold">
                  Future Cost
                </span>
              </div>

              <span className="font-bold text-white">
                ₹{futureValue.toLocaleString("en-IN", {
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

export default InflationCalc;
