import { useEffect, useRef, useState, } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { RefreshCcw, ExternalLink } from "lucide-react";
import { useDashboard } from "../Context/DashboardContext";

export default function DashboardFrame({
    title,
    url,
}) {
    const [loading, setLoading] = useState(true);
    const iframeRef = useRef(null);

    const {
        setLastRefresh,
        setOnRefresh,
        setOnOpen,
    } = useDashboard();

    const handleRefresh = () => {
        if (!iframeRef.current) return;

        iframeRef.current.src = iframeRef.current.src;
        setLoading(true);

        setLastRefresh(new Date());

        toast.custom(() => (
            <div className="flex items-center gap-2 bg-[#162b3d] text-white px-4 py-2 rounded-lg shadow">
                <RefreshCcw
                    size={16}
                    className="text-green-400 animate-spin"
                />
                <span>
                    Refreshing {title} dashboard
                </span>
            </div>
        ));
    };

    const handleOpen = () => {
        window.open(url, "_blank");

        toast.custom(() => (
            <div className="flex items-center gap-2 bg-[#162b3d] text-white px-4 py-2 rounded-lg shadow">
                <ExternalLink
                    size={16}
                    className="text-blue-400"
                />
                <span>
                    Opened {title} dashboard
                </span>
            </div>
        ));
    };

    useEffect(() => {
        setOnRefresh(() => handleRefresh);
        setOnOpen(() => handleOpen);
    }, []);

    const { zoom } = useOutletContext();

    return (
        <div className="bg-[#081421] h-full flex flex-col">
            <div className="flex-1 p-2">
                <div className="relative w-full h-full border-2 border-gray-600 rounded-xl overflow-hidden">

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        src={
                            url
                                ? `${url}&filterPaneEnabled=false`
                                : ""
                        }
                        className="w-full h-full border-0"
                        title={title}
                        style={{
                            width: `${100 / zoom}%`,
                            height: `${100 / zoom}%`,
                            transform: `scale(${zoom})`,
                            transformOrigin: "top left",
                            border: "none",
                        }}
                        onLoad={() => setLoading(false)}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
