import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

export default function PLCalc() {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(120);
  const [quantity, setQuantity] = useState(100);

  const investment = buyPrice * quantity;
  const saleValue = sellPrice * quantity;
  const profitLoss = saleValue - investment;
  const profitLossPercent =
    investment > 0 ? (profitLoss / investment) * 100 : 0;

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4">
      <div className="w-full max-w-md lg:max-w-xl">
        <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-5">
            Profit & Loss Calculator
          </h2>

          {/* Buy Price */}
          <div className="mb-5">
            <label className="text-gray-300 text-sm sm:text-xl flex items-center gap-2 mb-2">
              <IndianRupee size={18} />
              Buy Price
            </label>

            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(Number(e.target.value))}
              className="w-full h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600"
            />
          </div>

          {/* Sell Price */}
          <div className="mb-5">
            <label className="text-gray-300 text-sm sm:text-xl flex items-center gap-2 mb-2">
              <TrendingUp size={18} />
              Sell Price
            </label>

            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(Number(e.target.value))}
              className="w-full h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600"
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm sm:text-xl flex items-center gap-2 mb-2">
              <Wallet size={18} />
              Quantity
            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-8 sm:h-10 px-4 rounded-2xl bg-[#162b3d] text-white border border-slate-600"
            />
          </div>

          {/* Results */}
          <div className="space-y-3">

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between">
              <span className="text-gray-300">Investment</span>

              <span className="text-white font-semibold">
                ₹{investment.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between">
              <span className="text-gray-300">Sale Value</span>

              <span className="text-white font-semibold">
                ₹{saleValue.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-[#162b3d] rounded-2xl p-2 sm:p-3 flex justify-between">
              <span
                className={`font-medium ${
                  profitLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                Profit / Loss
              </span>

              <span
                className={`font-semibold ${
                  profitLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                ₹{profitLoss.toLocaleString("en-IN")}
              </span>
            </div>

            <div
              className={`rounded-2xl p-2 sm:p-3 flex justify-between ${
                profitLoss >= 0
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-red-500 to-rose-500"
              }`}
            >
              <div className="flex items-center gap-2 text-white">
                <BadgeIndianRupee size={20} />
                <span className="font-bold">P/L %</span>
              </div>

              <span className="font-bold text-white">
                {profitLossPercent.toFixed(2)}%
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
