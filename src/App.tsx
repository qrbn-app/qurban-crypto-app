import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { WalletModal } from "@/components/WalletModal";
import Index from "./pages/Index";
import Animals from "./pages/Animals";
import Pools from "./pages/Pools";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

const AppContent = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { user, connectWallet } = useAuth();

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletConnected = (address: string) => {
    connectWallet(address);
    setIsWalletModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onConnectWallet={handleConnectWallet} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
