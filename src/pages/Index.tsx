
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimalCard } from "@/components/AnimalCard"; 
import { TokenSelector } from "@/components/TokenSelector";
import { IslamicPattern } from "@/components/IslamicPattern";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedToken, setSelectedToken] = useState("USDC");

  // Mock data for featured animals
  const featuredAnimals = [
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
    }
  ];

  const tokens = [
    { symbol: "USDC", name: "USD Coin", icon: "💲" },
    { symbol: "suiUSDT", name: "Sui USDT", icon: "₮" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
      {/* Islamic Pattern Background */}
      <IslamicPattern />
      
      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sacred Traditions,{" "}
              <span className="text-primary">Web3 Innovation</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Purchase qurban animals with crypto, receive NFT certificates, and participate 
              in sacred traditions with complete transparency on the Sui blockchain.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🔒 Secure Payments
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                📜 NFT Certificates  
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🌍 Global Access
              </Badge>
            </div>
            <Link to="/animals">
              <Button className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:shadow-lg">
                Explore Animals
              </Button>
            </Link>
          </div>
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

      {/* Featured Animals Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Animals
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Select from our verified collection of qurban animals
            </p>
            <Link to="/animals">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Animals
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAnimals.map((animal, index) => (
              <div 
                key={animal.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnimalCard 
                  animal={animal}
                  selectedToken={selectedToken}
                  onSelect={() => console.log("Selected animal:", animal)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Qoorban?
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Blockchain Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Every transaction is recorded on the Sui blockchain, ensuring complete transparency and trust in your qurban contribution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  NFT Certificates
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Receive beautiful NFT certificates with photos and metadata as permanent proof of your sacred contribution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Global Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Participate in qurban from anywhere in the world using your preferred cryptocurrency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl text-primary">🌙</span>
            </div>
            <h3 className="text-2xl font-bold">Qoorban</h3>
          </div>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Bridging sacred traditions with modern technology. Built with faith, powered by blockchain.
          </p>
          <div className="text-sm text-green-200">
            © 2024 Qoorban. Built on Sui blockchain with ❤️
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
