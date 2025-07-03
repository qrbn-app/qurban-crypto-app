import { useState, useEffect } from "react";
import { AnimalCard } from "@/components/AnimalCard";
import { TokenSelector } from "@/components/TokenSelector";
import { IslamicPattern } from "@/components/IslamicPattern";
import { PurchaseFlowModal } from "@/components/PurchaseFlowModal";

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

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Mock data - in production this would come from Supabase
  const mockAnimals: Animal[] = [
    {
      id: 1,
      type: "goat",
      totalShares: 1,
      remainingShares: 1,
      pricePerShare: 450,
      location: "Bandung, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop",
      isAvailable: true
    },
    {
      id: 2,
      type: "cow",
      totalShares: 7,
      remainingShares: 4,
      pricePerShare: 150,
      location: "Jakarta, Indonesia", 
      photoUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop",
      isAvailable: true
    },
    {
      id: 3,
      type: "sheep",
      totalShares: 1,
      remainingShares: 1,
      pricePerShare: 380,
      location: "Yogyakarta, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop",
      isAvailable: true
    },
    {
      id: 4,
      type: "cow",
      totalShares: 7,
      remainingShares: 2,
      pricePerShare: 160,
      location: "Surabaya, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop",
      isAvailable: true
    },
    {
      id: 5,
      type: "goat",
      totalShares: 1,
      remainingShares: 0,
      pricePerShare: 420,
      location: "Medan, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop",
      isAvailable: false
    },
    {
      id: 6,
      type: "sheep",
      totalShares: 1,
      remainingShares: 1,
      pricePerShare: 390,
      location: "Malang, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop",
      isAvailable: true
    }
  ];

  const tokens = [
    { symbol: "USDC", name: "USD Coin", icon: "💲" },
    { symbol: "suiUSDT", name: "Sui USDT", icon: "₮" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  ];

  useEffect(() => {
    // Simulate API call
    const loadAnimals = async () => {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimals(mockAnimals);
      setLoading(false);
    };

    loadAnimals();
  }, []);

  const handleAnimalSelect = (animal: Animal) => {
    console.log("Selected animal:", animal);
    setSelectedAnimal(animal);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchaseComplete = (purchaseData: any) => {
    console.log("Purchase completed:", purchaseData);
    // Update the animal's remaining shares
    setAnimals(prev => prev.map(animal => 
      animal.id === purchaseData.animalId 
        ? { ...animal, remainingShares: animal.remainingShares - purchaseData.shares }
        : animal
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
        <IslamicPattern />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-xl text-gray-600 mt-4">Loading animals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
      <IslamicPattern />
      
      {/* Header Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Available Animals
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Choose from our collection of verified qurban animals and make your sacred contribution.
          </p>
        </div>
      </section>

      {/* Token Selection */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Choose Your Payment Token
            </h3>
            <p className="text-gray-600">
              Pay with your preferred cryptocurrency
            </p>
          </div>
          <TokenSelector 
            tokens={tokens}
            selectedToken={selectedToken}
            onTokenSelect={setSelectedToken}
          />
        </div>
      </section>

      {/* Animals Grid */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animals.map((animal, index) => (
              <div 
                key={animal.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnimalCard 
                  animal={animal}
                  selectedToken={selectedToken}
                  onSelect={handleAnimalSelect}
                />
              </div>
            ))}
          </div>

          {animals.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No animals available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <PurchaseFlowModal
        animal={selectedAnimal}
        selectedToken={selectedToken}
        isOpen={isPurchaseModalOpen}
        onClose={() => {
          setIsPurchaseModalOpen(false);
          setSelectedAnimal(null);
        }}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  );
};

export default Animals;
