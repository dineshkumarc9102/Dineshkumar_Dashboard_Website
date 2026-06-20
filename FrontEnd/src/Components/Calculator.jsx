import { useState, useRef, useEffect } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const calcRef = useRef(null);

  // ✅ DRAG STATE
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // ✅ KEYBOARD SUPPORT
  useEffect(() => {
    const keyHandler = (e) => {
      if (!visible) return;

      if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        setInput((p) => p + e.key);
      }

      if (e.key === "Enter") {
        try {
          setInput(eval(input).toString());
        } catch {
          setInput("Error");
        }
      }

      if (e.key === "Backspace") {
        setInput((p) => p.slice(0, -1));
      }

      if (e.key === "Escape") {
        setVisible(false);
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [input, visible]);

  if (!visible) return null;

  // ✅ DRAG START (MOUSE + TOUCH 🔥)
  const startDrag = (e) => {
    dragging.current = true;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    offset.current = {
      x: clientX - calcRef.current.offsetLeft,
      y: clientY - calcRef.current.offsetTop,
    };
  };

  // ✅ DRAG MOVE (MOUSE + TOUCH 🔥)
  const onDrag = (e) => {
    if (!dragging.current) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    calcRef.current.style.left = clientX - offset.current.x + "px";
    calcRef.current.style.top = clientY - offset.current.y + "px";

    // ✅ REMOVE CENTER TRANSFORM AFTER DRAG
    calcRef.current.style.transform = "none";
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  // ✅ CLICK HANDLER
  const handle = (v) => {
    if (v === "=") {
      try {
        return setInput(eval(input).toString());
      } catch {
        return setInput("Error");
      }
    }

    if (v === "C") return setInput("");

    setInput(input + v);
  };

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+"
  ];

  return (
    <div
      ref={calcRef}

      // ✅ DESKTOP DRAG
      onMouseMove={onDrag}
      onMouseUp={stopDrag}

      // ✅ MOBILE DRAG 🔥
      onTouchMove={onDrag}
      onTouchEnd={stopDrag}

      className="
      fixed z-50 
      bg-[#0b1c2c]/90 
      backdrop-blur-xl 
      border border-white/10 
      shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
      rounded-2xl 
      p-4 
      w-[95%] sm:w-[90%] md:max-w-sm 
      text-white
      "

      style={{
        top: "100px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >

      {/* ✅ HEADER (DRAG AREA) */}
      <div
        onMouseDown={startDrag}
        onTouchStart={startDrag} // ✅ MOBILE SUPPORT
        className="flex justify-between items-center mb-3 cursor-move"
      >
        <span className="text-sm font-semibold text-gray-300 tracking-wide">
          Calculator
        </span>

        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setMinimized(!minimized)}
            className="hover:text-yellow-400 transition"
          >
            —
          </button>

          <button
            onClick={() => setVisible(false)}
            className="hover:text-red-400 transition"
          >
            ✕
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* ✅ DISPLAY */}
          <div className="
            bg-gradient-to-br from-[#081421] to-[#0d2235]
            p-4 rounded-xl mb-4 text-right text-xl sm:text-2xl font-mono
            shadow-inner border border-white/5 tracking-wide
            overflow-x-auto
          ">
            {input || "0"}
          </div>

          {/* ✅ BUTTONS */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">

            <button
              onClick={() => handle("C")}
              className="col-span-4 bg-red-500/20 hover:bg-red-500/40 
              active:scale-95 transition p-2 rounded-xl text-sm sm:text-base"
            >
              Clear
            </button>

            {buttons.map((b, i) => (
              <button
                key={i}
                onClick={() => handle(b)}
                className={`
                p-2 sm:p-3 rounded-xl font-semibold transition-all duration-150
                active:scale-90 text-sm sm:text-base
                ${
                  ["+", "-", "*", "/"].includes(b)
                    ? "bg-blue-500/20 hover:bg-blue-500/40"
                    : b === "="
                    ? "bg-green-500/20 hover:bg-green-500/40"
                    : "bg-[#162b3d] hover:bg-[#1f3b55]"
                }
              `}
              >
                {b}
              </button>
            ))}

          </div>
        </>
      )}

    </div>
  );
}
