'use client';

import { Card, CardBody, Chip, Button, Avatar, Progress } from '@nextui-org/react';
import { Trophy, Medal, Star, Calendar, Users, Clock, Crown, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

export default function CompetitionsPage() {
  const upcomingCompetitions = [
    {
      id: 1,
      title: 'Winter Championship 2024',
      game: 'Dota 2',
      prize: '$25,000',
      participants: 0,
      maxParticipants: 500,
      startDate: 'Dec 25, 2024',
      daysUntil: 15,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Spring League Finals',
      game: 'Valorant',
      prize: '$15,000',
      participants: 0,
      maxParticipants: 300,
      startDate: 'Jan 10, 2025',
      daysUntil: 30,
      status: 'upcoming',
    },
  ];

  const liveCompetitions = [
    {
      id: 1,
      title: 'Summer Gaming Championship',
      game: 'CS:GO',
      prize: '$10,000',
      participants: 1250,
      maxParticipants: 1500,
      endDate: '3 days left',
      status: 'live',
      progress: 83,
    },
    {
      id: 2,
      title: 'Weekly Speed Run Challenge',
      game: 'Overwatch 2',
      prize: '$5,000',
      participants: 856,
      maxParticipants: 1000,
      endDate: '5 hours left',
      status: 'live',
      progress: 86,
    },
    {
      id: 3,
      title: 'Creative Streaming Awards',
      game: 'Multiple',
      prize: '$15,000',
      participants: 2340,
      maxParticipants: 3000,
      endDate: '7 days left',
      status: 'live',
      progress: 78,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'ProGamer123', avatar: 'https://i.pravatar.cc/150?img=1', points: 15840, wins: 45 },
    { rank: 2, name: 'ElitePlayer', avatar: 'https://i.pravatar.cc/150?img=2', points: 14520, wins: 42 },
    { rank: 3, name: 'MasterGamer', avatar: 'https://i.pravatar.cc/150?img=3', points: 13890, wins: 40 },
    { rank: 4, name: 'TopStreamer', avatar: 'https://i.pravatar.cc/150?img=4', points: 12450, wins: 38 },
    { rank: 5, name: 'GameChamp', avatar: 'https://i.pravatar.cc/150?img=5', points: 11230, wins: 35 },
    { rank: 6, name: 'CyberNinja', avatar: 'https://i.pravatar.cc/150?img=6', points: 10890, wins: 33 },
    { rank: 7, name: 'PixelMaster', avatar: 'https://i.pravatar.cc/150?img=7', points: 9540, wins: 30 },
    { rank: 8, name: 'StreamKing', avatar: 'https://i.pravatar.cc/150?img=8', points: 8920, wins: 28 },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-gray-200 to-gray-300';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Crown className="w-4 h-4" />;
    return <span className="text-xs font-bold">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Competitions"
        subtitle="Compete and win amazing prizes"
      />

      {/* Upcoming Competitions */}
      <div className="p-4 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" />
            Upcoming Competitions
          </h2>
        </div>

        {upcomingCompetitions.map((comp) => (
          <Card key={comp.id} className="w-full card-hover shadow-md" isPressable>
            <CardBody className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800">{comp.title}</h3>
                      <p className="text-xs text-gray-500">{comp.game}</p>
                    </div>
                    <Chip size="sm" className="bg-blue-100 text-blue-700">
                      {comp.daysUntil} days
                    </Chip>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs">
                      <Trophy className="w-3 h-3 text-accent-600" />
                      <span className="font-semibold">{comp.prize}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Users className="w-3 h-3 text-gray-500" />
                      <span>Max {comp.maxParticipants}</span>
                    </div>
                  </div>

                  <Button size="sm" className="btn-gradient text-white w-full">
                    Set Reminder
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Live Competitions */}
      <div className="p-4 space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-soft" />
            Live Competitions
          </h2>
        </div>

        {liveCompetitions.map((comp, index) => (
          <Card
            key={comp.id}
            className="w-full card-hover shadow-md"
            isPressable
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <CardBody className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-passion flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-soft">
                  <Medal className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-gray-800">{comp.title}</h3>
                      <p className="text-xs text-gray-500">{comp.game}</p>
                    </div>
                    <Chip size="sm" className="bg-red-100 text-red-700 animate-pulse-soft">
                      🔴 Live
                    </Chip>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-accent-600" />
                      {comp.prize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {comp.endDate}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">
                        {comp.participants} / {comp.maxParticipants} participants
                      </span>
                      <span className="font-semibold text-primary-600">
                        {comp.progress}%
                      </span>
                    </div>
                    <Progress
                      value={comp.progress}
                      className="h-2"
                      classNames={{
                        indicator: "bg-gradient-passion",
                      }}
                    />
                  </div>

                  <Button size="sm" className="btn-gradient text-white w-full">
                    Join Competition
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="p-4 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Leaderboard
          </h2>
          <Button size="sm" variant="flat" className="text-primary-600">
            View All
          </Button>
        </div>

        <Card className="w-full shadow-md">
          <CardBody className="p-0">
            {leaderboard.map((player, index) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-4 smooth-transition hover:bg-primary-50 ${
                  index !== leaderboard.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Rank Badge */}
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getRankColor(
                      player.rank
                    )} flex items-center justify-center text-white font-bold shadow-md`}
                  >
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar
                    src={player.avatar}
                    size="md"
                    className="border-2 border-primary-200"
                  />

                  {/* Player Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {player.name}
                    </h3>
                    <p className="text-xs text-gray-500">{player.wins} wins</p>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600">
                    {player.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Your Rank */}
        <Card className="w-full bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 shadow-md">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-passion flex items-center justify-center text-white font-bold shadow-md">
                  #42
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Your Rank</p>
                  <p className="text-xs text-gray-500">5,240 points</p>
                </div>
              </div>
              <Button size="sm" className="btn-gradient text-white">
                Compete Now
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
