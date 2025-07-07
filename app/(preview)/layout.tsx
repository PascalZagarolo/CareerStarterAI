import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";


import { Toaster } from "sonner";

import { AuthWrapper } from "@/components/auth-wrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerStarter - AI to Jumpstart Your Dream Career",
  description: "Discover your ideal career path, create perfect resumes, and get personalized roadmaps - all powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


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
