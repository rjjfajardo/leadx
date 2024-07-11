import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useHooks = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) setIsReady(true);
  }, [router]);

  return {
    router,
    isReady,
  };
};
