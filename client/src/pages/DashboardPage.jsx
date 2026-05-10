import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import StatsCard from "../components/dashboard/StatsCard";
import ThreatChart from "../components/dashboard/ThreatChart";
import RecentScans from "../components/dashboard/RecentScans";
import Loader from "../components/common/Loader";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, h] = await Promise.all([
          api.get("/scan/stats"),
          api.get("/scan/history"),
        ]);

        setStats(s.data.stats);
        setScans(h.data.scans);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader message="Loading your dashboard..." />;

  return (
    <div className="space-y-8">

      {/*  HERO SECTION */}
      <div className="rounded-2xl p-6 bg-gradient-to-r
                      from-indigo-600 via-purple-600 to-pink-600
                      shadow-xl">
        <h1 className="text-3xl font-black text-white">
          Welcome Back
        </h1>
        <p className="text-white/80 mt-1">
          Monitor phishing threats and keep your system secure.
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard label="Total Scans" value={stats?.total} color="primary" />
        <StatsCard label="Phishing Found" value={stats?.phishing} color="danger" />
        <StatsCard label="Suspicious" value={stats?.suspicious} color="warning" />
        <StatsCard label="Safe" value={stats?.safe} color="success" />
      </div>

      {/* 📈 CHART + RECENT */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-5 bg-slate-800 border border-slate-700 shadow-lg">
            <h2 className="text-lg font-semibold mb-3">
              Threat Overview
            </h2>
            <ThreatChart scans={scans} />
          </div>
        </div>

        {/* Quick Insight */}
        <div className="rounded-2xl p-5 bg-slate-800 border border-slate-700 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">
            Insights
          </h2>

          <div className="space-y-3 text-sm text-slate-300">
            <p>⚠️ Stay alert on suspicious URLs</p>
            <p>📧 Email phishing is rising</p>
            <p>🔒 Regular scanning improves safety</p>
          </div>
        </div>
      </div>

      {/* 📋 RECENT SCANS */}
      <div className="rounded-2xl p-5 bg-slate-800 border border-slate-700 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Recent Scans
        </h2>
        <RecentScans scans={scans} />
      </div>
    </div>
  );
}