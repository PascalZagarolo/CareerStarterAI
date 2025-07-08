import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CareerStarter AI - AI-Powered Career Tools',
  description: 'Build professional resumes, find jobs, and advance your career with AI-powered tools.',
  keywords: 'resume builder, job search, career tools, AI, professional development',
  authors: [{ name: 'CareerStarter AI' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'CareerStarter AI - AI-Powered Career Tools',
    description: 'Build professional resumes, find jobs, and advance your career with AI-powered tools.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerStarter AI - AI-Powered Career Tools',
    description: 'Build professional resumes, find jobs, and advance your career with AI-powered tools.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 