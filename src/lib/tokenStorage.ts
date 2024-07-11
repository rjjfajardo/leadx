export const tokenKey = 'token' as const;

/**
 * get token from local storage.
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(tokenKey);
};

/**
 * save token to local storage.
 */
export const setToken = (token: string): void => {
  window.localStorage.setItem(tokenKey, token);
};

/**
 * remove token from local storage.
 */
export const removeToken = (): void => {
  window.localStorage.removeItem(tokenKey);
};
