import { useState } from "react";
import api from "../../api/axiosInstance";






export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleScan = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    try {
      const { data } = await api.post("/scan", { url });
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
      <h2 className="text-xl font-semibold mb-4">URL Scanner</h2>

      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 rounded bg-slate-700 border border-slate-600 mb-4"
      />

      <button
        onClick={handleScan}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Scanning..." : "Scan URL"}
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
                    result.isPhishing ? "text-red-400" : "text-green-400"
                  }
                >
                  {result.isPhishing ? "Phishing" : "Safe"}
                </span>
              </p>
              <p>Confidence: {result.confidence}%</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}