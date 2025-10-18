'use client';

import { useState } from 'react';
import { Input, Tabs, Tab, Chip } from '@nextui-org/react';
import { Search } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import VideoCard from '@/components/VideoCard';
import CategoryCard from '@/components/CategoryCard';
import { mockStreams, mockCategories } from '@/lib/mockData';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const liveChannels = mockStreams.filter(s => s.isLive).slice(0, 3);
  const recentGames = mockCategories.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="p-4 space-y-3">
          <h1 className="text-xl font-bold">Discover</h1>
          <Input
            placeholder="Search games, categories or videos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: "text-sm",
              inputWrapper: "bg-gray-100 border-none"
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Chip color="primary" variant="solid" size="md">Games</Chip>
          <Chip variant="flat" size="md">IRL</Chip>
          <Chip variant="flat" size="md">Music</Chip>
          <Chip variant="flat" size="md">Esports</Chip>
        </div>

        {/* Live Channels You May Like */}
        <section>
          <h2 className="text-lg font-bold mb-3">Live Channels You May Like</h2>
          <div className="space-y-4">
            {liveChannels.map((stream) => (
              <VideoCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>

        {/* Categories You May Like */}
        <section>
          <h2 className="text-lg font-bold mb-3">Categories You May Like</h2>
          <div className="grid grid-cols-3 gap-3">
            {mockCategories.slice(0, 6).map((category) => (
              <div key={category.id} className="flex flex-col">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <img
                    src={category.thumbnail}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold truncate">{category.name}</p>
                <p className="text-xs text-gray-500">
                  {category.viewerCount?.toLocaleString()} viewers
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Released Games */}
        <section>
          <h2 className="text-lg font-bold mb-3">Recently Released Games</h2>
          <div className="grid grid-cols-3 gap-3">
            {recentGames.map((game) => (
              <div key={game.id} className="flex flex-col">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <img
                    src={game.thumbnail}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold truncate">{game.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
