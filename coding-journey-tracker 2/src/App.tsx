import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DashboardPage from "./pages/Dashboard";
import DailyPlanPage from "./pages/DailyPlan";
import JourneyLogPage from "./pages/JourneyLog";
import StatsPage from "./pages/Stats";
import LoginPage from "./pages/Login";
import { Toaster } from "./components/ui/toaster";

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppContent() {
  const [exportDataCallback, setExportDataCallback] = useState<(() => void) | undefined>(undefined);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <>
                <Header onExportData={exportDataCallback} />
                <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <DashboardPage setExportCallback={setExportDataCallback} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/daily-plan"
                      element={
                        <ProtectedRoute>
                          <DailyPlanPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/journey-log"
                      element={
                        <ProtectedRoute>
                          <JourneyLogPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/stats"
                      element={
                        <ProtectedRoute>
                          <StatsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
                <footer className="py-4 border-t">
                  <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    Coding Journey Tracker © {new Date().getFullYear()}
                  </div>
                </footer>
              </>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
