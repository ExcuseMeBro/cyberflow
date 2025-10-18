'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Avatar, Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { ArrowLeft, Bell, Share2, UserPlus, UserCheck } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import VideoCard from '@/components/VideoCard';
import { mockChannels, mockStreams } from '@/lib/mockData';

export default function ChannelPage() {
  const params = useParams();
  const router = useRouter();
  const channelId = parseInt(params.id as string);
  const channel = mockChannels.find(c => c.id === channelId) || mockChannels[0];

  const [isFollowing, setIsFollowing] = useState(channel.isFollowing);
  const [isSubscribed, setIsSubscribed] = useState(channel.isSubscribed);

  const channelStreams = mockStreams.filter(s => s.channel.id === channelId).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">{channel.name}</h1>
          <div className="flex items-center gap-2">
            <Button isIconOnly variant="light" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button isIconOnly variant="light" size="sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          {channel.banner && (
            <img
              src={channel.banner}
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute -bottom-12 left-4">
          <Avatar
            src={channel.avatar}
            className="w-24 h-24 border-4 border-white"
          />
        </div>
      </div>

      {/* Channel Info */}
      <div className="mt-14 px-4 pb-4 bg-white">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold">{channel.name}</h2>
            <p className="text-sm text-gray-500">@{channel.username}</p>
            <p className="text-sm text-gray-600 mt-1">
              {channel.followers.toLocaleString()} Followers
            </p>
          </div>
          {channel.isLive && (
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              LIVE
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            color={isFollowing ? 'default' : 'primary'}
            variant={isFollowing ? 'bordered' : 'solid'}
            startContent={isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            onPress={() => setIsFollowing(!isFollowing)}
            className="flex-1"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button
            color="secondary"
            variant={isSubscribed ? 'bordered' : 'solid'}
            onPress={() => setIsSubscribed(!isSubscribed)}
            className="flex-1"
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <Tabs
          aria-label="Channel tabs"
          classNames={{
            tabList: "w-full relative rounded-none p-0",
            cursor: "w-full bg-purple-600",
            tab: "px-4 h-12",
            tabContent: "group-data-[selected=true]:text-purple-600"
          }}
        >
          <Tab key="home" title="Home">
            <div className="p-4 space-y-4">
              {channelStreams.length > 0 ? (
                channelStreams.map(stream => (
                  <VideoCard key={stream.id} stream={stream} />
                ))
              ) : (
                <Card>
                  <CardBody>
                    <p className="text-center text-gray-500">No streams available</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </Tab>
          <Tab key="about" title="About">
            <div className="p-4">
              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">About {channel.name}</h3>
                  <p className="text-sm text-gray-600">
                    {channel.description || 'No description available.'}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Followers</span>
                      <span className="font-semibold">
                        {channel.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className="font-semibold">
                        {channel.isLive ? 'Live' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="schedule" title="Schedule">
            <div className="p-4">
              <Card>
                <CardBody>
                  <p className="text-center text-gray-500">
                    No scheduled streams
                  </p>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="videos" title="Videos">
            <div className="p-4 space-y-4">
              {channelStreams.map(stream => (
                <VideoCard key={stream.id} stream={stream} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
