'use client';

import { Card, CardBody, Button, Chip, Tabs, Tab, Avatar } from '@nextui-org/react';
import { ArrowLeft, Trophy, TrendingUp, Users, Coins, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

// Mock leaderboard data
const topPlayers = [
  {
    id: 1,
    rank: 1,
    name: 'ProGamer789',
    username: 'progamer789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=progamer789',
    tokens: 150000,
    trend: 'up',
  },
  {
    id: 2,
    rank: 2,
    name: 'ElitePlayer',
    username: 'eliteplayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eliteplayer',
    tokens: 125000,
    trend: 'up',
  },
  {
    id: 3,
    rank: 3,
    name: 'GamerKing',
    username: 'gamerking',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamerking',
    tokens: 98000,
    trend: 'down',
  },
  {
    id: 4,
    rank: 4,
    name: 'CyberMaster',
    username: 'cybermaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cybermaster',
    tokens: 87500,
    trend: 'same',
  },
  {
    id: 5,
    rank: 5,
    name: 'NinjaPlayer',
    username: 'ninjaplayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninjaplayer',
    tokens: 75000,
    trend: 'up',
  },
  {
    id: 6,
    rank: 6,
    name: 'LegendGamer',
    username: 'legendgamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=legendgamer',
    tokens: 68000,
    trend: 'up',
  },
  {
    id: 7,
    rank: 7,
    name: 'WarriorPro',
    username: 'warriorpro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=warriorpro',
    tokens: 62000,
    trend: 'down',
  },
  {
    id: 8,
    rank: 8,
    name: 'ChampionX',
    username: 'championx',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=championx',
    tokens: 58000,
    trend: 'same',
  },
];

const topMahallas = [
  {
    id: 1,
    rank: 1,
    name: 'Yunusabad Warriors',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=yunusabad',
    members: 3200,
    wins: 45,
    trend: 'up',
  },
  {
    id: 2,
    rank: 2,
    name: 'Yashnabad Titans',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=yashnabad',
    members: 2800,
    wins: 42,
    trend: 'up',
  },
  {
    id: 3,
    rank: 3,
    name: 'Chilanzar Gamers',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=chilanzar',
    members: 2500,
    wins: 38,
    trend: 'down',
  },
  {
    id: 4,
    rank: 4,
    name: 'Mirzo Ulugbek Squad',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=mirzoulugbek',
    members: 2100,
    wins: 35,
    trend: 'same',
  },
  {
    id: 5,
    rank: 5,
    name: 'Shaykhontohur Legends',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=shaykhontohur',
    members: 1900,
    wins: 30,
    trend: 'up',
  },
  {
    id: 6,
    rank: 6,
    name: 'Sergeli Esports',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=sergeli',
    members: 1800,
    wins: 28,
    trend: 'down',
  },
];

export default function LeaderboardPage() {
  const router = useRouter();

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Leaderboard"
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

      {/* Tabs */}
      <div className="px-4 pt-4">
        <Tabs
          aria-label="Leaderboard tabs"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary-500",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary-600"
          }}
        >
          <Tab
            key="players"
            title={
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Top Players</span>
              </div>
            }
          >
            <div className="py-4 space-y-3 animate-slide-up">
              {topPlayers.map((player) => (
                <Card key={player.id} className="w-full shadow-md" isPressable>
                  <CardBody className="p-3 sm:p-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Rank Badge */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getRankColor(player.rank)} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-sm sm:text-base">
                          {player.rank}
                        </span>
                      </div>

                      {/* Avatar */}
                      <Avatar
                        src={player.avatar}
                        className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                          {player.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">@{player.username}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Coins className="w-4 h-4" />
                            <span className="text-sm sm:text-base font-bold">
                              {player.tokens.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">CG</p>
                        </div>
                        <div className="w-6 flex items-center justify-center">
                          {getTrendIcon(player.trend)}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>

          <Tab
            key="mahallas"
            title={
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Top Mahallas</span>
              </div>
            }
          >
            <div className="py-4 space-y-3 animate-slide-up">
              {topMahallas.map((mahalla) => (
                <Card key={mahalla.id} className="w-full shadow-md" isPressable>
                  <CardBody className="p-3 sm:p-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Rank Badge */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getRankColor(mahalla.rank)} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-sm sm:text-base">
                          {mahalla.rank}
                        </span>
                      </div>

                      {/* Logo */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0">
                        <img
                          src={mahalla.logo}
                          alt={mahalla.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                          {mahalla.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{mahalla.members.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <Star className="w-4 h-4" />
                            <span className="text-sm sm:text-base font-bold">
                              {mahalla.wins}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Wins</p>
                        </div>
                        <div className="w-6 flex items-center justify-center">
                          {getTrendIcon(mahalla.trend)}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
