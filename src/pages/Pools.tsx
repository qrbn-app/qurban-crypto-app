
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { IslamicPattern } from "@/components/IslamicPattern";

interface Animal {
  id: number;
  type: string;
  totalShares: number;
  remainingShares: number;
  soldShares: number;
  pricePerShare: number;
  location: string;
  photoUrl: string;
  isAvailable: boolean;
  totalValue: number;
  collectedValue: number;
}

const Pools = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data with pool information
  const mockAnimals: Animal[] = [
    {
      id: 1,
      type: "goat",
      totalShares: 1,
      remainingShares: 0,
      soldShares: 1,
      pricePerShare: 450,
      location: "Bandung, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop",
      isAvailable: false,
      totalValue: 450,
      collectedValue: 450
    },
    {
      id: 2,
      type: "cow",
      totalShares: 7,
      remainingShares: 3,
      soldShares: 4,
      pricePerShare: 150,
      location: "Jakarta, Indonesia", 
      photoUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop",
      isAvailable: true,
      totalValue: 1050,
      collectedValue: 600
    },
    {
      id: 3,
      type: "sheep",
      totalShares: 1,
      remainingShares: 1,
      soldShares: 0,
      pricePerShare: 380,
      location: "Yogyakarta, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop",
      isAvailable: true,
      totalValue: 380,
      collectedValue: 0
    },
    {
      id: 4,
      type: "cow",
      totalShares: 7,
      remainingShares: 1,
      soldShares: 6,
      pricePerShare: 160,
      location: "Surabaya, Indonesia",
      photoUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop",
      isAvailable: true,
      totalValue: 1120,
      collectedValue: 960
    }
  ];

  useEffect(() => {
    const loadAnimals = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnimals(mockAnimals);
      setLoading(false);
    };

    loadAnimals();
  }, []);

  const getAnimalEmoji = (type: string) => {
    switch (type) {
      case "goat": return "🐐";
      case "cow": return "🐄";
      case "sheep": return "🐑";
      default: return "🐄";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getStatusBadge = (animal: Animal) => {
    const percentage = (animal.soldShares / animal.totalShares) * 100;
    
    if (!animal.isAvailable || percentage === 100) {
      return <Badge className="bg-green-500 text-white">Completed</Badge>;
    }
    if (percentage >= 75) {
      return <Badge className="bg-blue-500 text-white">Almost Full</Badge>;
    }
    if (percentage >= 25) {
      return <Badge className="bg-yellow-500 text-white">In Progress</Badge>;
    }
    return <Badge variant="secondary">Just Started</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
        <IslamicPattern />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-xl text-gray-600 mt-4">Loading pool data...</p>
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
            Pool Visualization
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Track the progress of each qurban animal pool and see how close we are to completion
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Total Animals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {animals.length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Completed Pools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {animals.filter(a => !a.isAvailable).length}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Active Pools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {animals.filter(a => a.isAvailable).length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pool Cards */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {animals.map((animal) => {
              const progressPercentage = (animal.soldShares / animal.totalShares) * 100;
              
              return (
                <Card key={animal.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <img 
                        src={animal.photoUrl} 
                        alt={animal.type}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 capitalize flex items-center space-x-2">
                            <span>{getAnimalEmoji(animal.type)}</span>
                            <span>{animal.type}</span>
                          </h3>
                          {getStatusBadge(animal)}
                        </div>
                        <p className="text-gray-600 text-sm">📍 {animal.location}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{progressPercentage.toFixed(0)}% Complete</span>
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className="h-3"
                        />
                      </div>

                      {/* Share Information */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-gray-600">Shares Sold</div>
                          <div className="text-lg font-semibold text-green-600">
                            {animal.soldShares} / {animal.totalShares}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-gray-600">Remaining</div>
                          <div className="text-lg font-semibold text-orange-600">
                            {animal.remainingShares} shares
                          </div>
                        </div>
                      </div>

                      {/* Financial Information */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-gray-600">Collected</div>
                          <div className="text-lg font-semibold text-blue-600">
                            ${animal.collectedValue}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-gray-600">Target</div>
                          <div className="text-lg font-semibold text-purple-600">
                            ${animal.totalValue}
                          </div>
                        </div>
                      </div>

                      {/* Price per Share */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Price per share:</span>
                          <span className="text-lg font-semibold text-primary">
                            ${animal.pricePerShare}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pools;
