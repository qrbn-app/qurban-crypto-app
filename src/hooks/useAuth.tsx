
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  walletAddress?: string;
  role: 'user' | 'admin';
  isConnected: boolean;
}

interface AuthContextType {
  user: User;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    isConnected: false,
    role: 'user'
  });

  // Mock admin addresses - in production this would come from backend
  const adminAddresses = [
    '0x1234567890123456789012345678901234567890',
    '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
  ];

  const connectWallet = (address: string) => {
    const role = adminAddresses.includes(address) ? 'admin' : 'user';
    setUser({
      walletAddress: address,
      role,
      isConnected: true
    });
  };

  const disconnectWallet = () => {
    setUser({
      isConnected: false,
      role: 'user'
    });
  };

  const isAdmin = user.isConnected && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, connectWallet, disconnectWallet, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
