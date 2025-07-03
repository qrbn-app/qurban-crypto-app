
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface AnimalCardProps {
  animal: Animal;
  selectedToken: string;
  onSelect: (animal: Animal) => void;
}

const AnimalCard = ({ animal, selectedToken, onSelect }: AnimalCardProps) => {
  const getAnimalEmoji = (type: string) => {
    switch (type) {
      case "goat":
        return "🐐";
      case "cow":
        return "🐄";
      case "sheep":
        return "🐑";
      default:
        return "🐄";
    }
  };

  const getShareText = () => {
    if (animal.totalShares === 1) {
      return "Full Animal";
    }
    return `${animal.remainingShares}/${animal.totalShares} shares available`;
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200">
        <img
          src={animal.photoUrl}
          alt={`${animal.type} for qurban`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
            if (nextElement) {
              nextElement.style.display = "flex";
            }
          }}
        />
        <div 
          className="absolute inset-0 hidden items-center justify-center text-6xl"
          style={{ display: "none" }}
        >
          {getAnimalEmoji(animal.type)}
        </div>
        
        <div className="absolute top-4 right-4">
          {animal.isAvailable ? (
            <Badge className="bg-green-500 text-white">Available</Badge>
          ) : (
            <Badge variant="secondary">Sold Out</Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getAnimalEmoji(animal.type)}</span>
            <span className="capitalize text-xl font-bold text-gray-900">
              {animal.type}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${animal.pricePerShare}
            </div>
            <div className="text-sm text-gray-500">{selectedToken}</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">📍 {animal.location}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Shares:</span>
            <span className="font-medium text-gray-900">{getShareText()}</span>
          </div>
          
          <Button
            className="w-full bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50"
            disabled={!animal.isAvailable}
            onClick={() => onSelect(animal)}
          >
            {animal.isAvailable ? "Select Animal" : "Sold Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AnimalCard };
