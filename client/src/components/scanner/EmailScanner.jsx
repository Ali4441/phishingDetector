import { useState } from "react";
import api from "../../api/axiosInstance";

export default function EmailScanner() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleScan = async () => {
    if (!emailText) return;

    setLoading(true);
    setResult(null);

    try {
      const { data } = await api.post("/scan", {
        type: "email",
        input: emailText,
      });
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({
        error: error?.response?.data?.message || "Scan failed",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 bg-slate-800 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Email Scanner</h2>

      <textarea
        placeholder="Paste email content here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        className="w-full p-2 rounded bg-slate-700 border border-slate-600 mb-4 h-32"
      />

      <button
        onClick={handleScan}
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Scanning..." : "Scan Email"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-slate-700 rounded">
          {result.error ? (
            <p className="text-red-400">{result.error}</p>
          ) : (
            <>
              <p>
                Status:{" "}
                <span
                  className={
                    result.scan.result === "phishing"
                      ? "text-red-400"
                      : result.scan.result === "suspicious"
                        ? "text-yellow-400"
                        : "text-green-400"
                  }
                >
                  {result.scan.result}
                </span>
              </p>

              <p>
                Confidence: {result.scan.confidence}%
              </p>

              {result.scan.details?.aiReason && (
                <p className="mt-2 text-sm text-slate-300">
                  AI Reason: {result.scan.details.aiReason}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}