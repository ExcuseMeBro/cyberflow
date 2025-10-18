'use client';

import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import VideoCard from '@/components/VideoCard';
import { mockStreams } from '@/lib/mockData';

export default function RecommendedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Recommended For You"
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
        {mockStreams.map((stream) => (
          <VideoCard key={stream.id} stream={stream} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
