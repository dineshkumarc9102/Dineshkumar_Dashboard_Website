import { useEffect, useRef, useState } from "react";
import { useDashboard } from "../Context/DashboardContext";
import toast from "react-hot-toast";
import { RefreshCcw, ExternalLink } from "lucide-react";

export default function Stock() {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  const { setLastRefresh, setOnRefresh, setOnOpen } = useDashboard();

  // ✅ REFRESH FUNCTION (CLEAN)
  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src; // reload iframe
      setLoading(true);

      setLastRefresh(new Date());

      toast.custom(() => (
        <div className="flex items-center gap-2 bg-[#162b3d] text-white px-4 py-2 rounded-lg shadow">
          <RefreshCcw size={16} className="text-green-400 animate-spin" />
          <span>Refreshing dashboard</span>
        </div>
      ));

    }
  };

  // ✅ OPEN IN NEW TAB
  const handleOpen = () => {
    window.open(import.meta.env.VITE_POWERBI_STOCK, "_blank");
    toast.custom(() => (
      <div className="flex items-center gap-2 bg-[#162b3d] text-white px-4 py-2 rounded-lg shadow">
        <ExternalLink size={16} className="text-blue-400" />
        <span>Opened in new tab</span>
      </div>
    ));
  };

  // ✅ INIT
  useEffect(() => {
    setOnRefresh(() => handleRefresh);
    setOnOpen(() => handleOpen);
  }, []);

  return (
    <div className="bg-[#081421] h-full flex flex-col">

      {/* ✅ POWER BI DASHBOARD */}
      <div className="flex-1 p-2">
        <div className="w-full h-full border-2 border-gray-600 rounded-xl overflow-hidden">

          {/* ✅ LOADER (Optional clean UX) */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={
              import.meta.env.VITE_POWERBI_STOCK
                ? `${import.meta.env.VITE_POWERBI_STOCK}&filterPaneEnabled=false`
                : ""
            }
            className="w-full h-full border-0"
            title="Stock Dashboard"
            onLoad={() => setLoading(false)}
          ></iframe>

        </div>
      </div>

    </div>
  );
}
