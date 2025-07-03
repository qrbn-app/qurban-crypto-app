
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IslamicPattern } from "@/components/IslamicPattern";

interface Transaction {
  id: string;
  type: 'purchase' | 'refund';
  animalType: string;
  shares: number;
  amount: number;
  token: string;
  date: string;
  txHash: string;
  status: 'success' | 'pending' | 'failed';
}

const History = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'purchase' | 'refund'>('all');

  // Mock data
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "purchase",
      animalType: "cow",
      shares: 1,
      amount: 150,
      token: "USDC",
      date: "2024-06-18T10:30:00Z",
      txHash: "0x1234567890abcdef",
      status: "success"
    },
    {
      id: "2",
      type: "purchase",
      animalType: "goat",
      shares: 1,
      amount: 450,
      token: "USDC",
      date: "2024-06-15T14:20:00Z",
      txHash: "0x9876543210fedcba",
      status: "success"
    },
    {
      id: "3",
      type: "purchase",
      animalType: "sheep",
      shares: 1,
      amount: 380,
      token: "ETH",
      date: "2024-06-10T09:15:00Z",
      txHash: "0x1111222233334444",
      status: "pending"
    },
    {
      id: "4",
      type: "refund",
      animalType: "cow",
      shares: 1,
      amount: 150,
      token: "USDC",
      date: "2024-06-05T16:45:00Z",
      txHash: "0x5555666677778888",
      status: "success"
    }
  ];

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setTransactions(mockTransactions);
      setLoading(false);
    };

    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.type === filter
  );

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
      case "success":
        return <Badge className="bg-green-500 text-white">Success</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'purchase' ? '💰' : '↩️';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
        <IslamicPattern />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-xl text-gray-600 mt-4">Loading transaction history...</p>
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
            Transaction History
          </h1>
          <p className="text-xl text-gray-600">
            View all your qurban-related transactions and payments
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Transactions
          </Button>
          <Button
            variant={filter === 'purchase' ? 'default' : 'outline'}
            onClick={() => setFilter('purchase')}
          >
            Purchases
          </Button>
          <Button
            variant={filter === 'refund' ? 'default' : 'outline'}
            onClick={() => setFilter('refund')}
          >
            Refunds
          </Button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">📜</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? "You haven't made any transactions yet."
                    : `No ${filter} transactions found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {getAnimalEmoji(transaction.animalType)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                              {transaction.type} - {transaction.animalType}
                            </h3>
                            {getStatusBadge(transaction.status)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              {transaction.shares} share{transaction.shares > 1 ? 's' : ''} • 
                              {transaction.amount} {transaction.token}
                            </p>
                            <p>{new Date(transaction.date).toLocaleString()}</p>
                            <p className="font-mono text-xs">Tx: {transaction.txHash}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        transaction.type === 'purchase' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'purchase' ? '-' : '+'}
                        {transaction.amount} {transaction.token}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
