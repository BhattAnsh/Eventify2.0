"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  return {
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('user'),
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null
  };
} 