'use client';

import { Button } from '@nextui-org/react';
import { Home, SearchX } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 animate-fade-in">
      <div className="text-center animate-scale-in">
        {/* 404 Icon */}
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-passion rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-soft">
          <SearchX className="w-16 h-16 text-white" strokeWidth={2.5} />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold bg-gradient-passion bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="btn-gradient text-white font-semibold w-full max-w-xs"
            startContent={<Home className="w-5 h-5" />}
            onPress={() => router.push('/home')}
          >
            Go to Home
          </Button>
          <Button
            size="lg"
            variant="bordered"
            className="border-2 border-primary-300 smooth-transition hover:bg-primary-50 w-full max-w-xs"
            onPress={() => router.back()}
          >
            Go Back
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
