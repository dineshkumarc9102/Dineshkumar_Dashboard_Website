import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  CalendarDays,
  Wallet,
  PiggyBank,
  BadgeIndianRupee,
} from "lucide-react";

export default function SWPCalc() {
  const [corpus, setCorpus] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  let balance = corpus;
  let totalWithdrawn = 0;

  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate);
    balance -= withdrawal;

    if (balance <= 0) {
      balance = 0;
      break;
    }

    totalWithdrawn += withdrawal;
  }

  const finalValue = balance;
  const gains = finalValue + totalWithdrawn - corpus;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4 sm:p-6 pb-20 sm:pb-24">
      <div className="w-full max-w-md lg:max-w-xl">

        <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5">
            SWP Calculator
          </h2>

          {/* Initial Corpus */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <Wallet size={18} />
                <span>Initial Corpus</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                ₹{corpus.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={100000}
              max={50000000}
              step={100000}
              value={corpus}
              onChange={(e) => setCorpus(Number(e.target.value))}
              className="w-full h-2 accent-blue-500 cursor-pointer"
            />

            <input
              type="number"
              value={corpus}
              onChange={(e) => setCorpus(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg"
            />
          </div>

          {/* Monthly Withdrawal */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <IndianRupee size={18} />
                <span>Monthly Withdrawal</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-medium">
                ₹{withdrawal.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={1000}
              max={500000}
              step={1000}
              value={withdrawal}
              onChange={(e) => setWithdrawal(Number(e.target.value))}
              className="w-full h-2 accent-orange-500 cursor-pointer"
            />

            <input
              type="number"
              value={withdrawal}
              onChange={(e) => setWithdrawal(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg"
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
              className="w-full h-2 accent-green-500"
            />

            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg"
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
              max={40}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 accent-purple-500"
            />

            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full mt-3 h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600 text-base sm:text-lg"
            />
          </div>

          {/* Results */}
          <div className="space-y-3">

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-gray-300">
                <IndianRupee size={18} />
                <span>Total Withdrawn</span>
              </div>

              <span className="text-sm sm:text-xl text-white font-semibold">
                ₹{totalWithdrawn.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-green-400">
                <PiggyBank size={18} />
                <span>Net Gain</span>
              </div>

              <span className="text-sm sm:text-xl text-green-400 font-semibold">
                ₹{gains.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-2 sm:p-3 flex justify-between items-center">
              <div className="text-sm sm:text-xl flex items-center gap-2 text-white">
                <BadgeIndianRupee size={20} />
                <span className="font-bold">
                  Remaining Corpus
                </span>
              </div>

              <span className="font-bold text-white">
                ₹{finalValue.toLocaleString("en-IN", {
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