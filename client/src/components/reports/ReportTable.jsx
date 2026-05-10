import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function ReportTable({ reports = [] }) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br
                    from-slate-800 to-slate-900
                    border border-slate-700 shadow-xl">

      <h2 className="text-xl font-semibold mb-4">
        📊 Scan Reports
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          {/* Header */}
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="p-3">Type</th>
              <th className="p-3">Input</th>
              <th className="p-3">Status</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-slate-500">
                  No reports yet
                </td>
              </tr>
            ) : (
              reports.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 hover:bg-slate-800 transition"
                >
                  {/* Type */}
                  <td className="p-3">
                    {item.type === "url" ? "🌐 URL" : "📧 Email"}
                  </td>

                  {/* Input */}
                  <td className="p-3 max-w-xs truncate">
                    {item.input}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {item.isPhishing ? (
                        <>
                          <ShieldAlert className="text-red-400" size={18} />
                          <span className="text-red-400">Phishing</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="text-emerald-400" size={18} />
                          <span className="text-emerald-400">Safe</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Confidence */}
                  <td className="p-3 text-slate-300">
                    {item.confidence}%
                  </td>

                  {/* Date */}
                  <td className="p-3 text-slate-400 text-sm">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}