import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  CalendarDays,
  Wallet,
  PiggyBank,
  BadgeIndianRupee,
} from "lucide-react";

export default function StepUpCalc() {
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  let maturity = 0;
  let invested = 0;
  const monthlyRate = rate / 12 / 100;

  for (let year = 0; year < years; year++) {
    const yearlySIP = amount * Math.pow(1 + stepUp / 100, year);

    for (let month = 0; month < 12; month++) {
      const remainingMonths =
        years * 12 - (year * 12 + month);

      maturity +=
        yearlySIP *
        Math.pow(1 + monthlyRate, remainingMonths);

      invested += yearlySIP;
    }
  }

  const returns = maturity - invested;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4 sm:p-6 pb-20 sm:pb-24">
      <div className="w-full max-w-md lg:max-w-xl">

        <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5">
            Step-Up SIP Calculator
          </h2>

          {/* Monthly Investment */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <IndianRupee size={18} />
                <span>Monthly Investment</span>
              </div>
              <span className="text-sm sm:text-xl text-white font-medium">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={100}
              max={100000}
              step={100}
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

          {/* Step Up Percentage */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <TrendingUp size={18} />
                <span>Yearly Step-Up</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {stepUp}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={30}
              value={stepUp}
              onChange={(e) =>
                setStepUp(Number(e.target.value))
              }
              className="w-full h-2 accent-orange-500 cursor-pointer"
            />

            <input
              type="number"
              value={stepUp}
              onChange={(e) =>
                setStepUp(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Return Rate */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <TrendingUp size={18} />
                <span>Expected Return</span>
              </div>
              <span className="text-sm sm:text-xl text-white font-medium">
                {rate}%
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={30}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 cursor-pointer accent-green-500"
            />

            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <CalendarDays size={18} />
                <span>Investment Duration</span>
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
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 cursor-pointer accent-purple-500"
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
                <span>Invested Amount</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-semibold">
                ₹{invested.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-green-400">
                <PiggyBank size={18} />
                <span>Estimated Returns</span>
              </div>

              <span className="text-sm sm:text-xl text-green-400 font-semibold">
                ₹{returns.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-white">
                <BadgeIndianRupee size={20} />
                <span className="font-bold">
                  Maturity Value
                </span>
              </div>

              <span className="font-bold text-white">
                ₹{maturity.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
}