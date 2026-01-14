import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import LoginPage from '@/pages/LoginPage';
import { useAuthStore } from '@/store/useAuthStore';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
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
              <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">Dashboard Placeholder</h1>
                <p>Welcome to Sovware Flow Builder</p>
                <a href="/design" className="text-blue-500 underline mt-4 block">Go to Design Flow</a>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/design"
          element={
            <ProtectedRoute>
              <div className="p-10">Design Flow Placeholder</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;