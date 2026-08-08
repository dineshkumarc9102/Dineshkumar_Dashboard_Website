import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  CalendarDays,
  Wallet,
  PiggyBank,
  BadgeIndianRupee,
} from "lucide-react";

export default function PPFCalc() {
  const [amount, setAmount] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  let balance = 0;

  for (let i = 0; i < years; i++) {
    balance += amount;
    balance *= (1 + rate / 100);
  }

  const invested = amount * years;
  const maturity = balance;
  const returns = maturity - invested;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4 sm:p-6 pb-20 sm:pb-24">
      <div className="w-full max-w-md lg:max-w-xl">

        <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5">
            PPF Calculator
          </h2>

          {/* Deposit Amount */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <IndianRupee size={18} />
                <span>Yearly Deposit</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={500}
              max={150000}
              step={100}
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
              className="w-full accent-blue-500"
            />

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <TrendingUp size={18} />
                <span>PPF Interest Rate</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {rate}%
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              step={0.1}
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
              className="w-full h-2 cursor-pointer accent-green-500"
            />

            <input
              type="number"
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <CalendarDays size={18} />
                <span>PPF Tenure</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                {years} Years
              </span>
            </div>

            <input
              type="range"
              min={15}
              max={50}
              value={years}
              onChange={(e) =>
                setYears(Number(e.target.value))
              }
              className="w-full h-2 cursor-pointer accent-purple-500"
            />

            <input
              type="number"
              value={years}
              onChange={(e) =>
                setYears(Number(e.target.value))
              }
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Results */}
          <div className="space-y-3">

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center  gap-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <Wallet size={18} />
                <span>Total Investment</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-semibold">
                ₹{invested.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center gap-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-green-400">
                <PiggyBank size={18} />
                <span>Interest Earned</span>
              </div>

              <span className="text-sm sm:text-xl text-green-400 font-semibold">
                ₹{returns.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-2 sm:p-3 flex justify-between items-center ">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-white">
                <BadgeIndianRupee size={20} />
                <span className="font-bold">
                  Maturity Amount
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
    </div>
  );
}