"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUser, clearUser } from '@/lib/slices/userSlice';

export function useAuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      // Sync session data to Redux
      dispatch(setUser({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        role: session.user.role || 'USER'
      }));
    } else {
      // Clear user data when logged out
      dispatch(clearUser());
    }
  }, [session, status, dispatch]);

  return { user, isLoading: status === 'loading' };
}
