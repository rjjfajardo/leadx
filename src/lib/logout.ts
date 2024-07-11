import Router from 'next/router';

import { whiteListedRoutes } from '@/constants/whiteListedRoutes';
import {
  sessionExpiredKey,
  sessionExpiredOrLoggedOutKey,
} from '@/lib/sessionExpired';
import { removeToken } from '@/lib/tokenStorage';
import { baseApi } from '@/store/api/baseApi';
import { setIsLoggedIn } from '@/store/slice/isLoggedInSlice';
import { store } from '@/store/store';

export interface logoutProps {
  type: 'user_initiated' | 'session_expired_or_logged_out';
}

/** Logout initiated by the user or a `401` response. */
export const logout = ({ type }: logoutProps) => {
  const isLoggedIn = store.getState().isLoggedIn.value;

  // redirect to /login for user initiated logout or logged-out requests
  if (type === 'user_initiated' || !isLoggedIn) {
    if (
      Router.pathname === '/403' ||
      !whiteListedRoutes.includes(Router.pathname)
    ) {
      Router.push('/login');
    }
  }

  if (type === 'user_initiated') {
    store.dispatch(baseApi.util.resetApiState());
  }

  // trigger session expired event
  if (type === 'session_expired_or_logged_out' && isLoggedIn) {
    window.dispatchEvent(new Event(sessionExpiredKey));
  }

  removeToken();
  store.dispatch(setIsLoggedIn({ value: false }));
};

if (typeof window !== 'undefined') {
  window.addEventListener(sessionExpiredOrLoggedOutKey, () => {
    logout({ type: 'session_expired_or_logged_out' });
  });
}
