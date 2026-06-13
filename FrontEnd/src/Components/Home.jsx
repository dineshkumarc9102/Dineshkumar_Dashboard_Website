import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const messages = [
    "Welcome to your dashboard",
    "Everything is under control",
    "Let’s build something great",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // ✅ Typing animation
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

  return (
    <div className="h-full flex flex-col items-center justify-center text-white relative overflow-hidden px-4">

      {/* ✅ GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff20_1px,transparent_1px),linear-gradient(90deg,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ✅ FLOATING GLOW */}
      <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-blue-500/20 blur-3xl animate-pulse bottom-20 left-10"></div>
      <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 blur-3xl animate-pulse top-20 right-10"></div>

      {/* ✅ CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >

        {/* ✅ BIG TITLE */}
        <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-wide">
          Welcome Dinesh Kumar
        </h1>

        {/* ✅ SUB TEXT */}
        <p className="text-gray-400 text-sm md:text-lg mb-2">
          Dashboard Control Center
        </p>

        {/* ✅ TYPING LINE */}
        <p className="text-blue-400 text-base md:text-xl min-h-[28px] mb-6">
          {text}
          <span className="animate-pulse">|</span>
        </p>

        {/* ✅ ANIMATED LINE */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1 }}
          className="h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
        />

      </motion.div>

      {/* ✅ FLOATING DOTS (UNIQUE TOUCH 🔥) */}
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
  );
}