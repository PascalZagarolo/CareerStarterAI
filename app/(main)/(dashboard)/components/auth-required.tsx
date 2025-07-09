'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AuthRequired() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white border border-gray-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Authentication Required
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Please sign in to access your dashboard and manage your career resources.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Link href="/signin" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">Don&apos;t have an account? </span>
            <Link href="/signup" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 