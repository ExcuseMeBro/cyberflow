'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
import { Bell, Plus, ChevronRight, Coins, Clock } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import CybermahallaCard from '@/components/CybermahallaCard';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import ParentDashboard from '@/components/ParentDashboard';
import { mockStreams, mockCybermahallas } from '@/lib/mockData';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock gamer data
const mockGamerData = {
  balance: 15000, // CBDS tokens
  todayPlayTime: 3.5, // hours used today
  dailyLimit: 4, // hours allowed per day
  remainingTime: 0.5, // hours remaining today
};

// Mock partner clubs
const mockPartnerClubs = [
  {
    id: 1,
    name: 'Cyber Arena',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=cyberarena',
    members: 2500,
    discount: '20% OFF',
    category: 'Gaming Lounge',
  },
  {
    id: 2,
    name: 'Gamer Zone',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=gamerzone',
    members: 1800,
    discount: '15% OFF',
    category: 'Esports Club',
  },
  {
    id: 3,
    name: 'Pro League',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=proleague',
    members: 3200,
    discount: '25% OFF',
    category: 'Tournament Hall',
  },
  {
    id: 4,
    name: 'Game Hub',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=gamehub',
    members: 1500,
    discount: '10% OFF',
    category: 'Gaming Cafe',
  },
];

export default function Home() {
  const router = useRouter();
  const { userType } = useAuthStore();
  const recommendedStreams = mockStreams.slice(0, 4);
  const continueWatching = mockStreams.slice(4, 8);
  const joinedMahallas = mockCybermahallas.filter(m => m.isJoined).slice(0, 6);

  // Show parent dashboard if user is parent
  if (userType === 'parent') {
    return <ParentDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Home"
        leftContent={
          <div className="w-10 h-10 rounded-xl bg-gradient-passion flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">C</span>
          </div>
        }
        rightContent={
          <>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="smooth-transition hover:bg-primary-100"
              onPress={() => router.push('/notifications')}
            >
              <Bell className="w-5 h-5" />
            </Button>
          </>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-6 animate-slide-up">
        {/* Balance and Time Cards */}
        <div className="grid grid-cols-2 gap-3 animate-scale-in">
          {/* Balance Card */}
          <Card className="shadow-md">
            <CardBody className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-xs text-gray-600">Balance</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mb-1">
                {mockGamerData.balance.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">CG Coin</p>
            </CardBody>
          </Card>

          {/* Remaining Time Card */}
          <Card className="shadow-md">
            <CardBody className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600">Remaining</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                {mockGamerData.remainingTime}h
              </p>
              <p className="text-xs text-gray-500">
                {mockGamerData.todayPlayTime}h / {mockGamerData.dailyLimit}h used
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Partner Clubs */}
        <section className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Partner Clubs</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
              as={Link}
              href="/clubs"
              className="smooth-transition hover:text-primary-600"
            >
              See All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mockPartnerClubs.map((club) => (
              <Card
                key={club.id}
                className="w-32 flex-shrink-0 card-hover shadow-md"
                isPressable
              >
                <CardBody className="p-0">
                  <div className="relative aspect-[3/4] w-full rounded-t-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-full h-full object-cover smooth-transition hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {club.discount}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold truncate text-gray-800">{club.name}</p>
                    <p className="text-xs text-gray-500 truncate">{club.category}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      👥 {club.members.toLocaleString()}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Joined Cybermahallas */}
        <section className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">My Cybermahallas</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
              as={Link}
              href="/cybermahalla"
            >
              See All
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {joinedMahallas.map((mahalla) => (
              <CybermahallaCard key={mahalla.id} mahalla={mahalla} />
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Recommended For You</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
              as={Link}
              href="/recommended"
            >
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recommendedStreams.map((stream) => (
              <VideoCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        <section className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Continue Watching</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
              as={Link}
              href="/continue-watching"
            >
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {continueWatching.map((stream) => (
              <VideoCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
