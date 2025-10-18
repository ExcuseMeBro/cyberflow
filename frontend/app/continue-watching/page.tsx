'use client';

import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import VideoCard from '@/components/VideoCard';
import { mockStreams } from '@/lib/mockData';

export default function ContinueWatchingPage() {
  const router = useRouter();

  // Use all streams for continue watching
  const continueWatching = mockStreams.filter(s => !s.isLive);

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Continue Watching"
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
      <div className="p-4 space-y-4 animate-slide-up">
        {continueWatching.length > 0 ? (
          continueWatching.map((stream) => (
            <VideoCard key={stream.id} stream={stream} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos to continue watching</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
