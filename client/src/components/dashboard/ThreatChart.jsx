import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { useState } from 'react';
import { BarChart2, PieChart as PieIcon } from 'lucide-react';

// ── Custom Tooltip ────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl
                    p-3 shadow-xl text-xs">
      <p className="text-slate-300 font-semibold mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color }} />
          <span className="text-slate-400 capitalize">{p.name}:</span>
          <span className="text-white font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── Process scans into chart data ─────────────────────
const processScans = (scans) => {
  const days = {};
  scans.forEach((scan) => {
    const date = new Date(scan.createdAt)
      .toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    if (!days[date]) days[date] = { date, phishing: 0, suspicious: 0, safe: 0 };
    days[date][scan.result] = (days[date][scan.result] || 0) + 1;
  });
  return Object.values(days).slice(-7);
};

// ── Pie data ──────────────────────────────────────────
const processPie = (scans) => {
  const counts = { phishing: 0, suspicious: 0, safe: 0 };
  scans.forEach((s) => { counts[s.result] = (counts[s.result] || 0) + 1; });
  return [
    { name: 'Phishing', value: counts.phishing, color: '#ef4444' },
    { name: 'Suspicious', value: counts.suspicious, color: '#f59e0b' },
    { name: 'Safe', value: counts.safe, color: '#10b981' },
  ].filter((d) => d.value > 0);
};

export default function ThreatChart({ scans = [] }) {
  const [view, setView] = useState('area'); // 'area' | 'pie'

  const areaData = processScans(scans);
  const pieData = processPie(scans);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50
                    rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-lg">
            Threat Analytics
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Last 7 days scan results
          </p>
        </div>

        {/* Toggle View */}
        <div className="flex items-center gap-1 bg-slate-900
                        border border-slate-700 rounded-xl p-1">
          <button
            onClick={() => setView('area')}
            className={`p-2 rounded-lg transition
                        ${view === 'area'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'}`}
          >
            <BarChart2 size={16} />
          </button>
          <button
            onClick={() => setView('pie')}
            className={`p-2 rounded-lg transition
                        ${view === 'pie'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'}`}
          >
            <PieIcon size={16} />
          </button>
        </div>
      </div>

      {/* Chart */}
      {scans.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-slate-500">No scan data yet</p>
        </div>
      ) : view === 'area' ? (

        // ── Area Chart ──────────────────────────────────
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="phishing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="suspicious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="safe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            />
            <Area
              type="monotone" dataKey="phishing"
              stroke="#ef4444" strokeWidth={2}
              fill="url(#phishing)"
            />
            <Area
              type="monotone" dataKey="suspicious"
              stroke="#f59e0b" strokeWidth={2}
              fill="url(#suspicious)"
            />
            <Area
              type="monotone" dataKey="safe"
              stroke="#10b981" strokeWidth={2}
              fill="url(#safe)"
            />
          </AreaChart>
        </ResponsiveContainer>

      ) : (

        // ── Pie Chart ───────────────────────────────────
        <div className="flex items-center justify-center gap-8">
          <ResponsiveContainer width="50%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.color}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Pie Legend */}
          <div className="space-y-4">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: d.color }} />
                <div>
                  <p className="text-white text-sm font-medium">
                    {d.name}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {d.value} scans
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}