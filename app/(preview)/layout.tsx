// app/(preview)/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { AuthWrapper } from "@/components/auth-wrapper";
import { Header } from "@/components/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerStarter - AI to Jumpstart Your Dream Career",
  description: "Discover your ideal career path, create perfect resumes, and get personalized roadmaps - all powered by AI.",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen"></div>
        <AuthWrapper>
          {/* Optionally include the header if you want */}
          {/* <Header /> */}
          <main>{children}</main>
        </AuthWrapper>
        <Toaster position="top-right" richColors />
        {/* No footer here! */}
      </body>
    </html>
  );
}