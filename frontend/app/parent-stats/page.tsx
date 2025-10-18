'use client';

import { Card, CardBody, Button } from '@nextui-org/react';
import { ArrowLeft, TrendingUp, Clock, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

export default function ParentStatsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Statistics"
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
        <Card className="shadow-md">
          <CardBody className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Play Time Statistics</h3>
                <p className="text-xs text-gray-500">Detailed time tracking and reports</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Today</p>
                <p className="text-xl font-bold text-blue-600">3.5h</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">This Week</p>
                <p className="text-xl font-bold text-purple-600">18h</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardBody className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Activity Trends</h3>
                <p className="text-xs text-gray-500">Weekly and monthly comparisons</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white">
              View Detailed Reports
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardBody className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Achievements</h3>
                <p className="text-xs text-gray-500">Track gaming milestones</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              View All Achievements
            </Button>
          </CardBody>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
