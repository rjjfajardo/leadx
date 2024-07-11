import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import bookApi from '@/store/api/enhancedApi/books';
import leadApi from '@/store/api/enhancedApi/leads';
import { LeadsControllerFindAllArgs } from '@/store/api/gen/leads';

export const useLeads = (args: LeadsControllerFindAllArgs) => {
  const { data, isLoading } = leadApi.useLeadsControllerFindAllQuery({
    ...args,
  });

  const leads = useMemo(() => data?.data || [], [data]);
  const total = useMemo(() => data?.total || 0, [data]);

  return {
    leads,
    total,
    isLoading,
  };
};

export const useLead = (id?: string) => {
  const { data, isLoading } = leadApi.useLeadsControllerFindOneQuery(
    id ? { id } : skipToken,
  );

  const lead = useMemo(() => data?.data || null, [data]);

  return {
    lead,
    isLoading,
  };
};

export const useBook = (bookId?: string) => {
  const { data, isLoading } = bookApi.useBooksControllerFindOneBookQuery(
    bookId ? { bookId } : skipToken,
  );

  const book = useMemo(() => data?.data || null, [data]);

  return {
    book,
    isLoading,
  };
};

export const usePublisherOptions = () => {
  const { data, isLoading } =
    leadApi.useLeadsControllerFindAllPublishersQuery();

  const publisherOptions = useMemo(
    () =>
      data?.data.map(({ id, name }) => ({
        id,
        name,
      })) || [],
    [data],
  );

  return {
    publisherOptions,
    isLoading,
  };
};

export const useMinerOptions = () => {
  const { data, isLoading } = leadApi.useLeadsControllerFindAllMinersQuery();

  const minerOptions = useMemo(
    () =>
      data?.data.map(({ id, firstName, lastName }) => ({
        id,
        name: `${firstName} ${lastName}`,
      })) || [],
    [data],
  );

  return {
    minerOptions,
    isLoading,
  };
};
