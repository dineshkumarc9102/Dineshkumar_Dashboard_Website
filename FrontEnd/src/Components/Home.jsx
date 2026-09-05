import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  Mailbox,
  ChartCandlestick,
  Coins,
  ArrowRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList
} from "recharts";
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
      title: "Post Office",
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
    {
      title: "Physical G&S",
      icon: Coins,
      route: "/gns",
      color: "from-yellow-500 to-orange-500",
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
      gns: visits["/gns"] || 0,
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
    gns: 0,
  });

  const totalVisits = Math.max(
    dashboardVisits.salary +
    dashboardVisits.po +
    dashboardVisits.stock +
    dashboardVisits.gns,
    1
  );

  const salaryPercent = Math.round(
    (dashboardVisits.salary / totalVisits) * 100
  );

  const poPercent = Math.round(
    (dashboardVisits.po / totalVisits) * 100
  );

  const stockPercent = Math.round(
    (dashboardVisits.stock / totalVisits) * 100
  );

  const gnsPercent = Math.round(
    (dashboardVisits.gns / totalVisits) * 100
  );

  const mostUsed =
    Object.entries(dashboardVisits)
      .sort((a, b) => b[1] - a[1])[0];

  const chartData = [
    {
      name: "Salary Dashboard",
      visits: dashboardVisits.salary,
    },
    {
      name: "Post Office Dashboard",
      visits: dashboardVisits.po,
    },
    {
      name: "Stock Dashboard",
      visits: dashboardVisits.stock,
    },
    {
      name: "Physical G&S Dashboard",
      visits: dashboardVisits.gns,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-[#0b1c2c] border border-cyan-500/30 px-3 py-2 rounded-xl shadow-lg">
        <p className="text-cyan-400 font-semibold">
          {payload[0].payload.name}
        </p>

        <p className="text-white text-sm">
          Visits: {payload[0].value}
        </p>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto text-white relative px-4 md:px-8 py-3 md:py-1">
      {/* GRID */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff20_1px,transparent_1px),linear-gradient(90deg,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* GLOW */}
      <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-blue-500/20 blur-3xl bottom-20 left-10 animate-pulse" />
      <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 blur-3xl top-20 right-10 animate-pulse" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

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
          className="mt-5 mb-5 bg-[#0b1c2c]/60 backdrop-blur-md border border-gray-700 rounded-2xl p-3 md:p-8"
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
          </div>
        </motion.div>

        {/* DASHBOARDS */}
        <div className="mb-8">
          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-lg md:text-xl font-semibold mb-4"
          >
            Dashboards
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 ">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{
                    opacity: 0,
                    y: 50
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    rotateX: 5
                  }}
                  whileTap={{
                    scale: 0.97
                  }}
                  onClick={() => navigate(card.route)}
                  className={`
                            relative cursor-pointer overflow-hidden
                            rounded-2xl md:rounded-3xl p-4 md:p-6 min-h-[120px] md:min-h-[180px]
                            bg-gradient-to-br ${card.color}
                            shadow-xl border border-white/10
                            transition-all duration-300
                            group`}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative h-full flex flex-col justify-between">

                    {/* Top */}
                    <div className="flex items-center md:block gap-3">
                      <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                        <motion.div
                          whileHover={{
                            rotate: 15,
                            scale: 1.2
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300
                          }}
                        >
                          <Icon
                            size={20}
                            className="md:w-7 md:h-7 text-white"
                          />
                        </motion.div>
                      </div>

                      <div>
                        <h3 className="text-base md:text-xl font-bold text-white">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-medium text-white/90">
                        Open Dashboard
                      </span>

                      <motion.div
                        animate={{
                          x: [0, 50]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5
                        }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
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

          <motion.div
            className="grid grid-cols-1  gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                rotateX: 5
              }} className="grid grid-cols-2 md:grid-cols-4 gap-3">

              <div className="bg-[#162b3d]/50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Total Visits
                </p>
                <h3 className="text-2xl font-bold text-cyan-400">
                  {totalVisits}
                </h3>
              </div>

              <div className="bg-[#162b3d]/50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Login Count
                </p>
                <h3 className="text-2xl font-bold text-green-400">
                  {loginCount}
                </h3>
              </div>

              <div className="bg-[#162b3d]/50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Session Time
                </p>
                <h3 className="text-lg font-bold text-blue-400">
                  {sessionTime}
                </h3>
              </div>

              <div className="bg-[#162b3d]/50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Most Used
                </p>
                <h3 className="text-xl font-bold text-purple-400 capitalize">
                  {mostUsed?.[0] || "-"}
                </h3>
              </div>
            </motion.div>

            {/* DASHBOARD VISITS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                rotateX: 5
              }}
              className="rounded-2xl p-4 md:p-6 bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <div>
                <p className="text-gray-400 mb-2">
                  Dashboard Usage
                </p>

                <div className="h-56 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#22d3ee"
                          />

                          <stop
                            offset="100%"
                            stopColor="#0ea5e9"
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1e293b"
                      />

                      <XAxis
                        dataKey="name"
                        tick={{
                          fill: "#94a3b8",
                          fontSize: window.innerWidth < 768 ? 10 : 12,
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        width={25}
                        tick={{
                          fill: "#94a3b8",
                          fontSize: 10,
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                          fill: "rgba(34,211,238,0.08)",
                        }}
                      />

                      <Bar
                        dataKey="visits"
                        radius={[10, 10, 0, 0]}
                        fill="url(#barGradient)"
                        animationDuration={1200}
                      >
                        <LabelList
                          dataKey="visits"
                          position="top"
                          fill="#e2e8f0"
                          fontSize={11}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </motion.div>


          </motion.div>
        </div>

      </motion.div>

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
