import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import DesignPage from '@/pages/DesignPage';
import { useAuthStore } from '@/store/useAuthStore';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('auth-storage');
      if (!token) {
        logout();
        navigate('/login');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout, navigate]);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/design"
          element={
            <ProtectedRoute>
              <DesignPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;