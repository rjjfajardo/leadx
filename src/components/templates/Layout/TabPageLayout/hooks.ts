import { useRouter } from 'next/router';

import { TabType } from '@/components/parts/Tabs';

type UseHooksType = {
  tabs: TabType[];
};

export const useHooks = ({ tabs }: UseHooksType) => {
  const router = useRouter();

  const onSetTabKey = (key: string) => {
    const tab = tabs.find((tab) => tab.key === key);
    if (tab && tab.to) router.push(tab.to);
  };

  return {
    onSetTabKey,
  };
};
