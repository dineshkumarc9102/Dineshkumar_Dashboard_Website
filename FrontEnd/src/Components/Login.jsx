import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

import logo from "../assets/DK logo.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [successAnim, setSuccessAnim] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("savedUser");
    if (savedUser) setUsername(savedUser);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setStatus("empty");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { username, password }
      );

      // Save previous login
      // Save previous login
      const previousLogin = localStorage.getItem("loginTime");

      if (previousLogin) {
        localStorage.setItem("lastLogin", previousLogin);
      }

      // Save current login
      localStorage.setItem(
        "loginTime",
        new Date().toISOString()
      );

      // Increase login count
      const loginCount =
        Number(localStorage.getItem("loginCount")) || 0;

      localStorage.setItem(
        "loginCount",
        loginCount + 1
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("savedUser", username);

      setStatus("success");
      setSuccessAnim(true);

      setTimeout(() => {
        navigate("/");
      }, 900);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const [progress, setProgress] = useState(5);

  useEffect(() => {
    if (!loading) return;

    setProgress(5);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p; // hold near end
        return p + (Math.random() * 8); // natural random progress
      });
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#081421] relative overflow-hidden">

      {/* ✅ SUCCESS ANIMATION */}
      <AnimatePresence>
        {successAnim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.4 }}
              transition={{ duration: 0.6 }}
              className="text-green-400 text-2xl font-semibold"
            >
              ✔ Access Granted
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff20_1px,transparent_1px),linear-gradient(90deg,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ✅ GLOW */}
      <div className="absolute w-80 h-80 bg-blue-500/20 blur-3xl top-10 left-10" />
      <div className="absolute w-80 h-80 bg-purple-500/20 blur-3xl bottom-10 right-10" />

      {/* ✅ MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          x: status === "error" ? [0, -10, 10, -5, 5, 0] : 0,
        }}
        className="relative z-10 p-[1px] rounded-2xl 
        bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500
        shadow-[0_0_20px_#3b82f6]"
      >
        {/* ✅ INNER CARD */}
        <div className="bg-[#0b1c2c]/90 backdrop-blur-md rounded-2xl p-7 w-[320px] text-white">

          {/* ✅ LOGO FIXED ✅ */}
          <motion.div
            className="flex justify-center mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src={logo}
              alt="DK Logo"
              className="w-12 h-12 object-contain drop-shadow-[0_0_6px_#3b82f6]"
            />
          </motion.div>

          {/* ✅ TITLE */}
          <h2 className="text-xl font-semibold text-center mb-5">
            Financial Intelligence Dashboard
          </h2>

          {/* ✅ USERNAME */}
          <input
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            className={`w-full p-3 mb-4 rounded-lg bg-[#162b3d] border ${status === "empty"
              ? "border-red-500"
              : "border-gray-600 focus:ring-2 focus:ring-blue-400"
              }`}
          />

          {/* ✅ PASSWORD */}
          <div className="relative mb-4">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
              className={`w-full p-3 pr-10 rounded-lg bg-[#162b3d] border ${status === "empty"
                ? "border-red-500"
                : "border-gray-600 focus:ring-2 focus:ring-purple-400"
                }`}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* ✅ STATUS */}
          <div className="h-6 mb-3 text-center text-sm flex justify-center gap-2">
            {status === "error" && (
              <>
                <XCircle className="text-red-400" size={16} />
                <span className="text-red-400">Invalid login</span>
              </>
            )}
            {status === "empty" && (
              <>
                <XCircle className="text-red-400" size={16} />
                <span className="text-red-400">Fill all fields</span>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-green-400">Success</span>
              </>
            )}
          </div>

          {/* ✅ BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
          {loading && (
            <div className="mt-4">

              {/* ✅ LABEL */}
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Loading...</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              {/* ✅ BAR CONTAINER */}
              <div className="w-full h-[6px] bg-[#162b3d] rounded-full overflow-hidden relative">

                {/* ✅ PROGRESS FILL */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                  className="h-full rounded-full 
        bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400
        shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                />

                {/* ✅ SHINE EFFECT 🔥 */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="absolute top-0 left-0 h-full w-1/3 
        bg-white/20 blur-sm"
                />

              </div>

            </div>
          )}

          <p className="text-center text-gray-400 text-sm mt-4 italic">
            Secure dashboard access
          </p>

        </div>
      </motion.div>

    </div>
  );
}
