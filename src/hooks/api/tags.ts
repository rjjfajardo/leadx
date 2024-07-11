import { useMemo } from 'react';

import tagsApi from '@/store/api/enhancedApi/tags';

export const useTags = () => {
  const { data } = tagsApi.useTagsControllerFindAllQuery();

  const tags = useMemo(() => data?.data || [], [data]);

  return {
    tags,
  };
};
