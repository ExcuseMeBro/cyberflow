import { Card, CardBody, CardFooter, Avatar, Chip } from '@nextui-org/react';
import { Stream } from '@/types';
import Link from 'next/link';

interface VideoCardProps {
  stream: Stream;
}

export default function VideoCard({ stream }: VideoCardProps) {
  return (
    <Link href={`/channel/${stream.channel.id}`}>
      <Card className="w-full card-hover shadow-md" isPressable>
        <CardBody className="p-0 relative">
          <div className="relative aspect-video w-full rounded-t-xl overflow-hidden">
            <img
              src={stream.thumbnail || '/placeholder-stream.jpg'}
              alt={stream.title}
              className="w-full h-full object-cover smooth-transition hover:scale-105"
            />
            {stream.isLive && (
              <Chip
                size="sm"
                className="absolute top-2 left-2 font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse-soft"
              >
                🔴 LIVE
              </Chip>
            )}
            {stream.viewers && (
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                👁 {stream.viewers.toLocaleString()} viewers
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex gap-2 p-3">
          <Avatar
            src={stream.channel.avatar}
            size="sm"
            className="flex-shrink-0"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{stream.title}</p>
            <p className="text-xs text-gray-500 truncate">{stream.channel.name}</p>
            {stream.category && (
              <p className="text-xs text-gray-400">{stream.category.name}</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
