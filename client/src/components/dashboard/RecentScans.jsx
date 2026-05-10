import { useState } from 'react';
import {
  ShieldAlert, ShieldCheck, AlertTriangle,
  ExternalLink, ChevronLeft, ChevronRight,
  Clock, Globe, Mail
} from 'lucide-react';

// ── Result Badge ──────────────────────────────────────
const ResultBadge = ({ result }) => {
  const map = {
    phishing: { icon: ShieldAlert, cls: 'bg-red-500/10 text-red-400 border-red-500/30' },
    suspicious: { icon: AlertTriangle, cls: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    safe: { icon: ShieldCheck, cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  };
  const { icon: Icon, cls } = map[result] || map.safe;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1
                      rounded-full text-xs font-semibold border ${cls}`}>
      <Icon size={11} />
      {result?.charAt(0).toUpperCase() + result?.slice(1)}
    </span>
  );
};

// ── Confidence Bar ────────────────────────────────────
const ConfidenceBar = ({ value }) => {
  const color =
    value > 70 ? 'bg-red-500' :
      value > 40 ? 'bg-amber-500' :
        'bg-emerald-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full">
        <div
          className={`h-1.5 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 w-8 text-right">
        {value}%
      </span>
    </div>
  );
};

const ITEMS_PER_PAGE = 5;

export default function RecentScans({ scans = [] }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');

  // Filter
  const filtered = filter === 'all'
    ? scans
    : scans.filter((s) => s.result === filter);

  // Paginate
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const filters = ['all', 'phishing', 'suspicious', 'safe'];

  return (
    <div className="bg-slate-800/50 border border-slate-700/50
                    rounded-2xl p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center
                      justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-bold text-lg">Recent Scans</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {filtered.length} results found
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium
                          capitalize transition
                          ${filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-3">
          <ShieldCheck size={40} className="text-slate-600" />
          <p className="text-slate-500">No scans found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                {['Type', 'Input', 'Result', 'Confidence', 'Time'].map((h) => (
                  <th key={h}
                    className="text-left text-xs text-slate-500
                                 uppercase tracking-wider pb-3 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {paginated.map((scan, i) => (
                <tr key={scan._id || i}
                  className="hover:bg-slate-700/20 transition group">

                  {/* Type */}
                  <td className="py-3 pr-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-700/50
                                    flex items-center justify-center">
                      {scan.type === 'url'
                        ? <Globe size={14} className="text-indigo-400" />
                        : <Mail size={14} className="text-purple-400" />
                      }
                    </div>
                  </td>

                  {/* Input */}
                  <td className="py-3 pr-4 max-w-[200px]">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-300 truncate">
                        {scan.input}
                      </p>
                      <ExternalLink
                        size={12}
                        className="text-slate-600 group-hover:text-indigo-400
                                   flex-shrink-0 transition"
                      />
                    </div>
                  </td>

                  {/* Result */}
                  <td className="py-3 pr-4">
                    <ResultBadge result={scan.result} />
                  </td>

                  {/* Confidence */}
                  <td className="py-3 pr-4 min-w-[120px]">
                    <ConfidenceBar value={scan.confidence || 0} />
                  </td>

                  {/* Time */}
                  <td className="py-3">
                    <div className="flex items-center gap-1.5
                                    text-slate-500 text-xs">
                      <Clock size={11} />
                      {new Date(scan.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6
                        pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg bg-slate-700 text-slate-400
                         hover:text-white disabled:opacity-30
                         disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium
                            transition
                            ${page === p
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:text-white'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg bg-slate-700 text-slate-400
                         hover:text-white disabled:opacity-30
                         disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}