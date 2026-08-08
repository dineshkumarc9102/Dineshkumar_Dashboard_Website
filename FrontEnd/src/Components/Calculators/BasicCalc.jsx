import { useState } from "react";
import { Delete } from "lucide-react";

export default function BasicCalc() {
    const [display, setDisplay] = useState("");

    const handleClick = (value) => {
        setDisplay((prev) => prev + value);
    };

    const clearDisplay = () => {
        setDisplay("");
    };

    const deleteLast = () => {
        setDisplay((prev) => prev.slice(0, -1));
    };

    const calculate = () => {
        try {
            const result = Function(
                `return (${display})`
            )();

            setDisplay(result.toString());
        } catch {
            setDisplay("Error");
        }
    };

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        ".", "0", "%", "+"
    ];

    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07111d] via-[#0d1f33] to-[#081018] p-4 sm:p-6 pb-20 sm:pb-24">
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">

      <div className="bg-[#0b1c2c]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-4 sm:p-6">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white mb-5">
          Basic Calculator
        </h2>

        {/* Display */}
        <div className="bg-[#162b3d] rounded-2xl p-4 sm:p-5 mb-5 text-right min-h-[80px] sm:min-h-[100px] flex items-end justify-end overflow-hidden">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white break-all">
            {display || "0"}
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">

          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className="
                h-14 sm:h-16 lg:h-20
                rounded-2xl
                bg-[#162b3d]
                text-lg sm:text-xl
                font-semibold
                text-white
                hover:bg-blue-600
                active:scale-95
                transition-all duration-200
              "
            >
              {btn}
            </button>
          ))}

          {/* Clear */}
          <button
            onClick={clearDisplay}
            className="
              h-14 sm:h-16 lg:h-20
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              font-semibold
              active:scale-95
              transition
            "
          >
            C
          </button>

          {/* Delete */}
          <button
            onClick={deleteLast}
            className="
              h-14 sm:h-16 lg:h-20
              rounded-2xl
              bg-orange-500
              hover:bg-orange-600
              flex justify-center items-center
              active:scale-95
              transition
            "
          >
            <Delete size={22} />
          </button>

          {/* Parentheses */}
          <button
            onClick={() => handleClick("(")}
            className="
              h-14 sm:h-16 lg:h-20
              rounded-2xl
              bg-[#162b3d]
              text-xl
              text-white
              hover:bg-blue-600
              active:scale-95
              transition
            "
          >
            (
          </button>

          <button
            onClick={() => handleClick(")")}
            className="
              h-14 sm:h-16 lg:h-20
              rounded-2xl
              bg-[#162b3d]
              text-xl
              text-white
              hover:bg-blue-600
              active:scale-95
              transition
            "
          >
            )
          </button>

          {/* Equal */}
          <button
            onClick={calculate}
            className="
              col-span-4
              h-14 sm:h-16 lg:h-20
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              via-indigo-500
              to-purple-500
              text-lg sm:text-xl
              font-bold
              hover:opacity-90
              active:scale-[0.98]
              transition-all
            "
          >
            =
          </button>

        </div>
      </div>

    </div>
  </div>
);
}