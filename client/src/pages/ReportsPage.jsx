import { useEffect, useState, useMemo } from "react";
import api from "../api/axiosInstance";
import ReportTable from "../components/reports/ReportTable";
import Loader from "../components/common/Loader";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔥 Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await api.get("/scan/history");
        setReports(data.scans || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ✅ Derived data (NO useEffect, NO setState)
  const filtered = useMemo(() => {
    let data = [...reports];

    // 🔎 Search
    if (search) {
      data = data.filter((item) => {
        const text = item.input || item.url || item.content || "";
        return text.toLowerCase().includes(search.toLowerCase());
      });
    }

    // 🔥 Filter
    if (filter === "phishing") {
      data = data.filter((item) => item.isPhishing === true);
    } else if (filter === "safe") {
      data = data.filter((item) => item.isPhishing === false);
    }

    return data;
  }, [reports, search, filter]);

  if (loading) return <Loader message="Loading reports..." />;

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-black">Reports</h1>

        <div className="flex gap-3">

          {/* 🔎 Search */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />

          {/* 🔥 Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option value="all">All</option>
            <option value="phishing">Phishing</option>
            <option value="safe">Safe</option>
          </select>
        </div>
      </div>

      {/* 📋 TABLE */}
      <ReportTable reports={filtered} />

      {/* 🚫 EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-center text-slate-400 py-10">
          No reports found 🚫
        </div>
      )}
    </div>
  );
}