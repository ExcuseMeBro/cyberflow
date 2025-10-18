'use client';

import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
}

export default function PageHeader({ title, subtitle, rightContent, leftContent }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b-2 border-primary-200 shadow-sm">
      <div className="flex items-center justify-between p-4 max-w-md mx-auto">
        {/* Left Content */}
        {leftContent && (
          <div className="flex-shrink-0">
            {leftContent}
          </div>
        )}

        {/* Title Section */}
        <div className={`flex-1 ${leftContent || rightContent ? 'mx-3' : ''}`}>
          <h1 className="text-xl font-bold bg-gradient-passion bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Content */}
        {rightContent && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
}
