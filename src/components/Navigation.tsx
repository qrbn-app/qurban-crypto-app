import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  onConnectWallet: () => void;
}

const Navigation = ({ onConnectWallet }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Animals", path: "/animals" },
    { name: "Pools", path: "/pools" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : [])
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-xl text-white">🌙</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">qrbn.app</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActiveRoute(item.path)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Wallet Connection */}
        <div className="hidden md:block">
          {user.isConnected && user.walletAddress ? (
            <div className="flex items-center space-x-3">
              {isAdmin && (
                <Badge className="bg-red-500 text-white">Admin</Badge>
              )}
              <div className="bg-accent px-3 py-2 rounded-lg text-sm font-medium text-primary">
                {formatWalletAddress(user.walletAddress)}
              </div>
            </div>
          ) : (
            <Button 
              onClick={onConnectWallet}
              className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-primary p-2 rounded-lg ${
                    isActiveRoute(item.path)
                      ? "text-primary bg-accent"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t">
                {user.isConnected && user.walletAddress ? (
                  <div className="space-y-3">
                    {isAdmin && (
                      <Badge className="bg-red-500 text-white">Admin</Badge>
                    )}
                    <div className="bg-accent px-4 py-3 rounded-lg text-sm font-medium text-primary">
                      {formatWalletAddress(user.walletAddress)}
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      onConnectWallet();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary-light text-white font-medium"
                  >
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export { Navigation };
