import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

const WalletModal = ({ isOpen, onClose, onConnect }: WalletModalProps) => {
  const wallets = [
    {
      name: "Sui Wallet",
      icon: "🟦",
      description: "Official Sui wallet extension",
      popular: true,
    },
    {
      name: "Suiet Wallet",
      icon: "🔵",
      description: "Multi-chain wallet with Sui support",
      popular: false,
    },
    {
      name: "Ethos Wallet",
      icon: "⚡",
      description: "User-friendly Sui wallet",
      popular: false,
    },
  ];

  const handleWalletConnect = (walletName: string) => {
    console.log(`Connecting to ${walletName}...`);
    // Mock wallet connection - use admin address for testing
    const adminAddress = "0x1234567890123456789012345678901234567890";
    onConnect(adminAddress);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            Connect Your Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {wallets.map((wallet) => (
            <Card
              key={wallet.name}
              className="border-2 hover:border-primary cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => handleWalletConnect(wallet.name)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{wallet.icon}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">
                        {wallet.name}
                      </h3>
                      {wallet.popular && (
                        <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {wallet.description}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400">→</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 py-2">
          New to crypto wallets?{" "}
          <a href="#" className="text-primary hover:underline">
            Learn how to get started
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { WalletModal };
