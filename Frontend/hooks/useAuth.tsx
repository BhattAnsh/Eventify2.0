"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };

  return {
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('user'),
    user: getUser()
  };
} 