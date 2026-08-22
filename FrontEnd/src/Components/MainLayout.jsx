import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  RefreshCcw,
  Search,
  IndianRupee,
  Mailbox,
  ChartCandlestick,
  LogOut,
  Calculator,
  Coins,
  Menu, X,
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
  const [openCalculator, setOpenCalculator] = useState(false);
  const { lastRefresh, onRefresh } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);


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
    else if (v.includes("post") || v.includes("po")) navigate("/po");
    else if (v.includes("stock")) navigate("/stock");
    else if (v.includes("gold") || v.includes("silver")) navigate("/gns");
    else if (v.includes("basic")) navigate("/calculator/basic");
    else if (v.includes("emi")) navigate("/calculator/emi");
    else if (v.includes("sip")) navigate("/calculator/sip");
    else if (v.includes("fd")) navigate("/calculator/fd");
    else if (v.includes("inflation")) navigate("/calculator/inflation");
    else if (v.includes("income") || v.includes("tax") || v.includes("it")) navigate("/calculator/it");
    else if (v.includes("lumpsum") || v.includes("lump")) navigate("/calculator/lump");
    else if (v.includes("profit") || v.includes("loss") || v.includes("pl")) navigate("/calculator/pl");
    else if (v.includes("ppf")) navigate("/calculator/ppf");
    else if (v.includes("rd")) navigate("/calculator/rd");
    else if (v.includes("stepup") || v.includes("step up")) navigate("/calculator/stepup");
    else if (v.includes("swp")) navigate("/calculator/swp");
    else toast.error("No matching page ❌");

    setSearch("");
  };

  useEffect(() => {
    const page = location.pathname;

    if (
      page === "/salary" ||
      page === "/po" ||
      page === "/stock" ||
      page === "/gns"
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
      localStorage.removeItem("token");
      toast.error("Session expired 🔒");
      navigate("/login");
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(logout, 3 * 60 * 1000);
    };

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate]);

  const pageTitles = {
    "/salary": "Salary Dashboard",
    "/po": "Post Office Dashboard",
    "/stock": "Stock Dashboard",
    "/gns": "Physical G&S Dashboard",

    "/calculator/basic": "Basic Calculator",
    "/calculator/emi": "EMI Calculator",
    "/calculator/fd": "FD Calculator",
    "/calculator/inflation": "Inflation Calculator",
    "/calculator/it": "Income Tax Calculator",
    "/calculator/lump": "Lumpsum Calculator",
    "/calculator/pl": "Profit & Loss Calculator",
    "/calculator/ppf": "PPF Calculator",
    "/calculator/rd": "RD Calculator",
    "/calculator/sip": "SIP Calculator",
    "/calculator/stepup": "Step Up SIP Calculator",
    "/calculator/swp": "SWP Calculator"
  }
  const currentPage = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    localStorage.setItem("lastDashboard", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (location.pathname.startsWith("/calculator")) {
      setOpenCalculator(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081421] via-[#0b1c2c] to-[#020617]" />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="relative flex w-full">
        {token && (

          <div
            className={`
                      fixed lg:relative 
                      top-0 left-0 z-50
                      h-screen w-56
                      bg-[#0b1c2c]/95
                      backdrop-blur-md
                      border-r border-gray-700
                      transition-transform duration-300
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                      lg:translate-x-0
                      `}
          >

            {/* ✅ SIDEBAR */}

            {/* LOGO */}
            <div className="p-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={logo} className="w-9 h-9" alt="FinSight Logo" />
                  <span className=" text-white leading-tight">
                    <span className="block text-md font-semibold">
                      FinSight
                    </span>
                    <span className="block text-[9px] text-gray-400">
                      Financial Intelligence Dashboard
                    </span>
                  </span>
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* MENU */}
            <div className="flex-1 p-3 space-y-2">

              {/* Main Menus */}
              {[
                { name: "Salary", path: "/salary", icon: IndianRupee },
                { name: "Post Office", path: "/po", icon: Mailbox },
                { name: "Stock", path: "/stock", icon: ChartCandlestick },
                { name: "Physical G&S", path: "/gns", icon: Coins },
              ].map((item, i) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}

                    className={`flex items-center gap-3 p-2 rounded-lg w-full transition-all duration-300
                     ${active
                        ? "bg-[#162b3d] text-white border-l-4 border-blue-400"
                        : "text-gray-400 hover:text-blue-400 hover:bg-[#162b3d]"
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })}

              {/* Calculator Parent Menu */}
              <button
                onClick={() => setOpenCalculator(!openCalculator)}
                className={`flex items-center gap-3 p-2 rounded-lg w-full transition-all duration-300
                ${location.pathname.startsWith("/calculator")
                    ? "bg-[#162b3d] text-white border-l-4 border-blue-400"
                    : "text-gray-400 hover:text-blue-400 hover:bg-[#162b3d]"
                  }`}
              >
                <Calculator size={18} />
                <span>Calculators</span>
              </button>

              {/* Calculator Submenu */}
              <AnimatePresence>
                {openCalculator && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden ml-2 md:ml-6 space-y-1"
                  >
                    {[
                      { name: "Basic Calculator", path: "/calculator/basic" },
                      { name: "EMI Calculator", path: "/calculator/emi" },
                      { name: "FD Calculator", path: "/calculator/fd" },
                      { name: "Inflation Calculator", path: "/calculator/inflation" },
                      { name: "Income Tax Calculator", path: "/calculator/it" },
                      { name: "Lumpsum Calculator", path: "/calculator/lump" },
                      { name: "Profit & Loss Calculator", path: "/calculator/pl" },
                      { name: "PPF Calculator", path: "/calculator/ppf" },
                      { name: "RD Calculator", path: "/calculator/rd" },
                      { name: "SIP Calculator", path: "/calculator/sip" },
                      { name: "Step Up SIP Calculator", path: "/calculator/stepup" },
                      { name: "SWP Calculator", path: "/calculator/swp" },

                    ].map((item) => {
                      const active = location.pathname === item.path;

                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm transition-all
                            ${active
                              ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400"
                              : "text-gray-400 hover:text-white hover:bg-[#162b3d]"
                            }`}
                        >

                          {/* Desktop */}
                          <span className="truncate">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* LOGOUT */}

            <div className="p-3 border-t border-gray-700 shrink-0">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-2 text-gray-300 hover:text-red-400"
              >
                <LogOut size={18} />
                <span>Logout</span>
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-white"
                >
                  <Menu size={22} />
                </button>

                <h1 className="text-white text-sm md:text-lg font-semibold truncate">
                  {currentPage}
                </h1>
              </div>


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
            <div className="h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}  
