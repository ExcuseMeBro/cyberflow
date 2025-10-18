'use client';

import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { ArrowLeft, Bell, AlertCircle, CheckCircle, Info, Trash2, Heart, Users, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import { useAuthStore } from '@/store/authStore';

// Mock notifications for parents
const mockParentNotifications = [
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
    message: 'Test Gamer requested to buy a new game (5,000 CG)',
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
  {
    id: 4,
    type: 'warning',
    title: 'Weekly limit at 80%',
    message: 'Test Gamer has used 20 hours out of 25 hours this week',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'info',
    title: 'New friend request',
    message: 'Test Gamer received a friend request from PlayerPro123',
    time: '1 day ago',
    read: true,
  },
  {
    id: 6,
    type: 'success',
    title: 'Reward earned',
    message: 'Test Gamer earned 500 CG coins for completing weekly goals',
    time: '2 days ago',
    read: true,
  },
];

// Mock notifications for regular users
const mockUserNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'New follower',
    message: 'ProGamer789 started following you',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'Stream milestone',
    message: 'Your stream reached 1,000 views!',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Achievement unlocked',
    message: 'You completed your daily gaming goals',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 4,
    type: 'info',
    title: 'Club discount available',
    message: 'Cyber Arena is offering 25% OFF today only',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    title: 'Tokens received',
    message: 'You earned 1,000 CG coins from your parent',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 6,
    type: 'info',
    title: 'Friend request',
    message: 'PlayerPro123 sent you a friend request',
    time: '1 day ago',
    read: true,
  },
  {
    id: 7,
    type: 'success',
    title: 'Weekly reward',
    message: 'You earned 500 CG coins for completing weekly goals',
    time: '2 days ago',
    read: true,
  },
  {
    id: 8,
    type: 'info',
    title: 'New tournament',
    message: 'Pro League is hosting a CS:GO tournament this weekend',
    time: '3 days ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { userType } = useAuthStore();

  const mockNotifications = userType === 'parent' ? mockParentNotifications : mockUserNotifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
      case 'success':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Notifications"
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
        rightContent={
          <Button
            size="sm"
            variant="light"
            className="text-primary-600"
          >
            Mark all read
          </Button>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-3 animate-slide-up">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`shadow-md ${notification.read ? 'opacity-70' : 'border-2 border-primary-200'}`}
            isPressable
          >
            <CardBody className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-semibold text-gray-800">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <Chip size="sm" color="primary" variant="flat">
                        New
                      </Chip>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
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
