'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Chip } from '@nextui-org/react';
import { ArrowLeft, Check, Zap, Crown, Gamepad2, Clock, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

interface Package {
  id: number;
  name: string;
  icon: any;
  price: number;
  originalPrice?: number;
  color: string;
  gradient: string;
  popular?: boolean;
  hours: {
    basic: number;
    premium: number;
    vip: number;
  };
  features: string[];
}

// Zone hourly rates
const ZONE_RATES = {
  basic: 12000,
  premium: 25000,
  vip: 60000,
};

const packages: Package[] = [
  {
    id: 1,
    name: 'Rookie Hunter',
    icon: Gamepad2,
    price: 60000,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    hours: {
      basic: 5,
      premium: 0,
      vip: 0,
    },
    features: [
      'Access to all partner clubs',
      'Basic zone gaming',
      'Standard gaming equipment',
      'Free soft drinks',
      'Tournament access',
      'Community chat',
    ],
  },
  {
    id: 2,
    name: 'Battler',
    icon: Zap,
    price: 150000,
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-100 to-pink-100',
    popular: true,
    hours: {
      basic: 5,
      premium: 3,
      vip: 1,
    },
    features: [
      'All Rookie Hunter benefits',
      'Premium zone access',
      'VIP zone trial (15 min)',
      'Priority club access',
      'Premium gaming gear',
      'Free energy drinks',
      'VIP tournament access',
      'Statistics tracking',
    ],
  },
  {
    id: 3,
    name: 'Victory Royale',
    icon: Crown,
    price: 420000,
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    hours: {
      basic: 20,
      premium: 12,
      vip: 8,
    },
    features: [
      'All Battle Champion benefits',
      'Extended VIP zone access',
      'Latest gaming equipment',
      'Free snacks & premium drinks',
      'Private coaching sessions',
      'Exclusive elite tournaments',
      'Early access to new games',
      'Personal gaming concierge',
    ],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handlePurchase = (pkg: Package) => {
    setSelectedPackage(pkg);
    // Here you would integrate with payment system
    console.log('Purchasing package:', pkg.name);
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Subscription Plans"
        subtitle="Choose your gaming package"
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
      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="w-full shadow-md bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-passion flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  Flexible Gaming Hours
                </h3>
                <p className="text-xs text-gray-600">
                  Use your hours at any partner club across the city. Choose from Basic, Premium, or VIP zones based on your package.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Packages */}
        <div className="space-y-4 animate-slide-up">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Card
                key={pkg.id}
                className="w-full shadow-lg card-hover relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Chip
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold"
                      startContent={<Star className="w-3 h-3" />}
                    >
                      MOST POPULAR
                    </Chip>
                  </div>
                )}

                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${pkg.gradient} rounded-full blur-3xl opacity-50 -z-0`} />

                <CardBody className="p-4 sm:p-6 relative z-10">
                  {/* Package Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-600">
                          {pkg.price.toLocaleString()} UZS
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">one-time purchase</p>
                    </div>
                  </div>

                  {/* Hours Breakdown */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-primary-600" />
                      <h4 className="text-sm font-bold text-gray-700">Gaming Hours Included</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {pkg.hours.basic > 0 && (
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">Basic Zone</p>
                          <p className="text-lg sm:text-xl font-bold text-gray-800">
                            {pkg.hours.basic}h
                          </p>
                        </div>
                      )}
                      {pkg.hours.premium > 0 && (
                        <div className="bg-purple-50 rounded-xl p-3 text-center border-2 border-purple-200">
                          <p className="text-xs text-purple-600 mb-1 font-semibold">Premium Zone</p>
                          <p className="text-lg sm:text-xl font-bold text-purple-700">
                            {pkg.hours.premium}h
                          </p>
                        </div>
                      )}
                      {pkg.hours.vip > 0 && (
                        <div className="bg-yellow-50 rounded-xl p-3 text-center border-2 border-yellow-300">
                          <p className="text-xs text-yellow-700 mb-1 font-semibold">VIP Zone</p>
                          <p className="text-lg sm:text-xl font-bold text-yellow-700">
                            {pkg.hours.vip >= 1 ? `${pkg.hours.vip}h` : `${pkg.hours.vip * 60} min`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Package Benefits</h4>
                    <div className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 flex-1">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    size="lg"
                    className={`w-full bg-gradient-to-r ${pkg.color} text-white font-bold text-base shadow-lg`}
                    onPress={() => handlePurchase(pkg)}
                  >
                    Choose {pkg.name}
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <Card className="w-full shadow-md">
          <CardBody className="p-4">
            <h4 className="text-sm font-bold text-gray-800 mb-3">
              How It Works
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Choose Your Package</p>
                  <p className="text-xs text-gray-500">Select the plan that fits your gaming needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Visit Any Club</p>
                  <p className="text-xs text-gray-500">Use your hours at any partner club in the network</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Choose Your Zone</p>
                  <p className="text-xs text-gray-500">Pick Basic, Premium, or VIP based on your package hours</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
