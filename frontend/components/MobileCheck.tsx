'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileCheck({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || width < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile && pathname !== '/desktop-blocked') {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-scale-in">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-passion rounded-3xl flex items-center justify-center shadow-lg animate-pulse-soft">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-passion bg-clip-text text-transparent mb-4">
            📱 Mobile Only
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            This app is only available on mobile devices. Please reopen from your phone.
          </p>
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 border-2 border-primary-200">
            <p className="text-sm text-primary-700 font-medium">
              ✨ For the best experience, access this platform from your mobile device.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
