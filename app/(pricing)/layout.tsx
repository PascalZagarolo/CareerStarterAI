'use client';

import { AuthWrapper } from '@/components/auth-wrapper';

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
} 