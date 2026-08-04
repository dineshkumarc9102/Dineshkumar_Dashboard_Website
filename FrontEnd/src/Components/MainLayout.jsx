import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  RefreshCcw,
  Search,
  IndianRupee,
  Mailbox,
  ChartCandlestick,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import logo from "../assets/DK logo.svg";
import { useDashboard } from "../Context/DashboardContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const timerRef = useRef(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [search, setSearch] = useState("");

  const { lastRefresh, onRefresh } = useDashboard();

  useEffect(() => {
    setLoadingPage(true);
    const timer = setTimeout(() => setLoadingPage(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out ✅");
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

    if (v.includes("salary")) navigate("/salary");
    else if (v.includes("po")) navigate("/po");
    else if (v.includes("stock")) navigate("/stock");
    else if (v.includes("home")) navigate("/");
    else toast.error("No matching page ❌");

    setSearch("");
  };

  useEffect(() => {
    const page = location.pathname;

    if (
      page === "/salary" ||
      page === "/po" ||
      page === "/stock"
    ) {
      const visits =
        JSON.parse(localStorage.getItem("dashboardVisits")) || {};

      visits[page] = (visits[page] || 0) + 1;

      localStorage.setItem(
        "dashboardVisits",
        JSON.stringify(visits)
      );
    }
  }, [location.pathname]);

  useEffect(() => {

    const logout = () => {
      console.log("AUTO LOGOUT TRIGGERED ✅"); // debug
      localStorage.removeItem("token");
      toast.error("Session expired 🔒");
      navigate("/login");
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(logout, 3 * 60 * 1000); // 3 min 
    };

    // ✅ Track activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer); // ✅ add this

    // ✅ Start timer
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const events = [
        "mousemove",
        "keydown",
        "click",
        "scroll",
        "touchstart"
      ];

      events.forEach(event =>
        window.addEventListener(event, resetTimer)
      );

      return () => {
        events.forEach(event =>
          window.removeEventListener(
            event,
            resetTimer
          )
        );
      };
    };

  }, [navigate]);

  const pageTitles = {
    "/": "Home",
    "/salary": "Salary Dashboard",
    "/po": "PO Dashboard",
    "/stock": "Stock Dashboard",
  };

  const currentPage = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    localStorage.setItem("lastDashboard", currentPage);
  }, [currentPage]);
  return (
    <div className="h-screen flex overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081421] via-[#0b1c2c] to-[#020617]" />

      <div className="relative flex w-full">

        {/* ✅ SIDEBAR */}
        {token && (

          <div className="w-16 md:w-56 bg-[#0b1c2c]/70 backdrop-blur-md flex flex-col h-screen overflow-y-auto border-r border-gray-700">

            {/* LOGO */}
            <div className="p-3 border-b border-gray-700">
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={logo} className="w-9 h-9" />
                <span className="hidden md:block text-white leading-tight">
                  <span className="block text-sm font-semibold">
                    Financial Intelligence
                  </span>
                  <span className="block text-xs text-gray-400">
                    Dashboard
                  </span>
                </span>
              </div>
            </div>

            {/* MENU */}
            <div className="flex-1 p-3 space-y-2">
              {[
                { name: "Salary", path: "/salary", icon: IndianRupee },
                { name: "PO", path: "/po", icon: Mailbox },
                { name: "Stock", path: "/stock", icon: ChartCandlestick },
              ].map((item, i) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <button
                    key={i}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 p-2 rounded-lg w-full transition-all duration-300
                    ${active
                        ? "bg-[#162b3d] text-white border-l-4 border-blue-400"
                        : "text-gray-400 hover:text-blue-400 hover:bg-[#162b3d]"
                      }`}
                  >
                    <Icon size={18} />
                    <span className="hidden md:block">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* LOGOUT */}

            <div className="p-3 border-t border-gray-700 shrink-0">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-2 text-gray-300 hover:text-red-400"
              >
                <LogOut size={18} />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>


          </div>
        )}

        {/* ✅ MAIN */}
        <div className="flex-1 flex flex-col">

          {/* ✅ HEADER */}
          <div className="bg-[#0b1c2c]/70 backdrop-blur-md border-b border-gray-700 px-4 py-2">

            {/* ✅ TOP */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">

              {/* ✅ TITLE */}
              <h1 className="text-white text-sm md:text-lg font-semibold truncate">
                {currentPage}
              </h1>

              {/* ✅ SEARCH */}
              <div className="relative w-full md:w-52">
                <Search
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-2 py-1 text-white bg-[#162b3d] rounded-lg text-xs"
                />
              </div>

            </div>

            {/* ✅ BOTTOM */}
            <div className="flex justify-between items-center mt-2">

              {/* ✅ TIME */}
              <div className="text-[10px] md:text-xs text-gray-400">
                {formatDate(lastRefresh)}
              </div>

              {/* ✅ BUTTONS */}
              <div className="flex gap-2">

                {/* ✅ REFRESH */}
                <button
                  onClick={onRefresh}
                  className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1 rounded-lg text-gray-300 hover:text-green-400 hover:bg-[#162b3d]"
                >
                  <RefreshCcw size={14} md:size={16} />
                  <span className="hidden md:block text-xs">Refresh</span>
                </button>
              </div>

            </div>
          </div>


          {/* ✅ CONTENT */}
          <div className="flex-1 relative overflow-hidden">

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div >
  );
}
