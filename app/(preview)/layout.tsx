import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Link from "next/link";
import { Toaster } from "sonner";

import { AuthWrapper } from "@/components/auth-wrapper";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerStarter - AI to Jumpstart Your Dream Career",
  description: "Discover your ideal career path, create perfect resumes, and get personalized roadmaps - all powered by AI.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params?: { [key: string]: string | string[] };
}>) {
  // Server-side: get the current path from process.env.NEXT_PUBLIC_VERCEL_URL or headers
  // But in Next.js App Router, you can use the segment from the params or from the pathname
  // We'll use a workaround: check if the pathname includes '/pdf-export'
  const isPdfExport = typeof window === 'undefined' && typeof globalThis.location === 'undefined'
    ? (typeof require !== 'undefined' && require('next/headers').headers().get('x-invoke-path')?.includes('/pdf-export'))
    : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
         
        <main>{children}</main>
        </AuthWrapper>
        <Toaster position="top-right" richColors />
       
      </body>
    </html>
  );
}
