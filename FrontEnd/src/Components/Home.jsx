import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  Mailbox,
  ChartCandlestick,
  CheckCheck,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [lastLogin, setLastLogin] = useState("Never");
  const messages = [
    "Welcome to your dashboard",
    "Everything is under control",
    "Let's build something great",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const fullText = messages[index];

    const typing = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(typing);

        setTimeout(() => {
          setIndex((prev) => (prev + 1) % messages.length);
        }, 1500);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [index]);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : "Good Evening";

  const cards = [
    {
      title: "Salary",
      icon: IndianRupee,
      route: "/salary",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "PO",
      icon: Mailbox,
      route: "/po",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Stock",
      icon: ChartCandlestick,
      route: "/stock",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const [sessionTime, setSessionTime] =
    useState("00:00:00");

  const [loginCount, setLoginCount] =
    useState(0);

  useEffect(() => {
    setLoginCount(
      Number(localStorage.getItem("loginCount")) || 0
    );

    const savedLastLogin = localStorage.getItem("lastLogin");

    if (savedLastLogin) {
      setLastLogin(
        new Date(savedLastLogin).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    const visits =
      JSON.parse(localStorage.getItem("dashboardVisits")) || {};

    setDashboardVisits({
      salary: visits["/salary"] || 0,
      po: visits["/po"] || 0,
      stock: visits["/stock"] || 0,
    });

    const interval = setInterval(() => {
      const loginTime =
        localStorage.getItem("loginTime");

      if (!loginTime) return;

      const diff = Math.floor(
        (Date.now() -
          new Date(loginTime).getTime()) /
        1000
      );

      const hrs = String(
        Math.floor(diff / 3600)
      ).padStart(2, "0");

      const mins = String(
        Math.floor((diff % 3600) / 60)
      ).padStart(2, "0");

      const secs = String(
        diff % 60
      ).padStart(2, "0");

      setSessionTime(
        `${hrs}:${mins}:${secs}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [dashboardVisits, setDashboardVisits] = useState({
    salary: 0,
    po: 0,
    stock: 0,
  });

  const totalVisits =
    dashboardVisits.salary +
    dashboardVisits.po +
    dashboardVisits.stock || 1;

  const salaryPercent = Math.round(
    (dashboardVisits.salary / totalVisits) * 100
  );

  const poPercent = Math.round(
    (dashboardVisits.po / totalVisits) * 100
  );

  const stockPercent = Math.round(
    (dashboardVisits.stock / totalVisits) * 100
  );

  const mostUsed =
    Object.entries(dashboardVisits)
      .sort((a, b) => b[1] - a[1])[0];


  return (
    <div className="h-full overflow-y-auto text-white relative px-4 md:px-8 py-3 md:py-10">
      {/* GRID */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff20_1px,transparent_1px),linear-gradient(90deg,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* GLOW */}
      <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-blue-500/20 blur-3xl bottom-20 left-10 animate-pulse" />
      <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 blur-3xl top-20 right-10 animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* WELCOME */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          exit={{
            opacity: 0,
            y: -15
          }}

          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          className="mb-5 bg-[#0b1c2c]/60 backdrop-blur-md border border-gray-700 rounded-2xl p-3 md:p-8"
        >
          <div className="space-y-3">
            <h1 className="text-center md:text-left text-xl sm:text-3xl md:text-5xl font-bold">
              {greeting}, Dinesh Kumar
            </h1>

            <p className="text-blue-400 text-xs md:text-lg">
              {text}
              <span className="animate-pulse">|</span>
            </p>

            <p className=" flex items-center text-[11px] text-gray-400 whitespace-nowrap">
              Last Login

              <span className="ml-2 text-orange-400">
                {lastLogin}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#162b3d]/40 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-xs">
                  Login Count
                </p>

                <p className="font-bold text-green-400">
                  {loginCount}
                </p>
              </div>

              <div className="bg-[#162b3d]/40 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-xs">
                  Session
                </p>
                <div className="flex items-center justify-center gap-2 text-green-400 font-bold">                  <CheckCheck size={18} />
                  <span>Active</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* DASHBOARDS */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Dashboards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 ">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    boxShadow:
                      "0px 10px 30px rgba(59,130,246,0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(card.route);
                  }}
                  className={`cursor-pointer rounded-xl p-2 md:p-6
                    border border-white/10 hover:shadow-2xl
                    bg-gradient-to-r ${card.color} shadow-xl
                    transition-all duration-300`}
                >
                  <div className="flex items-center justify-center gap-3 md:gap-4 text-center">

                    <Icon
                      size={28}
                      className="md:w-8 md:h-8"
                    />

                    <div>
                      <h3 className="font-semibold text-sm md:text-lg">
                        {card.title}
                      </h3>

                      <p className="hidden md:block text-sm opacity-90">
                        Open Dashboard
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="mt-8">
          <h2 className="hidden md:block text-sm md:text-xl font-semibold mb-2 md:mb-4">
            Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">

            {/* DASHBOARD VISITS */}
            <div className="rounded-2xl p-4 md:p-6 bg-cyan-500/10 border border-cyan-500/30">
              <p className="text-gray-400 text-sm">
                Dashboard Visits
              </p>

              <div className="mt-4 space-y-2">

                <div>
                  <div className="flex justify-between text-xs">
                    <span>Salary ({dashboardVisits.salary})</span>
                    <span>{salaryPercent}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                    <div
                      className="h-2 rounded-full bg-green-400"
                      style={{
                        width: `${salaryPercent}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span>PO ({dashboardVisits.po})</span>
                    <span>{poPercent}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                    <div
                      className="h-2 rounded-full bg-blue-400"
                      style={{
                        width: `${poPercent}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span>Stock ({dashboardVisits.stock})</span>
                    <span>{stockPercent}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                    <div
                      className="h-2 rounded-full bg-purple-400"
                      style={{
                        width: `${stockPercent}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* MOST USED */}
            <div className="rounded-2xl p-4 bg-indigo-500/10 border border-indigo-500/30">
              <p className="text-gray-400 text-sm">
                Most Used
              </p>

              <h3 className="text-indigo-400 text-xl md:text-3xl font-bold mt-2 capitalize">
                {totalVisits > 0
                  ? mostUsed?.[0]
                  : "No Data"}
              </h3>
              <p className="hidden md:block text-gray-500 text-xs mt-2">
                Most frequently opened dashboard
              </p>
            </div>

            {/* SESSION DURATION */}
            <div className="rounded-2xl p-2 md:p-6 bg-blue-500/10 border border-blue-500/30">
              <p className="text-gray-400 text-sm">
                Session Duration
              </p>
              <h3 className="text-blue-400 text-xl md:text-3xl font-bold mt-2 ">
                {sessionTime}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* DESKTOP FLOATING DOTS */}
      <div className="hidden md:block">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-10 left-20 w-2 h-2 bg-blue-400 rounded-full"
        />

        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full"
        />
      </div>
    </div>
  );
}
