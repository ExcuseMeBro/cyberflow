'use client';

import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { ArrowLeft, MapPin, Users, Trophy, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

// Mock partner clubs data
const mockPartnerClubs = [
  {
    id: 1,
    name: 'Cyber Arena',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=cyberarena',
    members: 2500,
    discount: '20% OFF',
    category: 'Gaming Lounge',
    location: 'Tashkent, Yunusabad',
    rating: 4.8,
    description: 'Premium gaming lounge with latest equipment',
    features: ['High-end PCs', 'PS5', 'VR Gaming'],
  },
  {
    id: 2,
    name: 'Gamer Zone',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=gamerzone',
    members: 1800,
    discount: '15% OFF',
    category: 'Esports Club',
    location: 'Tashkent, Chilanzar',
    rating: 4.6,
    description: 'Professional esports training center',
    features: ['Coaching', 'Tournaments', 'Streaming'],
  },
  {
    id: 3,
    name: 'Pro League',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=proleague',
    members: 3200,
    discount: '25% OFF',
    category: 'Tournament Hall',
    location: 'Tashkent, Sergeli',
    rating: 4.9,
    description: 'Large-scale tournament venue',
    features: ['Arena', 'Spectator Seats', 'Live Streaming'],
  },
  {
    id: 4,
    name: 'Game Hub',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=gamehub',
    members: 1500,
    discount: '10% OFF',
    category: 'Gaming Cafe',
    location: 'Tashkent, Mirzo Ulugbek',
    rating: 4.5,
    description: 'Cozy gaming cafe with snacks and drinks',
    features: ['Cafe', 'Console Gaming', 'Board Games'],
  },
  {
    id: 5,
    name: 'Elite Gamers',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=elitegamers',
    members: 2200,
    discount: '30% OFF',
    category: 'VIP Club',
    location: 'Tashkent, Yakkasaray',
    rating: 4.7,
    description: 'Exclusive VIP gaming experience',
    features: ['Private Rooms', 'Premium Snacks', 'Concierge'],
  },
  {
    id: 6,
    name: 'Team Arena',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=teamarena',
    members: 1900,
    discount: '18% OFF',
    category: 'Team Practice',
    location: 'Tashkent, Shaykhontohur',
    rating: 4.4,
    description: 'Perfect for team practice sessions',
    features: ['Team Rooms', 'Strategy Board', 'VOD Review'],
  },
];

export default function ClubsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Partner Clubs"
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
      <div className="p-4 space-y-3 animate-slide-up">
        {mockPartnerClubs.map((club) => (
          <Card key={club.id} className="shadow-md h-[240px]" isPressable>
            <CardBody className="p-4 flex flex-col">
              <div className="flex gap-4 flex-1 min-h-0">
                {/* Logo */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-800 truncate">
                        {club.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{club.category}</p>
                    </div>
                    <Chip
                      size="sm"
                      className="bg-green-500 text-white font-bold flex-shrink-0"
                    >
                      {club.discount}
                    </Chip>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {club.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{club.members.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{club.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{club.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex gap-1.5 flex-wrap overflow-hidden h-[52px]">
                    {club.features.map((feature, index) => (
                      <Chip
                        key={index}
                        size="sm"
                        variant="flat"
                        color="primary"
                        className="text-xs"
                      >
                        {feature}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                size="sm"
                className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex-shrink-0"
                startContent={<Trophy className="w-4 h-4" />}
              >
                Join Club
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
