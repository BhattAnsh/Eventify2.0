"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Calendar, User, ChevronRight } from "lucide-react";
import { auth } from '@/utils/auth';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { X, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Find Events', href: '/find-events' },
    { name: 'Create Event', href: '/create-event' },
    { name: 'My Events', href: '/my-events' },
  ];

  // Check auth status on mount and after any changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(auth.isAuthenticated());
      setUser(auth.getUser());
    };

    checkAuth();
    
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      
    };
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // auth.logout() doesn't exist, so we'll handle logout by just clearing state
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from storage
    toast.success('Successfully logged out');
    router.push('/login');
  };

  const getPageName = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/find-events':
        return 'Find Events';
      case '/create-event':
        return 'Create Event';
      case '/my-events':
        return 'My Events';
      case '/login':
        return 'Login';
      case '/signup':
        return 'Sign Up';
      default:
        return 'Page';
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className={`text-xl font-bold ${
                isScrolled 
                  ? 'text-gray-900 dark:text-gray-100' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                Eventify
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                    pathname === item.href 
                      ? 'text-gray-900 dark:text-gray-100' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                      <User className="h-4 w-4" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-lg rounded-md p-1">
                    <DropdownMenuItem className="flex flex-col items-start px-3 py-2 focus:bg-gray-100 dark:focus:bg-gray-800">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {user?.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                    <DropdownMenuItem 
                      asChild
                      className="px-3 py-2 text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800"
                    >
                      <Link href="/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      asChild
                      className="px-3 py-2 text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800"
                    >
                      <Link href="/my-events">My Events</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="px-3 py-2 text-red-600 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-red-700"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <SignedOut>
                    <Button variant="ghost">
                      <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <UserButton/>
                  </SignedIn>
                </div>
              )}
            </div>
          </div>

          {pathname !== '/' && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2 py-3 text-sm">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {getPageName(pathname)}
                </span>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-white dark:bg-gray-950 z-40 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isLoggedIn && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-center mb-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button
                    className="w-full justify-center bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16 sm:h-20" />
    </>
  );
}