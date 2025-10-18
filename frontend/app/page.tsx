'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if onboarding is completed first (before auth check)
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');

    if (!onboardingCompleted) {
      // First time user - show onboarding
      router.push('/onboarding');
      setIsChecking(false);
      return;
    }

    // Onboarding completed - check authentication
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      router.push('/home');
    }

    setIsChecking(false);
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
}
