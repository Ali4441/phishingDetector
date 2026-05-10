import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 Load user data
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  // 👤 Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await api.put("/auth/update-profile", profile);

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await api.put("/auth/change-password", password);

      setMessage("Password changed successfully 🔒");
      setPassword({ current: "", new: "" });

    } catch (err) {
      setMessage("Password update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-black">Settings</h1>

      {/* 👤 PROFILE */}
      <div className="p-6 bg-slate-800 border border-slate-700 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
            placeholder="Name"
          />

          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
            placeholder="Email"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* 🔒 PASSWORD */}
      <div className="p-6 bg-slate-800 border border-slate-700 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.new}
            onChange={(e) =>
              setPassword({ ...password, new: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>

      {/* 🚪 LOGOUT */}
      <div className="p-6 bg-slate-800 border border-slate-700 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Account</h2>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* 🔔 MESSAGE */}
      {message && (
        <div className="text-sm text-center text-slate-300">
          {message}
        </div>
      )}
    </div>
  );
}