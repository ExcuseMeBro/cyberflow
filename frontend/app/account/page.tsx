'use client';

import { useRouter } from 'next/navigation';
import { Avatar, Card, CardBody } from '@nextui-org/react';
import {
  User,
  CreditCard,
  Bell,
  Globe,
  Moon,
  UserPlus,
  FileText,
  HelpCircle,
  BookOpen,
  LogOut,
  ChevronRight,
  Edit,
  Tv,
  DollarSign,
  Coins,
  Clock,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import { useAuthStore } from '@/store/authStore';

// Mock gamer stats
const mockGamerStats = {
  balance: 15000,
  todayPlayTime: 3.5,
  dailyLimit: 4,
  remainingTime: 0.5,
};

export default function AccountPage() {
  const router = useRouter();
  const { user, userType, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // Parent-specific menu items
  const parentMenuItems = [
    {
      icon: User,
      label: 'Profile Settings',
      href: '/account/edit',
      color: 'text-orange-600',
    },
    {
      icon: UserPlus,
      label: 'Child Accounts',
      href: '/child-accounts',
      color: 'text-purple-600',
    },
    {
      icon: User,
      label: 'Parental Controls',
      href: '/parent-control',
      color: 'text-blue-600',
    },
    {
      icon: Bell,
      label: 'Notifications',
      href: '/notifications',
      color: 'text-red-600',
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      href: '/payment-methods',
      color: 'text-green-600',
    },
    {
      icon: DollarSign,
      label: 'Wallet & Balance',
      href: '/wallet',
      color: 'text-yellow-600',
    },
    {
      icon: Globe,
      label: 'Language',
      value: 'English (US)',
      href: '/language',
      color: 'text-teal-600',
    },
    {
      icon: Moon,
      label: 'Dark Mode',
      href: '/dark-mode',
      color: 'text-gray-600',
    },
    {
      icon: HelpCircle,
      label: 'Help Center',
      href: '/help',
      color: 'text-pink-600',
    },
    {
      icon: FileText,
      label: 'Terms of Service',
      href: '/terms',
      color: 'text-gray-600',
    },
    {
      icon: BookOpen,
      label: 'Privacy Policy',
      href: '/privacy',
      color: 'text-indigo-600',
    },
  ];

  // Regular user menu items
  const userMenuItems = [
    {
      icon: Tv,
      label: 'My Channel',
      href: `/channel/${user?.id}`,
      color: 'text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'Subscriptions',
      href: '/subscriptions',
      color: 'text-green-600',
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      href: '/payment-methods',
      color: 'text-blue-600',
    },
    {
      icon: User,
      label: 'Profile',
      href: '/account/edit',
      color: 'text-orange-600',
    },
    {
      icon: Bell,
      label: 'Notification',
      href: '/notifications',
      color: 'text-red-600',
    },
    {
      icon: Globe,
      label: 'Preferences',
      href: '/preferences',
      color: 'text-indigo-600',
    },
    {
      icon: Globe,
      label: 'Language',
      value: 'English (US)',
      href: '/language',
      color: 'text-teal-600',
    },
    {
      icon: Moon,
      label: 'Dark Mode',
      href: '/dark-mode',
      color: 'text-gray-600',
    },
    {
      icon: HelpCircle,
      label: 'Help Center',
      href: '/help',
      color: 'text-pink-600',
    },
    {
      icon: UserPlus,
      label: 'Invite Friends',
      href: '/invite',
      color: 'text-cyan-600',
    },
    {
      icon: BookOpen,
      label: 'Community Guidelines',
      href: '/guidelines',
      color: 'text-blue-600',
    },
    {
      icon: FileText,
      label: 'Terms of Services',
      href: '/terms',
      color: 'text-gray-600',
    },
    {
      icon: FileText,
      label: 'About Streamo',
      href: '/about',
      color: 'text-purple-600',
    },
  ];

  const menuItems = userType === 'parent' ? parentMenuItems : userMenuItems;

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title={userType === 'parent' ? 'Parent Account' : 'Profile'}
        rightContent={
          <button
            onClick={() => router.push('/account/edit')}
            className="smooth-transition hover:scale-110 text-primary-600"
          >
            <Edit className="w-6 h-6" />
          </button>
        }
      />

      {/* Profile Section */}
      <div className="mx-4 mt-4 mb-4">
        <Card className="shadow-lg animate-slide-up">
          <CardBody className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <Avatar
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                  className="w-20 h-20 border-4 border-primary-200"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-3 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {user?.displayName || 'Andrew Aimsley'}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  @{user?.username || 'AndrewAimsley'}
                </p>
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs px-2.5 py-1 rounded-full mt-2 font-semibold">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Active
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Gamer Stats - Only for regular users */}
      {userType !== 'parent' && (
        <div className="mx-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Balance Card */}
            <Card className="shadow-md">
              <CardBody className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Coins className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs text-gray-600">Balance</span>
                </div>
                <p className="text-xl font-bold text-yellow-600 mb-1">
                  {mockGamerStats.balance.toLocaleString()}
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
                  <span className="text-xs text-gray-600">Today</span>
                </div>
                <p className="text-xl font-bold text-blue-600 mb-1">
                  {mockGamerStats.remainingTime}h left
                </p>
                <p className="text-xs text-gray-500">
                  {mockGamerStats.todayPlayTime}h / {mockGamerStats.dailyLimit}h used
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="bg-white mx-4 rounded-2xl shadow-lg overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center justify-between p-4 smooth-transition hover:bg-primary-50 active:bg-primary-100 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color.replace('text-', 'bg-')}/10`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-gray-800 text-sm truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.value && (
                  <span className="text-xs text-gray-500 font-medium">{item.value}</span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mx-4 mt-4 mb-4">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl shadow-lg smooth-transition hover:scale-[1.02] active:scale-[0.98] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <LogOut className="w-5 h-5 text-red-600" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-red-600 text-sm">Logout</span>
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
