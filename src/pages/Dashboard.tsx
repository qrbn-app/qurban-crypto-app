
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IslamicPattern } from "@/components/IslamicPattern";

interface Purchase {
  id: string;
  animalType: string;
  shares: number;
  totalShares: number;
  location: string;
  purchaseDate: string;
  txHash: string;
  nftUrl?: string;
  status: 'completed' | 'pending' | 'sacrificed';
}

const Dashboard = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in production this would come from Supabase
  const mockPurchases: Purchase[] = [
    {
      id: "1",
      animalType: "cow",
      shares: 1,
      totalShares: 7,
      location: "Jakarta, Indonesia",
      purchaseDate: "2024-06-15",
      txHash: "0x1234...5678",
      nftUrl: "https://example.com/nft/1",
      status: "completed"
    },
    {
      id: "2",
      animalType: "goat",
      shares: 1,
      totalShares: 1,
      location: "Bandung, Indonesia",
      purchaseDate: "2024-06-10",
      txHash: "0x9876...5432",
      status: "sacrificed"
    },
    {
      id: "3",
      animalType: "sheep",
      shares: 1,
      totalShares: 1,
      location: "Yogyakarta, Indonesia",
      purchaseDate: "2024-06-18",
      txHash: "0x1111...2222",
      status: "pending"
    }
  ];

  useEffect(() => {
    const loadPurchases = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPurchases(mockPurchases);
      setLoading(false);
    };

    loadPurchases();
  }, []);

  const getAnimalEmoji = (type: string) => {
    switch (type) {
      case "goat": return "🐐";
      case "cow": return "🐄";
      case "sheep": return "🐑";
      default: return "🐄";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-blue-500 text-white">Completed</Badge>;
      case "sacrificed":
        return <Badge className="bg-green-500 text-white">Sacrificed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
        <IslamicPattern />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-xl text-gray-600 mt-4">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
      <IslamicPattern />
      
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your qurban contributions and certificates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Total Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {purchases.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Animals Sacrificed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {purchases.filter(p => p.status === 'sacrificed').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                NFT Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {purchases.filter(p => p.nftUrl).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchases List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Contributions
          </h2>

          {purchases.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🌙</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No contributions yet
                </h3>
                <p className="text-gray-600">
                  Start your sacred journey by purchasing your first qurban animal.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {purchases.map((purchase) => (
                <Card key={purchase.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">
                          {getAnimalEmoji(purchase.animalType)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 capitalize">
                              {purchase.animalType}
                            </h3>
                            {getStatusBadge(purchase.status)}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>📍 {purchase.location}</p>
                            <p>📅 {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                            <p>🔗 Tx: {purchase.txHash}</p>
                            <p>
                              Share: {purchase.shares}/{purchase.totalShares}
                              {purchase.totalShares === 1 ? " (Full Animal)" : ` shares`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {purchase.nftUrl && (
                          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-light transition-colors">
                            View NFT
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
