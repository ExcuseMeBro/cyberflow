'use client';

import { Card, CardBody, Avatar, Button, Chip, Progress } from '@nextui-org/react';
import { Bell, Settings, Clock, Coins, TrendingUp, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import { useAuthStore } from '@/store/authStore';

// Mock child account data
const mockChildAccount = {
  id: 1,
  name: 'Test Gamer',
  username: 'testgamer',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testgamer',
  isOnline: true,
  lastActive: '2 minutes ago',
  balance: 15000, // CBDS tokens
  todayPlayTime: 3.5, // hours
  weeklyPlayTime: 18, // hours
  allowedDailyTime: 4, // hours
  allowedWeeklyTime: 25, // hours
};

const mockNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Daily limit approaching',
    message: 'Test Gamer has 30 minutes remaining for today',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'New purchase request',
    message: 'Test Gamer requested to buy a new game (5,000 CBDS)',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Achievement unlocked',
    message: 'Test Gamer completed daily gaming goals',
    time: '3 hours ago',
    read: true,
  },
];

const recentActivity = [
  { game: 'Fortnite', duration: 2.5, date: 'Today' },
  { game: 'Minecraft', duration: 1.0, date: 'Today' },
  { game: 'Roblox', duration: 3.5, date: 'Yesterday' },
];

export default function ParentDashboard() {
  const { user } = useAuthStore();
  const dailyProgress = (mockChildAccount.todayPlayTime / mockChildAccount.allowedDailyTime) * 100;
  const weeklyProgress = (mockChildAccount.weeklyPlayTime / mockChildAccount.allowedWeeklyTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Parent Dashboard"
        leftContent={
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
        }
        rightContent={
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="smooth-transition hover:bg-primary-100"
          >
            <Settings className="w-5 h-5" />
          </Button>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-4 animate-slide-up">
        {/* Child Account Card */}
        <Card className="shadow-lg animate-scale-in">
          <CardBody className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar
                    src={mockChildAccount.avatar}
                    size="lg"
                    className="w-16 h-16"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    mockChildAccount.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{mockChildAccount.name}</h3>
                  <p className="text-sm text-gray-500">@{mockChildAccount.username}</p>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={mockChildAccount.isOnline ? 'success' : 'default'}
                    className="mt-1"
                  >
                    {mockChildAccount.isOnline ? 'Online' : `Offline • ${mockChildAccount.lastActive}`}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-semibold text-gray-700">Balance</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockChildAccount.balance.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">CBDS Tokens</p>
                </div>
              </div>
            </div>

            {/* Play Time Today */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Today&apos;s Play Time</span>
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {mockChildAccount.todayPlayTime}h / {mockChildAccount.allowedDailyTime}h
                </span>
              </div>
              <Progress
                value={dailyProgress}
                color={dailyProgress > 90 ? 'danger' : dailyProgress > 70 ? 'warning' : 'primary'}
                className="h-2"
              />
            </div>

            {/* Weekly Play Time */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">Weekly Play Time</span>
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {mockChildAccount.weeklyPlayTime}h / {mockChildAccount.allowedWeeklyTime}h
                </span>
              </div>
              <Progress
                value={weeklyProgress}
                color={weeklyProgress > 90 ? 'danger' : weeklyProgress > 70 ? 'warning' : 'success'}
                className="h-2"
              />
            </div>
          </CardBody>
        </Card>

        {/* Notifications */}
        <section className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
            <Button
              size="sm"
              variant="light"
              className="text-primary-600"
              onPress={() => window.location.href = '/notifications'}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {mockNotifications.slice(0, 3).map((notification) => (
              <Card
                key={notification.id}
                className={`shadow-md ${notification.read ? 'opacity-70' : 'border-2 border-primary-200'}`}
                isPressable
              >
                <CardBody className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      notification.type === 'info' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {notification.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      ) : notification.type === 'info' ? (
                        <Bell className="w-5 h-5 text-blue-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-800 mb-2">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Activity</h2>
          <Card className="shadow-sm">
            <CardBody className="p-0">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 ${
                    index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{activity.game}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary-600">{activity.duration}h</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold h-auto py-4"
              size="lg"
            >
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-6 h-6" />
                <span className="text-sm">Set Limits</span>
              </div>
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold h-auto py-4"
              size="lg"
            >
              <div className="flex flex-col items-center gap-1">
                <Coins className="w-6 h-6" />
                <span className="text-sm">Add Funds</span>
              </div>
            </Button>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
