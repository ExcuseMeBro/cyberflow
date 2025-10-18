'use client';

import { Card, CardBody } from '@nextui-org/react';
import { BookOpen } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-bold">Library</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Card>
          <CardBody className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center">
              Your saved videos and history will appear here
            </p>
          </CardBody>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
