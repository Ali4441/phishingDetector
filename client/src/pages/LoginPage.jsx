import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axiosInstance";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/login", form);

      // IMPORTANT: store token + user
      login(data.user, data.token);

      navigate("/dashboard");

    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white px-4">

      {/*  LOGIN CARD */}
      <div className="w-full max-w-md p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-black text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mb-6 text-sm">
          Login to continue scanning threats
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-indigo-500"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* LINKS */}
        <p className="text-sm text-slate-400 text-center mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/*  FOOTER */}
      <footer className="mt-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} PhisherGuard
      </footer>
    </div>
  );
}