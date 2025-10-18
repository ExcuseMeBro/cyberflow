'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, MapPin, ScanLine, Trophy, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Home, label: 'Home', href: '/home', isCenter: false },
    { icon: MapPin, label: 'Map', href: '/map', isCenter: false },
    { icon: ScanLine, label: 'Scan', href: '/scan', isCenter: true },
    { icon: Trophy, label: 'Competitions', href: '/competitions', isCenter: false },
    { icon: User, label: 'Profile', href: '/account', isCenter: false },
  ];

  if (pathname === '/auth/login' || pathname === '/desktop-blocked') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t-2 border-primary-200 z-50 shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCenter) {
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="absolute left-1/2 -translate-x-1/2 -top-8 smooth-transition hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-passion shadow-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  {/* Pulse Animation Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-passion animate-ping opacity-20" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center flex-1 h-full smooth-transition relative ${
                index === 2 ? 'invisible' : '' // Hide middle slot for center button
              }`}
            >
              <div className={`flex flex-col items-center justify-center gap-0.5 ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`}>
                <Icon
                  className={`w-6 h-6 smooth-transition ${isActive ? 'scale-110' : ''}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
