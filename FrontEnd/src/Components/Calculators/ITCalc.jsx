
import { useMemo, useState } from "react";
import {
  IndianRupee,
  TrendingDown,
  Wallet,
  ReceiptIndianRupee,
  BadgeIndianRupee,
  Info,
} from "lucide-react";

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Number.isFinite(value) ? value : 0));

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, Number(value) || 0));

const calculateSlabTax = (income, slabs) => {
  let tax = 0;
  let previousLimit = 0;

  for (const { limit, rate } of slabs) {
    const taxableInSlab = Math.max(
      0,
      Math.min(income, limit) - previousLimit
    );

    tax += taxableInSlab * rate;
    previousLimit = limit;

    if (income <= limit) break;
  }

  return tax;
};

export default function ITCalc() {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [regime, setRegime] = useState("new");

  const results = useMemo(() => {
    const income = Math.max(0, annualIncome);
    const standardDeduction = regime === "new" ? 75000 : 50000;
    const allowedOtherDeductions = regime === "old" ? Math.max(0, deductions) : 0;
    const taxableIncome = Math.max(
      0,
      income - standardDeduction - allowedOtherDeductions
    );

    const newSlabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.1 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.2 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.3 },
    ];

    const oldSlabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 },
    ];

    let taxBeforeRebate = calculateSlabTax(
      taxableIncome,
      regime === "new" ? newSlabs : oldSlabs
    );

    let rebate = 0;

    if (regime === "new" && taxableIncome <= 1200000) {
      rebate = Math.min(taxBeforeRebate, 60000);
    }

    if (regime === "old" && taxableIncome <= 500000) {
      rebate = Math.min(taxBeforeRebate, 12500);
    }

    let taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);

    // Simplified marginal relief for ordinary slab-rate income just above ₹12 lakh.
    if (regime === "new" && taxableIncome > 1200000) {
      const excessIncome = taxableIncome - 1200000;
      taxAfterRebate = Math.min(taxAfterRebate, excessIncome);
    }

    const cess = taxAfterRebate * 0.04;
    const totalTax = taxAfterRebate + cess;
    const netAnnualIncome = income - totalTax;

    return {
      standardDeduction,
      taxableIncome,
      taxBeforeRebate,
      rebate,
      cess,
      totalTax,
      netAnnualIncome,
      monthlyTax: totalTax / 12,
      effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
    };
  }, [annualIncome, deductions, regime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-2 sm:p-3 pb-20 sm:pb-24">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl border border-slate-700 bg-[#0b1c2c]/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Income Tax Calculator
          </h2>
          <p className="mb-5 text-center text-sm text-slate-400">
            FY 2026-27 estimate for resident individuals below 60
          </p>

          <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#162b3d] p-2 sm:p-3">
            {["new", "old"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRegime(item)}
                className={`rounded-xl py-2 px-2 font-semibold transition ${
                  regime === item
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {item === "new" ? "New Regime" : "Old Regime"}
              </button>
            ))}
          </div>

          <div className="mb-5">
            <div className="mb-2 flex justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300 sm:text-lg">
                <IndianRupee size={19} />
                <span>Annual Gross Income</span>
              </div>
              <span className="text-sm font-medium text-white sm:text-lg">
                {formatINR(annualIncome)}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={10000000}
              step={50000}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-blue-500"
            />

            <input
              type="number"
              min={0}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(clamp(e.target.value, 0, 1000000000))}
              className="mt-3 h-8 sm:h-10 w-full rounded-2xl border border-slate-600 bg-[#162b3d] px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg"
            />
          </div>

          <div className={`mb-6 ${regime === "new" ? "opacity-50" : ""}`}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300 sm:text-lg">
                <TrendingDown size={19} />
                <span>Other Deductions</span>
              </div>
              <span className="text-sm font-medium text-white sm:text-lg">
                {regime === "old" ? formatINR(deductions) : "Not applied"}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={500000}
              step={5000}
              value={deductions}
              disabled={regime === "new"}
              onChange={(e) => setDeductions(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-purple-500 disabled:cursor-not-allowed"
            />

            <input
              type="number"
              min={0}
              value={deductions}
              disabled={regime === "new"}
              onChange={(e) => setDeductions(clamp(e.target.value, 0, 10000000))}
              className="mt-3 h-8 sm:h-10 w-full rounded-2xl border border-slate-600 bg-[#162b3d] px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-not-allowed sm:text-lg"
            />
          </div>

          <div className="space-y-3">
            <ResultRow
              icon={<Wallet size={18} />}
              label="Standard Deduction"
              value={formatINR(results.standardDeduction)}
            />
            <ResultRow
              icon={<ReceiptIndianRupee size={18} />}
              label="Taxable Income"
              value={formatINR(results.taxableIncome)}
            />
            <ResultRow
              icon={<TrendingDown size={18} />}
              label="Rebate"
              value={formatINR(results.rebate)}
              accent="text-emerald-400"
            />
            <ResultRow
              icon={<ReceiptIndianRupee size={18} />}
              label="Health & Education Cess"
              value={formatINR(results.cess)}
            />

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-2 sm:p-3">
              <div className="flex items-center gap-2 text-white">
                <BadgeIndianRupee size={21} />
                <span className="font-bold">Estimated Tax</span>
              </div>
              <span className="text-lg font-bold text-white sm:text-xl">
                {formatINR(results.totalTax)}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-700 bg-[#102439] p-2 sm:p-3">
              <p className="text-xs text-slate-400">Monthly tax</p>
              <p className="mt-1 font-semibold text-white">
                {formatINR(results.monthlyTax)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-[#102439] p-2 sm:p-3">
              <p className="text-xs text-slate-400">Effective rate</p>
              <p className="mt-1 font-semibold text-white">
                {results.effectiveRate.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* <div className="mt-5 flex gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-5 text-amber-100">
            <Info size={17} className="mt-0.5 shrink-0" />
            <p>
              This is an estimate for ordinary slab-rate income. It excludes surcharge,
              special-rate income such as capital gains, age-based old-regime slabs,
              and several deduction-specific rules. Consult a tax professional before filing.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function ResultRow({ icon, label, value, accent = "text-gray-300" }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#162b3d] p-2 sm:p-3">
      <div className={`flex items-center gap-2 text-sm sm:text-lg ${accent}`}>
        {icon}
        <span>{label}</span>
      </div>
      <span className={`text-sm font-semibold sm:text-lg ${accent === "text-gray-300" ? "text-white" : accent}`}>
        {value}
      </span>
    </div>
  );
}
