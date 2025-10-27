
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/firebase';

/**
 * A hook to redirect unauthenticated users to the login page.
 * It also redirects authenticated users away from the login page.
 */
export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Wait until the auth state is determined
    if (isUserLoading) {
      return;
    }

    const isLoginPage = pathname === '/login';

    // If user is authenticated
    if (user) {
      // If they are on the login page, redirect them away
      if (isLoginPage) {
        router.replace('/admin/news');
      }
    } else {
      // If user is not authenticated and not on the login page,
      // redirect them to the login page.
      if (!isLoginPage) {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router, pathname]);
}
