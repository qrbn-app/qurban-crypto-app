import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IslamicPattern } from "@/components/IslamicPattern";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AdminStats {
  totalAnimals: number;
  availableAnimals: number;
  totalPurchases: number;
  totalRevenue: number;
}

interface Animal {
  id: string;
  type: string;
  location: string;
  totalShares: number;
  remainingShares: number;
  pricePerShare: number;
  photoUrl: string;
  status: "available" | "full" | "sacrificed";
}

interface User {
  id: string;
  walletAddress: string;
  role: "user" | "admin";
  totalPurchases: number;
  joinDate: string;
  status: "active" | "suspended";
}

interface Transaction {
  id: string;
  userAddress: string;
  animalId: string;
  animalType: string;
  shares: number;
  amount: number;
  token: string;
  txHash: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface NFT {
  id: string;
  animalId: string;
  ownerAddress: string;
  tokenId: string;
  metadata: string;
  ipfsUrl: string;
  mintDate: string;
}

interface PlatformSettings {
  platformFee: number;
  minSharePrice: number;
  maxSharePrice: number;
  supportedTokens: string[];
}

const Admin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Data states
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [settings, setSettings] = useState<PlatformSettings | null>(null);

  // Form states
  const [newAnimal, setNewAnimal] = useState({
    type: "",
    location: "",
    totalShares: 1,
    pricePerShare: 100,
    photoUrl: "",
  });

  // Temporary: Force admin access for testing
  const isAdminForTesting = true;

  // Mock data
  const mockStats: AdminStats = {
    totalAnimals: 24,
    availableAnimals: 18,
    totalPurchases: 156,
    totalRevenue: 23450,
  };

  const mockAnimals: Animal[] = [
    {
      id: "1",
      type: "cow",
      location: "Jakarta, Indonesia",
      totalShares: 7,
      remainingShares: 3,
      pricePerShare: 150,
      photoUrl: "/placeholder.svg",
      status: "available",
    },
    {
      id: "2",
      type: "goat",
      location: "Bandung, Indonesia",
      totalShares: 1,
      remainingShares: 0,
      pricePerShare: 100,
      photoUrl: "/placeholder.svg",
      status: "full",
    },
    {
      id: "3",
      type: "sheep",
      location: "Yogyakarta, Indonesia",
      totalShares: 1,
      remainingShares: 1,
      pricePerShare: 120,
      photoUrl: "/placeholder.svg",
      status: "available",
    },
  ];

