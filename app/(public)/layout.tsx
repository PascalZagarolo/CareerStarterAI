'use client';

import { AuthWrapper } from '@/components/auth-wrapper';

export default function PublicLayout({
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