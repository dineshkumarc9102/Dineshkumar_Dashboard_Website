import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  IndianRupee,
  Mailbox,
  ChartCandlestick,
  LogOut,
  RefreshCcw,
  Maximize2,
  Search,
  Package,
  TrendingUp,
  Home
} from "lucide-react";
import toast from "react-hot-toast";

import logo from "../assets/DK logo.svg";
import { useDashboard } from "../Context/DashboardContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { lastRefresh, onRefresh, onOpen } = useDashboard();

  const [loadingPage, setLoadingPage] = useState(false);

  const [fullScreen, setFullScreen] = useState(false);

  const [search, setSearch] = useState("");


  useEffect(() => {
    setLoadingPage(true);
    const timer = setTimeout(() => setLoadingPage(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully ✅");
    navigate("/login");
  };

  const formatDate = (date) =>
    date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSearch = (value) => {
    const v = value.toLowerCase();

    if (v.includes("salary")) {
      toast.success("Opening Salary Dashboard", {
        icon: <IndianRupee size={18} className="text-green-500" />,
      });
      navigate("/salary");
    }
    else if (v.includes("po")) {
      toast.success("Opening Post Office Dashboard", {
        icon: <Mailbox size={18} className="text-yellow-400" />,
      });
      navigate("/po");
    }
    else if (v.includes("stock")) {
      toast.success("Opening Stock Dashboard", {
        icon: <ChartCandlestick size={18} className="text-blue-400" />,
      });
      navigate("/stock");
    }
    else if (v.includes("home")) {
      toast.success("Back to Home", {
        icon: <Home size={18} className="text-purple-400" />,
      });
      navigate("/");
    }
    else {
      toast.error("No matching page found ❌");
    }

    setSearch("");
  };

  return (
    <div className="h-screen flex overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081421] via-[#0b1c2c] to-[#020617]" />

      <div className="relative flex w-full">

        {/* ✅ SIDEBAR */}
        {token && (
          <div className="w-16 md:w-56 min-w-[64px] md:min-w-[224px] bg-[#0b1c2c]/70 backdrop-blur-md flex flex-col border-r border-gray-700">

            {/* ✅ LOGO */}
            <div className="p-3 border-b border-gray-700">
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer w-full"
              >
                <img src={logo} alt="DK Logo" className="w-9 h-9 shrink-0" />

                <span className="hidden md:block text-white font-semibold text-sm truncate max-w-[140px]">
                  DK
                </span>
              </div>
            </div>

            {/* ✅ MENU */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">

              {[
                { name: "Salary", path: "/salary", icon: IndianRupee },
                { name: "PO", path: "/po", icon: Mailbox },
                { name: "Stock", path: "/stock", icon: ChartCandlestick },
              ].map((item, i) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <motion.button
                    key={i}
                    onClick={() => navigate(item.path)}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-3 p-2 rounded-lg group overflow-hidden"
                  >
                    {/* ACTIVE BACKGROUND */}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#162b3d] rounded-lg z-0"
                      />
                    )}

                    {/* HOVER GLOW */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/20 blur-xl transition z-0"></div>

                    <Icon
                      className={`relative z-10 ${active
                        ? "text-blue-400"
                        : "text-gray-400 group-hover:text-blue-400"
                        }`}
                    />

                    <span
                      className={`hidden md:block relative z-10 ${active
                        ? "text-white"
                        : "text-gray-300 group-hover:text-blue-400"
                        }`}
                    >
                      {item.name}
                    </span>
                  </motion.button>
                );
              })}

            </div>

            {/* ✅ ✅ LOGOUT MOVED TO BOTTOM ✅ ✅ */}
            <div className="p-3 border-t border-gray-700">
              <motion.button
                onClick={handleLogout}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center md:justify-start gap-3 w-full p-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-[#162b3d] transition"
              >
                <LogOut size={18} />

                <span className="hidden md:block text-sm">
                  Logout
                </span>
              </motion.button>
            </div>

          </div>
        )}

        {/* ✅ RIGHT SIDE */}
        <div className="flex-1 flex flex-col">

          {/* ✅ HEADER */}
          <div className="bg-[#0b1c2c]/70 backdrop-blur-md border-b border-gray-700 px-3 md:px-6 py-2">

            {/* ✅ ROW 1 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <h1 className="text-white font-semibold text-sm md:text-lg">
                Personal Financial Intelligence Dashboard
              </h1>

              {/* ✅ SEARCH BAR (LUCIDE ICON ✅) */}
              <div className="relative w-full  md:w-60">

                {/* ICON */}
                <Search
                  size={16}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(search);
                    }
                  }}
                  className="w-full bg-[#162b3d] text-white pl-8 pr-2 py-2 rounded-lg text-xs md:text-sm border border-gray-600 outline-none focus:ring-2 focus:ring-blue-400" />

              </div>

            </div>

            {/* ✅ ROW 2 */}
            <div className="flex items-center justify-between mt-2">

              {/* MOBILE */}
              <div className="md:hidden text-[11px] text-gray-400">
                {formatDate(lastRefresh)}
              </div>

              {/* DESKTOP */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {formatDate(lastRefresh)}
              </div>

              {/* BUTTONS */}
              <div className="flex items-center gap-4">

                <button
                  onClick={() => {
                    onRefresh();
                    toast("Dashboard refreshed ✅");
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-300 hover:text-green-400 hover:bg-[#162b3d] transition"
                >
                  <RefreshCcw size={16} />
                  <span className="hidden md:block text-xs">Refresh</span>
                </button>

                {/* <button
                  onClick={() => setFullScreen(!fullScreen)}
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-[#162b3d] transition"
                >
                  <Maximize2 size={16} />
                  <span className="hidden md:block text-xs">
                    {fullScreen ? "Exit" : "Fullscreen"}
                  </span>
                </button> */}

              </div>

            </div>

          </div>

          {/* ✅ CONTENT */}
          <div className="flex-1 overflow-hidden relative">

            {loadingPage && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 h-[3px] bg-blue-500 z-50"
              />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>


          </div>

        </div>
      </div>
    </div>
  );
}
