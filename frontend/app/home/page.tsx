'use client';

import { Button } from '@nextui-org/react';
import { Bell, Plus, ChevronRight } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import CategoryCard from '@/components/CategoryCard';
import ChannelCard from '@/components/ChannelCard';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import ParentDashboard from '@/components/ParentDashboard';
import { mockStreams, mockCategories, mockChannels } from '@/lib/mockData';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function Home() {
  const { userType } = useAuthStore();
  const recommendedStreams = mockStreams.slice(0, 4);
  const continueWatching = mockStreams.slice(4, 8);
  const followedCategories = mockCategories.slice(0, 4);
  const followedChannels = mockChannels.filter(c => c.isFollowing).slice(0, 6);

  // Show parent dashboard if user is parent
  if (userType === 'parent') {
    return <ParentDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Home"
        leftContent={
          <div className="w-10 h-10 rounded-xl bg-gradient-passion flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">C</span>
          </div>
        }
        rightContent={
          <>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="smooth-transition hover:bg-primary-100"
            >
              <Bell className="w-5 h-5" />
            </Button>
          </>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-6 animate-slide-up">
        {/* Followed Categories */}
        <section className="animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Followed Categories</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
              as={Link}
              href="/categories"
              className="smooth-transition hover:text-primary-600"
            >
              See All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {followedCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Followed Channels */}
        <section className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Followed Channels</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
              as={Link}
              href="/following"
            >
              See All
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {followedChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Recommended For You</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recommendedStreams.map((stream) => (
              <VideoCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        <section className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Continue Watching</h2>
            <Button
              size="sm"
              variant="light"
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {continueWatching.map((stream) => (
              <VideoCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
