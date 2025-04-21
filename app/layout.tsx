import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

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
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                CareerStarter
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/#features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/#faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </nav>
              
              <div className="flex items-center space-x-4">
                <Link href="/signin" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 flex flex-row items-center text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start for free <BsArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        <main>{children}</main>
        
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4 max-w-6xl">
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
      </body>
    </html>
  );
}
