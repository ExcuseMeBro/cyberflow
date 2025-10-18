'use client';

import { Card, CardBody, Button } from '@nextui-org/react';
import { ArrowLeft, Coins, ArrowUpRight, ArrowDownLeft, Plus, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

// Mock wallet data
const mockWalletData = {
  balance: 15000,
  childBalance: 15000,
  transactions: [
    {
      id: 1,
      type: 'transfer',
      description: 'Transferred to Test Gamer',
      amount: -5000,
      date: 'Today, 2:30 PM',
      status: 'completed',
    },
    {
      id: 2,
      type: 'deposit',
      description: 'Added funds to wallet',
      amount: 10000,
      date: 'Yesterday, 10:15 AM',
      status: 'completed',
    },
    {
      id: 3,
      type: 'reward',
      description: 'Achievement reward for Test Gamer',
      amount: 500,
      date: '2 days ago',
      status: 'completed',
    },
  ],
};

export default function WalletPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Wallet & Balance"
        leftContent={
          <Button
            isIconOnly
            variant="light"
            onPress={() => router.back()}
            size="sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-4 animate-slide-up">
        {/* Balance Card */}
        <Card className="shadow-lg bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 text-sm font-medium">Total Balance</span>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-white mb-1">
                {mockWalletData.balance.toLocaleString()}
              </p>
              <p className="text-white/80 text-sm">CG Coin</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="bg-white text-orange-600 font-semibold"
                startContent={<Plus className="w-4 h-4" />}
              >
                Add Funds
              </Button>
              <Button
                className="bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30"
                startContent={<ArrowUpRight className="w-4 h-4" />}
              >
                Transfer
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Child Balance Card */}
        <Card className="shadow-md">
          <CardBody className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Child Account Balance</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockWalletData.childBalance.toLocaleString()} CG
                </p>
              </div>
              <Button
                size="sm"
                color="primary"
                variant="flat"
              >
                Manage
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-sm" isPressable>
            <CardBody className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-gray-800">Payment Methods</p>
              </div>
            </CardBody>
          </Card>
          <Card className="shadow-sm" isPressable>
            <CardBody className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs font-semibold text-gray-800">Earn Rewards</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Transactions */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Transactions</h2>
          <Card className="shadow-sm">
            <CardBody className="p-0">
              {mockWalletData.transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 ${
                    index !== mockWalletData.transactions.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'deposit' ? 'bg-green-100' :
                      transaction.type === 'transfer' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <ArrowDownLeft className={`w-5 h-5 ${
                          transaction.type === 'deposit' ? 'text-green-600' :
                          transaction.type === 'transfer' ? 'text-blue-600' : 'text-yellow-600'
                        }`} />
                      ) : transaction.type === 'transfer' ? (
                        <ArrowUpRight className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Coins className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">CG</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
