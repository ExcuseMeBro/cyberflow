'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { Navigation, MapPin, X } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(
  () => import('@/components/MapComponent').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 m-4 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
  }
);

interface GameClub {
  id: number;
  name: string;
  logo: string;
  lat: number;
  lng: number;
  players: number;
  games: string[];
  rating: number;
  distance: string;
}

export default function MapPage() {
  const [selectedClub, setSelectedClub] = useState<GameClub | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Tashkent gaming clubs with real coordinates
  const gameClubs: GameClub[] = [
    {
      id: 1,
      name: 'Cyber Arena',
      logo: '🎮',
      lat: 41.3111,
      lng: 69.2797,
      players: 45,
      games: ['Dota 2', 'CS:GO'],
      rating: 4.8,
      distance: '2.4 km',
    },
    {
      id: 2,
      name: 'Pro Gaming Hub',
      logo: '🏆',
      lat: 41.3275,
      lng: 69.2869,
      players: 32,
      games: ['Valorant', 'Overwatch'],
      rating: 4.6,
      distance: '3.1 km',
    },
    {
      id: 3,
      name: 'Elite Esports',
      logo: '⚡',
      lat: 41.2995,
      lng: 69.2401,
      players: 28,
      games: ['League of Legends', 'Apex Legends'],
      rating: 4.9,
      distance: '1.8 km',
    },
    {
      id: 4,
      name: 'Gaming Zone',
      logo: '🎯',
      lat: 41.3156,
      lng: 69.2517,
      players: 55,
      games: ['Fortnite', 'PUBG'],
      rating: 4.7,
      distance: '2.9 km',
    },
    {
      id: 5,
      name: 'Mega Cyber',
      logo: '🚀',
      lat: 41.3344,
      lng: 69.2973,
      players: 40,
      games: ['Mobile Legends', 'Free Fire'],
      rating: 4.5,
      distance: '4.2 km',
    },
  ];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Default to Tashkent center if geolocation fails
          setUserLocation([41.3111, 69.2797]);
        }
      );
    } else {
      // Default to Tashkent center
      setUserLocation([41.3111, 69.2797]);
    }
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

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
            onPress={handleLocateMe}
          >
            <Navigation className="w-5 h-5" />
          </Button>
        }
      />

      {/* Map Area */}
      <div className="relative">
        {userLocation && (
          <MapComponent
            center={userLocation}
            clubs={gameClubs}
            onClubSelect={setSelectedClub}
            selectedClubId={selectedClub?.id}
          />
        )}

        {/* Club Info Modal */}
        {selectedClub && (
          <div className="absolute inset-0 flex items-end justify-center z-[1000] pointer-events-none p-4">
            <Card className="w-full max-w-sm shadow-2xl animate-slide-up pointer-events-auto">
              <CardBody className="p-4 sm:p-6">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedClub(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center smooth-transition"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Club Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-passion rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl sm:text-4xl">{selectedClub.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
                      {selectedClub.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">Gaming Club</p>
                  </div>
                </div>

                {/* Status Chips */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Chip size="sm" className="bg-green-100 text-green-700 font-semibold text-xs">
                    {selectedClub.players} Players Online
                  </Chip>
                  <Chip size="sm" className="bg-primary-100 text-primary-700 font-semibold text-xs">
                    Open Now
                  </Chip>
                </div>

                {/* Available Games */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm font-bold text-gray-700 mb-2">Available Games:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedClub.games.map((game, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 text-primary-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold"
                      >
                        {game}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Distance</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">{selectedClub.distance}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Rating</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800">
                      {selectedClub.rating} ⭐
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Button
                    variant="bordered"
                    size="sm"
                    className="border-2 border-primary-300 smooth-transition hover:bg-primary-50 text-xs sm:text-sm"
                  >
                    Get Directions
                  </Button>
                  <Button size="sm" className="btn-gradient text-white font-semibold text-xs sm:text-sm">
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* Nearby Clubs List */}
      <div className="p-4 space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-bold text-gray-800">Nearby Gaming Clubs</h2>

        {gameClubs.map((club) => (
          <Card
            key={club.id}
            className="w-full card-hover shadow-md"
            isPressable
            onPress={() => setSelectedClub(club)}
          >
            <CardBody className="p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-passion flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-2xl">{club.logo}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold mb-1 truncate">{club.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{club.distance} away</p>
                  <div className="flex gap-2 flex-wrap">
                    <Chip size="sm" className="bg-green-100 text-green-600 text-xs">
                      {club.players} online
                    </Chip>
                    <Chip size="sm" variant="flat" className="text-xs">
                      {club.rating} ⭐
                    </Chip>
                  </div>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-primary-600"
                >
                  <MapPin className="w-5 h-5" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
