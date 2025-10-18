'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
import { ScanLine, Image, X, Flashlight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

export default function ScanPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Scan QR Code"
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
            isIconOnly
            variant="light"
            size="sm"
          >
            <Flashlight className="w-5 h-5" />
          </Button>
        }
      />

      {/* Scanner Area */}
      <div className="p-6 animate-scale-in">
        <div className="relative aspect-square max-w-sm mx-auto">
          {/* Scanner Frame */}
          <div className="absolute inset-0 border-4 border-primary-300 rounded-3xl overflow-hidden">
            {/* Animated Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-200 to-transparent h-20 animate-pulse-soft" />

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-primary-600 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-8 border-r-8 border-primary-600 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-8 border-l-8 border-primary-600 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-8 border-r-8 border-primary-600 rounded-br-3xl" />

            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-passion rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-soft">
                  <ScanLine className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Position QR code within frame
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardBody className="p-4">
            <h3 className="font-semibold mb-3 text-center">How to Scan</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">1.</span>
                <span>Hold your device steady and align the QR code within the frame</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">2.</span>
                <span>Make sure the QR code is clear and well-lit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">3.</span>
                <span>The app will automatically detect and scan the code</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button
            className="w-full btn-gradient text-white font-semibold"
            size="lg"
            startContent={<Image className="w-5 h-5" />}
          >
            Upload from Gallery
          </Button>
          <Button
            variant="bordered"
            className="w-full border-2 border-primary-300 smooth-transition hover:bg-primary-50"
            size="lg"
          >
            Enter Code Manually
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
