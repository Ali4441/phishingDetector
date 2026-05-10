import { useState } from "react";
import UrlScanner from "../components/scanner/UrlScanner";
import EmailScanner from "../components/scanner/EmailScanner";

export default function ScannerPage() {
  const [activeTab, setActiveTab] = useState("url");

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-black">Scanner</h1>
        <p className="text-slate-400 text-sm">
          Analyze URLs and Emails for phishing threats
        </p>
      </div>

      {/* ⚡ TABS */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("url")}
          className={`px-4 py-2 rounded-lg transition ${activeTab === "url"
              ? "bg-indigo-600"
              : "bg-slate-800 hover:bg-slate-700"
            }`}
        >
          🌐 URL Scanner
        </button>

        <button
          onClick={() => setActiveTab("email")}
          className={`px-4 py-2 rounded-lg transition ${activeTab === "email"
              ? "bg-purple-600"
              : "bg-slate-800 hover:bg-slate-700"
            }`}
        >
          📧 Email Scanner
        </button>
      </div>

      {/* 📦 CONTENT */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Scanner */}
        <div>
          {activeTab === "url" ? <UrlScanner /> : <EmailScanner />}
        </div>

        {/* Info Panel */}
        <div className="rounded-2xl p-5 bg-slate-800 border border-slate-700 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">
            How it works
          </h2>

          <ul className="space-y-2 text-sm text-slate-300">
            <li>🔍 Enter URL or Email content</li>
            <li>⚡ System analyzes patterns</li>
            <li>🛡 Detects phishing attempts</li>
            <li>📊 Shows confidence score</li>
          </ul>

          <div className="mt-5 p-3 bg-slate-900 rounded-lg text-sm text-slate-400">
            Tip: Avoid clicking unknown links and always verify sources.
          </div>
        </div>
      </div>
    </div>
  );
}