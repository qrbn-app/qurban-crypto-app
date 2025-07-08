
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Animal {
  id: number;
  type: string;
  totalShares: number;
  remainingShares: number;
  pricePerShare: number;
  location: string;
  photoUrl: string;
  isAvailable: boolean;
}

interface PurchaseFlowModalProps {
  animal: Animal | null;
  selectedToken: string;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete: (purchaseData: any) => void;
}

const PurchaseFlowModal = ({ 
  animal, 
  selectedToken, 
  isOpen, 
  onClose, 
  onPurchaseComplete 
}: PurchaseFlowModalProps) => {
  const [step, setStep] = useState(1);
  const [shares, setShares] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const { toast } = useToast();

  if (!animal) return null;

  const totalPrice = shares * animal.pricePerShare;
  const maxShares = Math.min(animal.remainingShares, animal.totalShares);

  const getAnimalEmoji = (type: string) => {
    switch (type) {
      case "goat": return "🐐";
      case "cow": return "🐄";
      case "sheep": return "🐑";
      default: return "🐄";
    }
  };

  const getTokenIcon = (token: string) => {
    switch (token) {
      case "USDT": return "₮";
      case "BTC": return "₿";
      case "ETH": return "Ξ";
      default: return "₮";
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 40)}`;
      setTxHash(mockTxHash);
      
      // Simulate successful purchase
      const purchaseData = {
        animalId: animal.id,
        animalType: animal.type,
        shares,
        totalPrice,
        token: selectedToken,
        txHash: mockTxHash,
        location: animal.location,
        purchaseDate: new Date().toISOString(),
        nftUrl: `https://example.com/nft/${mockTxHash}`
      };

      onPurchaseComplete(purchaseData);
      
      toast({
        title: "Purchase Successful!",
        description: `You have successfully purchased ${shares} share${shares > 1 ? 's' : ''} of ${animal.type}`,
      });
      
      setStep(4);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setShares(1);
    setTxHash("");
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <img 
                src={animal.photoUrl} 
                alt={animal.type}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 capitalize flex items-center space-x-2">
                  <span>{getAnimalEmoji(animal.type)}</span>
                  <span>{animal.type}</span>
                </h3>
                <p className="text-gray-600">📍 {animal.location}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="secondary">
                    {animal.remainingShares} / {animal.totalShares} available
                  </Badge>
                  <span className="text-lg font-semibold text-primary">
                    ${animal.pricePerShare}/share
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <Label htmlFor="shares" className="text-base font-medium">
                  Number of Shares
                </Label>
                <Input
                  id="shares"
                  type="number"
                  min="1"
                  max={maxShares}
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, Math.min(maxShares, parseInt(e.target.value) || 1)))}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum {maxShares} share{maxShares > 1 ? 's' : ''} available
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-primary">
                    {getTokenIcon(selectedToken)} {totalPrice}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {shares} share{shares > 1 ? 's' : ''} × ${animal.pricePerShare} each
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Review Your Order
              </h3>
              <p className="text-gray-600">
                Please confirm the details below before proceeding
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Animal:</span>
                <span className="font-medium capitalize">
                  {getAnimalEmoji(animal.type)} {animal.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{animal.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shares:</span>
                <span className="font-medium">{shares} / {animal.totalShares}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Token:</span>
                <span className="font-medium">
                  {getTokenIcon(selectedToken)} {selectedToken}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-primary">
                  {getTokenIcon(selectedToken)} {totalPrice}
                </span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Processing Payment
              </h3>
              <p className="text-gray-600">
                Please confirm the transaction in your wallet
              </p>
            </div>

            <div className="flex justify-center">
              {loading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
              ) : (
                <div className="text-6xl">💳</div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Amount:</strong> {getTokenIcon(selectedToken)} {totalPrice}<br />
                <strong>Token:</strong> {selectedToken}<br />
                <strong>Shares:</strong> {shares}
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="text-6xl">🎉</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Purchase Successful!
              </h3>
              <p className="text-gray-600">
                Your qurban contribution has been recorded on the blockchain
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Hash:</span>
                <span className="font-mono text-sm text-green-700">
                  {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shares Purchased:</span>
                <span className="font-medium">{shares}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NFT Certificate:</span>
                <span className="text-green-600 font-medium">✓ Minting</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              You will receive your NFT certificate and updates about your qurban animal.
              Check your dashboard for details.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {step === 1 && "Select Shares"}
              {step === 2 && "Review Order"}
              {step === 3 && "Payment"}
              {step === 4 && "Success"}
            </span>
            <Badge variant="secondary">{step}/4</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {renderStep()}
        </div>

        <div className="flex justify-between pt-4">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 2 && (
            <Button onClick={handleNext} className="ml-auto">
              Continue
            </Button>
          )}
          {step === 2 && (
            <Button onClick={handleNext} className="ml-auto">
              Proceed to Payment
            </Button>
          )}
          {step === 3 && (
            <Button 
              onClick={handlePayment} 
              disabled={loading}
              className="ml-auto"
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          )}
          {step === 4 && (
            <Button onClick={handleClose} className="ml-auto">
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { PurchaseFlowModal };