  const mockUsers: User[] = [
    {
      id: "1",
      walletAddress: "0x1234567890123456789012345678901234567890",
      role: "admin",
      totalPurchases: 5,
      joinDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      walletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      role: "user",
      totalPurchases: 2,
      joinDate: "2024-02-20",
      status: "active",
    },
    {
      id: "3",
      walletAddress: "0x9876543210987654321098765432109876543210",
      role: "user",
      totalPurchases: 1,
      joinDate: "2024-03-10",
      status: "suspended",
    },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      userAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      animalId: "1",
      animalType: "cow",
      shares: 1,
      amount: 150,
      token: "USDT",
      txHash: "0x1234567890abcdef",
      date: "2024-06-15",
      status: "completed",
    },
    {
      id: "2",
      userAddress: "0x9876543210987654321098765432109876543210",
      animalId: "2",
      animalType: "goat",
      shares: 1,
      amount: 100,
      token: "USDT",
      txHash: "0xabcdef1234567890",
      date: "2024-06-10",
      status: "completed",
    },
    {
      id: "3",
      userAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      animalId: "3",
      animalType: "sheep",
      shares: 1,
      amount: 120,
      token: "USDT",
      txHash: "0x567890abcdef1234",
      date: "2024-06-18",
      status: "pending",
    },
  ];

  const mockNFTs: NFT[] = [
    {
      id: "1",
      animalId: "1",
      ownerAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      tokenId: "QRB001",
      metadata: "Qurban Cow Certificate #1",
      ipfsUrl: "ipfs://QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
      mintDate: "2024-06-15",
    },
    {
      id: "2",
      animalId: "2",
      ownerAddress: "0x9876543210987654321098765432109876543210",
      tokenId: "QRB002",
      metadata: "Qurban Goat Certificate #1",
      ipfsUrl: "ipfs://QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
      mintDate: "2024-06-10",
    },
  ];

  const mockSettings: PlatformSettings = {
    platformFee: 2.5,
    minSharePrice: 50,
    maxSharePrice: 500,
    supportedTokens: ["USDT", "BTC", "ETH", "SUI"],
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStats(mockStats);
      setAnimals(mockAnimals);
      setUsers(mockUsers);
      setTransactions(mockTransactions);
      setNFTs(mockNFTs);
      setSettings(mockSettings);
      setLoading(false);
    };

    if (isAdminForTesting || isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleAddAnimal = () => {
    if (!newAnimal.type || !newAnimal.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const animal: Animal = {
      id: (animals.length + 1).toString(),
      ...newAnimal,
      remainingShares: newAnimal.totalShares,
      status: "available",
    };

    setAnimals([...animals, animal]);
    setNewAnimal({
      type: "",
      location: "",
      totalShares: 1,
      pricePerShare: 100,
      photoUrl: "",
    });
    setActiveModal(null);

    toast({
      title: "Success",
      description: "Animal added successfully",
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "suspended" : "active",
            }
          : user
      )
    );

    toast({
      title: "Success",
      description: "User status updated",
    });
  };

  const handleUpdateSettings = () => {
    toast({
      title: "Success",
      description: "Platform settings updated successfully",
    });
    setActiveModal(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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

  if (!isAdminForTesting && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
        <IslamicPattern />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🚫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Access Denied
              </h3>
              <p className="text-gray-600">
                You don't have permission to access the admin panel.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
        <IslamicPattern />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-xl text-gray-600 mt-4">
              Loading admin dashboard...
            </p>
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
          <div className="flex items-center space-x-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <Badge className="bg-red-500 text-white">Admin Only</Badge>
          </div>
          <p className="text-xl text-gray-600">
            Manage animals, monitor transactions, and oversee the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Total Animals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {stats?.totalAnimals}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Available Animals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats?.availableAnimals}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Total Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats?.totalPurchases}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Revenue (USDC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                ${stats?.totalRevenue?.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🐄</span>
                <span>Manage Animals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Add new animals, update existing ones, and manage availability.
              </p>
              <Button
                className="w-full"
                onClick={() => setActiveModal("animals")}
              >
                Manage Animals
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📊</span>
                <span>View Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor sales, user activity, and platform performance.
              </p>
              <Button
                className="w-full"
                onClick={() => setActiveModal("analytics")}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">👥</span>
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View user accounts, manage permissions, and handle support.
              </p>
              <Button
                className="w-full"
                onClick={() => setActiveModal("users")}
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">💰</span>
                <span>Transaction Logs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Review all platform transactions and payment history.
              </p>
              <Button
                className="w-full"
                onClick={() => setActiveModal("transactions")}
              >
                View Transactions
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🎨</span>
                <span>NFT Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage NFT certificates, metadata, and distribution.
              </p>
              <Button className="w-full" onClick={() => setActiveModal("nfts")}>
                Manage NFTs
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⚙️</span>
                <span>Platform Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure platform settings, fees, and system parameters.
              </p>
              <Button
                className="w-full"
                onClick={() => setActiveModal("settings")}
              >
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Animals Management Modal */}
      <Dialog
        open={activeModal === "animals"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Animals</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Add New Animal Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Animal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Animal Type</Label>
                    <Select
                      value={newAnimal.type}
                      onValueChange={(value) =>
                        setNewAnimal({ ...newAnimal, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">Cow</SelectItem>
                        <SelectItem value="goat">Goat</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAnimal.location}
                      onChange={(e) =>
                        setNewAnimal({ ...newAnimal, location: e.target.value })
                      }
                      placeholder="e.g., Jakarta, Indonesia"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalShares">Total Shares</Label>
                    <Input
                      id="totalShares"
                      type="number"
                      min="1"
                      value={newAnimal.totalShares}
                      onChange={(e) =>
                        setNewAnimal({
                          ...newAnimal,
                          totalShares: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerShare">Price per Share ($)</Label>
                    <Input
                      id="pricePerShare"
                      type="number"
                      min="1"
                      value={newAnimal.pricePerShare}
                      onChange={(e) =>
                        setNewAnimal({
                          ...newAnimal,
                          pricePerShare: parseInt(e.target.value) || 100,
                        })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleAddAnimal} className="w-full">
                  Add Animal
                </Button>
              </CardContent>
            </Card>

            {/* Animals List */}
            <Card>
              <CardHeader>
                <CardTitle>Current Animals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {animals.map((animal) => (
                      <TableRow key={animal.id}>
                        <TableCell className="flex items-center space-x-2">
                          <span>{getAnimalEmoji(animal.type)}</span>
                          <span className="capitalize">{animal.type}</span>
                        </TableCell>
                        <TableCell>{animal.location}</TableCell>
                        <TableCell>
                          {animal.remainingShares}/{animal.totalShares}
                        </TableCell>
                        <TableCell>${animal.pricePerShare}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              animal.status === "available"
                                ? "default"
                                : animal.status === "full"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {animal.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Modal */}
      <Dialog
        open={activeModal === "analytics"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Platform Analytics</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Sales:</span>
                    <span className="font-bold">
                      ${stats?.totalRevenue?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Sale:</span>
                    <span className="font-bold">
                      $
                      {Math.round(
                        (stats?.totalRevenue || 0) /
                          (stats?.totalPurchases || 1)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate:</span>
                    <span className="font-bold">73%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Animal Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>🐄 Cow Sales:</span>
                    <span className="font-bold">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🐐 Goat Sales:</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🐑 Sheep Sales:</span>
                    <span className="font-bold">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Users Management Modal */}
      <Dialog
        open={activeModal === "users"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Management</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-sm">
                    {formatAddress(user.walletAddress)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin" ? "destructive" : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.totalPurchases}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Transactions Modal */}
      <Dialog
        open={activeModal === "transactions"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Animal</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatAddress(tx.userAddress)}
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <span>{getAnimalEmoji(tx.animalType)}</span>
                    <span className="capitalize">{tx.animalType}</span>
                  </TableCell>
                  <TableCell>{tx.shares}</TableCell>
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tx.token}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === "completed"
                          ? "default"
                          : tx.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {formatAddress(tx.txHash)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* NFTs Management Modal */}
      <Dialog
        open={activeModal === "nfts"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>NFT Management</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token ID</TableHead>
                <TableHead>Animal</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Mint Date</TableHead>
                <TableHead>IPFS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nfts.map((nft) => (
                <TableRow key={nft.id}>
                  <TableCell className="font-mono">{nft.tokenId}</TableCell>
                  <TableCell>{nft.metadata}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatAddress(nft.ownerAddress)}
                  </TableCell>
                  <TableCell>{nft.mintDate}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {nft.ipfsUrl.slice(0, 20)}...
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog
        open={activeModal === "settings"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Platform Settings</DialogTitle>
          </DialogHeader>

          {settings && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="platformFee">Platform Fee (%)</Label>
                  <Input
                    id="platformFee"
                    type="number"
                    step="0.1"
                    value={settings.platformFee}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        platformFee: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minPrice">Min Share Price ($)</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={settings.minSharePrice}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          minSharePrice: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPrice">Max Share Price ($)</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={settings.maxSharePrice}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          maxSharePrice: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Supported Tokens</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {settings.supportedTokens.map((token) => (
                      <Badge key={token} variant="outline">
                        {token}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleUpdateSettings} className="w-full">
                Update Settings
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
