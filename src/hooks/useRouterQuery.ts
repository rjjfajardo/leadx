import { useRouter } from 'next/router';

export const useRouterQuery = <T extends { [K in keyof T]?: string }>() => {
  const router = useRouter();
  return router.query as T;
};
