import { Card, CardBody, Avatar, Chip } from '@nextui-org/react';
import { Channel } from '@/types';
import Link from 'next/link';

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Link href={`/channel/${channel.id}`}>
      <Card className="w-20 flex-shrink-0 smooth-transition hover:scale-105 shadow-md" isPressable>
        <CardBody className="p-2 flex flex-col items-center gap-1">
          <div className="relative">
            <Avatar
              src={channel.avatar}
              size="lg"
              className="w-16 h-16 border-2 border-primary-200"
            />
            {channel.isLive && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <Chip
                  size="sm"
                  className="h-4 text-[10px] px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse-soft"
                >
                  LIVE
                </Chip>
              </div>
            )}
          </div>
          <p className="text-xs font-medium truncate w-full text-center text-gray-800">
            {channel.name}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
}
