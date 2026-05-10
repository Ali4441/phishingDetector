import { useState } from "react";
import api from "../api/axiosInstance";

export const useScan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 URL Scan
  const scanUrl = async (url) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post("/scan-url", { url });

      return data;
    } catch (err) {
      console.error(err);
      setError("URL scan failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 📧 Email Scan
  const scanEmail = async (content) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post("/scan-email", { content });

      return data;
    } catch (err) {
      console.error(err);
      setError("Email scan failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    scanUrl,
    scanEmail,
    loading,
    error,
  };
};