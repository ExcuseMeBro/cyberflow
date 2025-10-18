'use client';

import { Card, CardBody, Button, Switch } from '@nextui-org/react';
import { ArrowLeft, Clock, Shield, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

export default function ParentControlPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Parental Control"
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
              <div>
                <h3 className="font-semibold text-gray-800">Time Limits</h3>
                <p className="text-xs text-gray-500">Manage daily and weekly play time</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              Configure Time Limits
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardBody className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Content Filters</h3>
                <p className="text-xs text-gray-500">Control age-appropriate content</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Manage Content Filters
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardBody className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Purchase Controls</h3>
                <p className="text-xs text-gray-500">Manage spending limits and approvals</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              Configure Purchases
            </Button>
          </CardBody>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
