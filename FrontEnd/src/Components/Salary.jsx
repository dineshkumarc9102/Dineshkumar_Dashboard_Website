import { useEffect, useRef, useState } from "react";
import { useDashboard } from "../Context/DashboardContext";
import toast from "react-hot-toast";

const exportCSV = () => {
  const data = [{ name: "Sample", value: 100 }];

  const csv = [
    Object.keys(data[0]).join(","),
    ...data.map((r) => Object.values(r).join(",")),
  ].join("\n");

  const blob = new Blob([csv]);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "salary_export.csv";
  a.click();

  // ✅ better toast
  toast.success("Salary data exported ✅");
};

export default function Salary() {
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefreshLocal] = useState(new Date());

  const iframeRef = useRef(null);

  const { setLastRefresh, setOnRefresh, setOnOpen } = useDashboard();

  const handleRefresh = () => {
    if (!loading && iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      setLoading(true);

      const now = new Date();
      setLastRefreshLocal(now);
      setLastRefresh(now);

      toast("Salary dashboard refreshed ✅");
    }
  };
  const handleOpen = () => {
    window.open(import.meta.env.VITE_POWERBI_SALARY, "_blank");

    toast.success("Opened Salary in new tab 🚀");
  };

  useEffect(() => {
  setOnRefresh(() => handleRefresh);
  setOnOpen(() => handleOpen);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        handleRefresh();
      }
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#081421] h-full flex flex-col">

      <div className="flex-1 relative overflow-hidden">

        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#081421]/70 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="absolute inset-0 overflow-auto bg-black flex md:justify-center p-2">
          <div className="w-full h-full">
            <div className="w-full h-full border-2 border-gray-600 rounded-xl overflow-hidden">
              <iframe
                ref={iframeRef}
                src={`${import.meta.env.VITE_POWERBI_SALARY}&filterPaneEnabled=false`}
                className="w-full h-full border-0"
                title="Salary Dashboard"
                onLoad={() => setLoading(false)}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
