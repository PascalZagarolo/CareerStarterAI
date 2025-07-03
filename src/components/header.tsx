'use client';

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { useAuth } from "./auth-wrapper";
import { useState, useRef, useEffect } from "react";
import { 
  User, 
  LogOut, 
  ChevronDown, 
  LayoutDashboard,
  FileText,
  Briefcase,
} from "lucide-react";

export function Header() {
  const { user, logout, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // User Avatar Component
  const UserAvatar = ({ user }: { user: any }) => {
    const initials = getUserInitials(user.name);
    
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-sm">
        {user.imageUrl ? (
          <img 
            src={user.imageUrl} 
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
    );
  };

  return (
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
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {loading ? (
              // Loading state
              <div className="animate-pulse">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ) : user ? (
              // Authenticated user
              <div className="flex items-center space-x-4">
                {/* Quick Actions - Desktop */}
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    href="/resume-builder"
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Resume
                  </Link>
                  <Link
                    href="/career-path"
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Career Path
                  </Link>
                </div>

                {/* Quick Actions - Mobile */}
                <div className="md:hidden flex items-center space-x-1">
                  <Link
                    href="/resume-builder"
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Resume Builder"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/career-path"
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Career Path Finder"
                  >
                    <Briefcase className="w-4 h-4" />
                  </Link>
                </div>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <UserAvatar user={user} />
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <UserAvatar user={user} />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3" />
                          Dashboard
                        </Link>
                        <Link
                          href="/resume-builder"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FileText className="w-4 h-4 mr-3" />
                          Resume Builder
                        </Link>
                        <Link
                          href="/career-path"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Briefcase className="w-4 h-4 mr-3" />
                          Career Path Finder
                        </Link>
                        <Link
                          href="/cover-letter"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FileText className="w-4 h-4 mr-3" />
                          Cover Letters
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-1"></div>

                      {/* Settings & Logout */}
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Not authenticated
              <>
                <Link href="/signin" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 flex flex-row items-center text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start for free <BsArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 