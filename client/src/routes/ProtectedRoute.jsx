import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function ProtectedRoute() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}