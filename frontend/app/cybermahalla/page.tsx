'use client';

import { Card, CardBody, Button, Chip, Tabs, Tab } from '@nextui-org/react';
import { ArrowLeft, Users, Trophy, Plus, Swords } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import { mockCybermahallas } from '@/lib/mockData';

export default function CybermahallaPage() {
  const router = useRouter();

  const joinedMahallas = mockCybermahallas.filter(m => m.isJoined);
  const discoverMahallas = mockCybermahallas.filter(m => !m.isJoined);

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Cybermahalla"
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            startContent={<Plus className="w-4 h-4" />}
          >
            Create
          </Button>
        }
      />

      {/* Tabs */}
      <div className="px-4 pt-4">
        <Tabs
          aria-label="Cybermahalla tabs"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary-500",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary-600"
          }}
        >
          <Tab
            key="joined"
            title={
              <div className="flex items-center gap-2">
                <span>My Mahallas</span>
                <Chip size="sm" variant="flat">{joinedMahallas.length}</Chip>
              </div>
            }
          >
            <div className="py-4 space-y-3 animate-slide-up">
              {joinedMahallas.map((mahalla) => (
                <Card key={mahalla.id} className="w-full shadow-md min-h-[180px] sm:min-h-[200px]" isPressable>
                  <CardBody className="p-3 sm:p-4 flex flex-col">
                    <div className="flex gap-3 sm:gap-4 flex-1 min-h-0">
                      {/* Logo */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0">
                        <img
                          src={mahalla.logo}
                          alt={mahalla.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                              {mahalla.name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{mahalla.description}</p>
                          </div>
                          {mahalla.isOnline && (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="text-xs">{mahalla.members.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />
                            <span className="text-xs">{mahalla.activeCompetitions} active</span>
                          </div>
                        </div>

                        {/* Categories */}
                        <div className="flex gap-1 sm:gap-1.5 flex-wrap overflow-hidden h-[36px] sm:h-[42px]">
                          {mahalla.categories.map((category, index) => (
                            <Chip
                              key={index}
                              size="sm"
                              variant="flat"
                              color="primary"
                              className="text-xs"
                            >
                              {category}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      size="sm"
                      className="w-full mt-2 sm:mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex-shrink-0 text-xs sm:text-sm"
                      startContent={<Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    >
                      Challenge Mahalla
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>

          <Tab
            key="discover"
            title={
              <div className="flex items-center gap-2">
                <span>Discover</span>
                <Chip size="sm" variant="flat">{discoverMahallas.length}</Chip>
              </div>
            }
          >
            <div className="py-4 space-y-3 animate-slide-up">
              {discoverMahallas.map((mahalla) => (
                <Card key={mahalla.id} className="w-full shadow-md min-h-[180px] sm:min-h-[200px]" isPressable>
                  <CardBody className="p-3 sm:p-4 flex flex-col">
                    <div className="flex gap-3 sm:gap-4 flex-1 min-h-0">
                      {/* Logo */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0">
                        <img
                          src={mahalla.logo}
                          alt={mahalla.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                              {mahalla.name}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{mahalla.description}</p>
                          </div>
                          {mahalla.isOnline && (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="text-xs">{mahalla.members.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />
                            <span className="text-xs">{mahalla.activeCompetitions} active</span>
                          </div>
                        </div>

                        {/* Categories */}
                        <div className="flex gap-1 sm:gap-1.5 flex-wrap overflow-hidden h-[36px] sm:h-[42px]">
                          {mahalla.categories.map((category, index) => (
                            <Chip
                              key={index}
                              size="sm"
                              variant="flat"
                              color="primary"
                              className="text-xs"
                            >
                              {category}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      size="sm"
                      className="w-full mt-2 sm:mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex-shrink-0 text-xs sm:text-sm"
                      startContent={<Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    >
                      Join Mahalla
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
