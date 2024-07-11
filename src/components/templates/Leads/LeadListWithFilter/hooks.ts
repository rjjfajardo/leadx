import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { FilterItemProps } from '@/components/parts/FilterItem';
import { LeadListWithFilterProps } from '@/components/templates/Leads/LeadListWithFilter';
import { DISTRO_TYPE } from '@/constants/lead';
import { PER_PAGE } from '@/constants/pagination';
import {
  useLeads,
  useMinerOptions,
  usePublisherOptions,
} from '@/hooks/api/leads';
import { debounce } from '@/lib/debounce';
import yup from '@/lib/yup';

const schema = yup.object().shape({
  listType: yup.string().nullable(),
  searchText: yup.string().nullable(),
  dateAddedFrom: yup.date().nullable(),
  dateAddedTo: yup.date().nullable(),
  miners: yup.array().of(yup.string().required()),
  publishers: yup.array().of(yup.string().required()),
});

interface UseHooksParams extends Pick<LeadListWithFilterProps, 'distroType'> {}

export const useHooks = ({ distroType }: UseHooksParams) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedAccordion, setExpandedAccordion] = useState<string>();
  const [searchText, setSearchText] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAcquireLeadsDialog, setShowAcquireLeadsDialog] = useState(false);

  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      listType: 'ALL_MINED_LEADS',
    },
  });

  const { control, setValue } = formMethods;

  const dateAddedFrom = useWatch({ control, name: 'dateAddedFrom' });
  const dateAddedTo = useWatch({ control, name: 'dateAddedTo' });
  const search = useWatch({ control, name: 'searchText' });
  const miners = useWatch({ control, name: 'miners' });
  const publishers = useWatch({ control, name: 'publishers' });
  const listType = useWatch({ control, name: 'listType' });

  const { leads, total: totalLeads } = useLeads({
    page,
    miners,
    searchText,
    publishers,
    perPage: PER_PAGE,
    dateAddedFrom: dateAddedFrom ? String(dateAddedFrom) : undefined,
    dateAddedTo: dateAddedTo ? String(dateAddedTo) : undefined,
    showReturnedLeadsOnly: listType === 'RETURNED_LEADS',
    distroType:
      listType === 'RETURNED_LEADS'
        ? DISTRO_TYPE.ASSIGNED_UNSANITIZED
        : distroType,
  });

  const { minerOptions } = useMinerOptions();
  const { publisherOptions } = usePublisherOptions();

  const debounceSetSearchText = debounce((text: string) => {
    setSearchText(text);
  }, 500);

  useEffect(() => {
    debounceSetSearchText(search ?? '');
  }, [search]);

  const filterItems: FilterItemProps[] = [];

  if (dateAddedFrom && dateAddedTo) {
    filterItems.push({
      title: 'Date Added',
      value: `${dateAddedFrom} - ${dateAddedTo}`,
      clear: () => {
        setValue('dateAddedFrom', null);
        setValue('dateAddedTo', null);
      },
    });
  }

  if (search) {
    filterItems.push({
      title: 'Search',
      value: search,
      clear: () => setValue('searchText', undefined),
    });
  }

  if (miners?.length) {
    const minerFilters = minerOptions
      .filter(({ id }) => miners.includes(id))
      .map(({ name }) => name);

    filterItems.push({
      title: 'Miner',
      value: minerFilters.join(', '),
      clear: () => setValue('miners', undefined),
    });
  }

  if (publishers?.length) {
    const publisherFilters = publisherOptions
      .filter(({ id }) => publishers.includes(id))
      .map(({ name }) => name);

    filterItems.push({
      title: 'Publisher',
      value: publisherFilters.join(', '),
      clear: () => setValue('publishers', undefined),
    });
  }

  const handleAccordionChange = (panel: string, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : undefined);
  };

  return {
    totalLeads,
    leads,
    page,
    setPage,
    router,
    formMethods,
    filterItems,
    showFilters,
    setShowFilters,
    expandedAccordion,
    handleAccordionChange,
    showCreateForm,
    setShowCreateForm,
    minerOptions,
    publisherOptions,
    showAcquireLeadsDialog,
    setShowAcquireLeadsDialog,
  };
};
