import { useEffect, useState, useMemo } from "react";
import api from "../api/axiosInstance";
import Loader from "../components/common/Loader";
import {
  AlertTriangle,
  ShieldAlert,
  Search,
  Trash2,
  Bot,
} from "lucide-react";

export default function AlertsPage() {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔥 Fetch alerts
  useEffect(() => {

    const fetchAlerts = async () => {

      try {

        const { data } =
          await api.get("/scan/history");

        const filteredAlerts =
          data.scans.filter(
            (item) =>
              item.result === "phishing" ||
              item.result === "suspicious"
          );

        setAlerts(filteredAlerts);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchAlerts();

  }, []);

  // 🔎 Search
  const filtered = useMemo(() => {

    let data = [...alerts];

    if (search) {

      data = data.filter((item) => {

        const text =
          item.input ||
          "";

        return text
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    }

    return data;

  }, [alerts, search]);

  // 🧹 Clear
  const clearAlerts = () => {
    setAlerts([]);
  };

  if (loading) {
    return (
      <Loader message="Loading alerts..." />
    );
  }

  return (

    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldAlert className="text-red-500" size={34} />
            Security Alerts
          </h1>

          <p className="text-slate-400 mt-1 text-sm">
            Monitor phishing and suspicious activity detected by AI.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">

          {/* Search */}
          <div className="relative">

            <Search
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search alerts..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                pl-10 pr-4 py-2.5
                rounded-xl
                bg-slate-900/70
                border border-slate-700
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-red-500
                transition
                w-64
              "
            />
          </div>

          {/* Clear */}
          <button
            onClick={clearAlerts}
            className="
              flex items-center gap-2
              px-4 py-2.5
              rounded-xl
              bg-red-600/90
              hover:bg-red-700
              text-white
              transition
              shadow-lg shadow-red-900/30
            "
          >
            <Trash2 size={16} />
            Clear
          </button>

        </div>
      </div>

      {/* 📋 ALERTS */}
      <div className="grid gap-5">

        {filtered.map((item, index) => {

          const isCritical =
            item.confidence > 85;

          return (

            <div
              key={index}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                ${isCritical
                  ? `
                      border-red-500/30
                      bg-gradient-to-br
                      from-red-500/10
                      to-slate-900
                      hover:shadow-red-900/20
                    `
                  : `
                      border-yellow-500/20
                      bg-gradient-to-br
                      from-yellow-500/10
                      to-slate-900
                      hover:shadow-yellow-900/20
                    `
                }
              `}
            >

              {/* Glow Effect */}
              <div
                className={`
                  absolute top-0 left-0 w-full h-1
                  ${isCritical
                    ? "bg-red-500"
                    : "bg-yellow-500"
                  }
                `}
              />

              <div className="p-5">

                <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                  {/* LEFT */}
                  <div className="flex gap-4">

                    {/* Icon */}
                    <div
                      className={`
                        h-12 w-12
                        rounded-xl
                        flex items-center justify-center
                        shrink-0
                        ${isCritical
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-300"
                        }
                      `}
                    >
                      <AlertTriangle size={22} />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">

                      {/* Input */}
                      <div className="text-sm text-slate-200 break-all leading-relaxed">
                        {item.input}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`
                            px-3 py-1
                            rounded-full
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wide
                            ${item.result === "phishing"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-400 text-black"
                            }
                          `}
                        >
                          {item.result}
                        </span>

                        <span className="
                          px-3 py-1
                          rounded-full
                          bg-slate-800
                          text-slate-300
                          text-[11px]
                        ">
                          Confidence: {item.confidence}%
                        </span>

                      </div>

                      {/* AI Reason */}
                      {item.details?.aiReason && (

                        <div className="
                          flex items-start gap-2
                          text-xs text-slate-400
                          bg-slate-900/60
                          border border-slate-800
                          rounded-xl
                          p-3
                          max-w-3xl
                        ">
                          <Bot
                            size={15}
                            className="mt-0.5 text-cyan-400 shrink-0"
                          />

                          <span>
                            {item.details.aiReason}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-xs text-slate-500 whitespace-nowrap lg:text-right">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (

        <div className="
          flex flex-col items-center justify-center
          py-20
          rounded-3xl
          border border-slate-800
          bg-slate-900/40
        ">

          <ShieldAlert
            size={55}
            className="text-slate-600 mb-4"
          />

          <h2 className="text-xl font-bold text-slate-300">
            No Threats Detected
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            Your system looks clean right now.
          </p>

        </div>
      )}

    </div>
  );
}