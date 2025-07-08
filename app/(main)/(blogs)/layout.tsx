import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Link from "next/link";
import { Toaster } from "sonner";

import { AuthWrapper } from "@/components/auth-wrapper";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Career Blog - Expert Career Advice & Job Search Tips",
  description: "Discover expert career advice, job search strategies, and professional development tips. Get insights on resumes, interviews, networking, and career growth.",
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <Header />
        <main>{children}</main>
       
        <Toaster position="top-right" richColors />
       
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4 max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">CareerStarter</h3>
                <p className="text-gray-400">AI-powered career tools to help you find and land your dream job.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Features</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/resume-builder" className="text-gray-400 hover:text-white">
                      Resume Builder
                    </Link>
                  </li>
                  <li>
                    <Link href="/career-path" className="text-gray-400 hover:text-white">
                      Career Path Finder
                    </Link>
                  </li>
                  <li>
                    <Link href="/career-blog" className="text-gray-400 hover:text-white">
                      Career Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="text-gray-400 hover:text-white">
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link href="/cover-letter" className="text-gray-400 hover:text-white">
                      Cover Letter Generator
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-400">
                    support@careerstarter.de
                  </li>
                  <li className="text-gray-400">
                    Solingen, Germany
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} CareerStarter. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </AuthWrapper>
      </body>

    </html>
  );
}
