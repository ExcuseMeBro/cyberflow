'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Chip, Input } from '@nextui-org/react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

interface GameClub {
  id: number;
  name: string;
  logo: string;
  top: string;
  left?: string;
  right?: string;
  players: number;
  games: string[];
}

export default function MapPage() {
  const [selectedClub, setSelectedClub] = useState<GameClub | null>(null);

  const gameClubs: GameClub[] = [
    { id: 1, name: 'Cyber Arena', logo: '🎮', top: '15%', left: '25%', players: 45, games: ['Dota 2', 'CS:GO'] },
    { id: 2, name: 'Pro Gaming Hub', logo: '🏆', top: '35%', right: '20%', players: 32, games: ['Valorant', 'Overwatch'] },
    { id: 3, name: 'Elite Esports', logo: '⚡', top: '60%', left: '15%', players: 28, games: ['League of Legends'] },
    { id: 4, name: 'Gaming Zone', logo: '🎯', top: '50%', left: '50%', players: 55, games: ['Fortnite', 'PUBG'] },
    { id: 5, name: 'Mega Cyber', logo: '🚀', top: '25%', right: '35%', players: 40, games: ['Apex Legends'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Explore Map"
        subtitle="Find gaming clubs near you"
        rightContent={
          <Button
            isIconOnly
            className="btn-gradient text-white"
            size="sm"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="p-4">
        <Input
          placeholder="Search locations, events..."
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          classNames={{
            input: "text-sm",
            inputWrapper: "bg-white border-2 border-primary-200 hover:border-primary-300"
          }}
        />
      </div>

      {/* Map Area */}
      <div className="relative h-[500px] bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 m-4 rounded-2xl overflow-hidden shadow-lg animate-slide-up">
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-gray-300" />
            ))}
          </div>
        </div>

        {/* Game Club Pins */}
        {gameClubs.map((club) => (
          <button
            key={club.id}
            onClick={() => setSelectedClub(club)}
            className="absolute cursor-pointer z-20"
            style={{ top: club.top, left: club.left, right: club.right }}
          >
            {/* Pin */}
            <div className="relative animate-bounce" style={{ animationDelay: `${club.id * 0.15}s` }}>
              <div className={`w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-3 smooth-transition hover:scale-125 active:scale-110 ${
                selectedClub?.id === club.id ? 'border-primary-600 scale-125' : 'border-primary-400'
              }`}>
                <span className="text-2xl">{club.logo}</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-primary-400 to-transparent" />
            </div>
          </button>
        ))}

        {/* Center Info Modal */}
        {selectedClub && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm animate-fade-in p-4">
            <Card className="w-full max-w-sm shadow-2xl animate-scale-in">
              <CardBody className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedClub(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center smooth-transition"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Club Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-passion rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-4xl">{selectedClub.logo}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedClub.name}</h3>
                    <p className="text-sm text-gray-500">Gaming Club</p>
                  </div>
                </div>

                {/* Status Chips */}
                <div className="flex items-center gap-2 mb-4">
                  <Chip size="sm" className="bg-green-100 text-green-700 font-semibold">
                    {selectedClub.players} Players Online
                  </Chip>
                  <Chip size="sm" className="bg-primary-100 text-primary-700 font-semibold">
                    Open Now
                  </Chip>
                </div>

                {/* Available Games */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">Available Games:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClub.games.map((game, i) => (
                      <div key={i} className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 text-primary-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                        {game}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Distance</p>
                    <p className="text-lg font-bold text-gray-800">2.4 km</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Rating</p>
                    <p className="text-lg font-bold text-gray-800">4.8 ⭐</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="bordered"
                    className="border-2 border-primary-300 smooth-transition hover:bg-primary-50"
                  >
                    Get Directions
                  </Button>
                  <Button className="btn-gradient text-white font-semibold">
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* Nearby Events */}
      <div className="p-4 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-bold">Nearby Events</h2>

        {[1, 2, 3].map((i) => (
          <Card key={i} className="card-hover" isPressable>
            <CardBody className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-passion flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Gaming Event #{i}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {i * 2}.{i} km away
                  </p>
                  <div className="flex gap-2">
                    <Chip size="sm" className="bg-primary-100 text-primary-600">
                      Live Now
                    </Chip>
                    <Chip size="sm" variant="flat">
                      {20 + i * 10} participants
                    </Chip>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
