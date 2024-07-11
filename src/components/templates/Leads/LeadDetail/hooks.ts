import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Option } from '@/components/parts/MoreVertMenu';
import { TabType } from '@/components/parts/Tabs';
import {
  BookFormValues,
  bookSchema,
} from '@/components/templates/Leads/LeadCreateDialog/BookForm/hooks';
import {
  DISTRO_TYPE,
  FOR_GRAVEYARD_LEAD_STATUS,
  FOR_SANITATION_LEAD_STATUS,
  RETURN_TO_MINER_CONTACT_STATUS,
} from '@/constants/lead';
import { PER_PAGE } from '@/constants/pagination';
import { STATUS, TAGS } from '@/constants/tagsAndStatus';
import { useCompanies } from '@/hooks/api/companies';
import { useBook, useLead, useLeads } from '@/hooks/api/leads';
import { useStatus } from '@/hooks/api/status';
import { useSystemLogs } from '@/hooks/api/system-logs';
import { useTags } from '@/hooks/api/tags';
import { useAccessControl } from '@/hooks/useAccessControl';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import bookApi from '@/store/api/enhancedApi/books';
import companyApi from '@/store/api/enhancedApi/companies';
import leadApi from '@/store/api/enhancedApi/leads';
import { DistroType } from '@/store/api/gen/leads';

export const useHooks = () => {
  const { hasUserRole } = useAccessControl();
  const [activeTab, setActiveTab] = useState<
    'history' | 'comments' | 'activity'
  >('history');

  const router = useRouter();
  const { handleError, handleSuccess } = useResponseHandler();
  const { setBreadcrumbItems } = useBreadcrumb();
  const { id, bookId, page, distroType } = useRouterQuery<{
    id: string;
    bookId: string;
    page: string;
    distroType: DistroType;
  }>();
  const [isOpenEditAuthorInfoDialog, setIsOpenEditAuthorInfoDialog] =
    useState(false);
  const [isOpenCreateBookDialog, setIsOpenCreateBookDialog] = useState(false);
  const [isOpenContactCreateDialog, setIsOpenContactCreateDialog] =
    useState(false);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [
    openReturnToMinerConfirmationDialog,
    setOpenReturnToMinerConfirmationDialog,
  ] = useState(false);
  const [
    openReturnToVerifierrConfirmationDialog,
    setOpenReturnToVerifierConfirmationDialog,
  ] = useState(false);

  const [updateLeadMutation] = leadApi.useLeadsControllerUpdateMutation();
  const [createCompany] = companyApi.useCompaniesControllerCreateMutation();
  const [updateBookMutation] = bookApi.useBooksControllerUpdateMutation();
  const [moveLeadToMainSanitizedDistro] =
    leadApi.useLeadsControllerMoveLeadToMainSanitizedDistroMutation();

  const [moveLeadToGraveyardDistro] =
    leadApi.useLeadsControllerMoveLeadToGraveyardDistroMutation();

  const { leads } = useLeads({
    perPage: PER_PAGE,
    page: parseInt(page),
    distroType,
    showReturnedLeadsOnly: false,
  });
  const { lead, isLoading } = useLead(id);
  const { systemLogs } = useSystemLogs(id);
  const { book } = useBook(bookId);
  const { status } = useStatus();
  const { tags } = useTags();
  const { companies } = useCompanies();

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(bookSchema),
  });

  useEffect(() => {
    reset({
      title: book?.title,
      bookLink: book?.bookLink ?? undefined,
      details: book?.bookPublishers.map(
        ({ id, isbn, year, bookFormat, publisher }) => ({
          id,
          isbn: isbn ?? undefined,
          publisher: {
            id: publisher.id,
            name: publisher.name,
          },
          year: year,
          bookFormat: bookFormat,
        }),
      ),
    });
  }, [book]);

  const { fields: bookDetailFields } = useFieldArray({
    control,
    name: 'details',
  });

  const leadIds = leads.map((lead) => lead.id);

  const goToDetails = (id: string) => {
    router.push(`/leads/${id}/details?page=${page}&distroType=${distroType}`);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      goToDetails(leadIds[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < leadIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
      goToDetails(leadIds[currentIndex + 1]);
    }
  };

  useEffect(() => {
    if (!lead) return;

    let breadcrumbItem = {
      title: 'All Mined Leads',
      href: '/unsanitized-distro/leads',
    };

    if (
      lead.currentDistro === DISTRO_TYPE.ASSIGNED_UNSANITIZED &&
      lead.status.label !== STATUS.RETURNED_TO_MINER
    ) {
      breadcrumbItem = {
        title: 'Lead Verification',
        href: '/unsanitized-distro/leads/verification',
      };
    }

    if (lead.currentDistro === DISTRO_TYPE.MAIN_SANITIZED) {
      breadcrumbItem = {
        title: 'Sanitized Leads',
        href: '/sanitized-distro/leads',
      };
    }

    if (lead.currentDistro === DISTRO_TYPE.ASSIGNED_SANITIZED) {
      breadcrumbItem = {
        title: 'My Assigned Leads',
        href: '/sanitized-distro/leads/assigned',
      };
    }

    setBreadcrumbItems([
      ...[breadcrumbItem],
      {
        title: `${lead.firstName} ${lead.lastName}`,
      },
    ]);
  }, [lead]);

  useEffect(() => {
    if (
      isEditingBook ||
      openReturnToMinerConfirmationDialog ||
      openReturnToVerifierrConfirmationDialog
    ) {
      return;
    }

    if (lead && lead.books.length) {
      router.push({
        pathname: `/leads/${id}/details`,
        query: page
          ? `bookId=${lead.books[0].id}&page=${page}&distroType=${distroType}`
          : `bookId=${lead.books[0].id}`,
      });
    }
  }, [lead]);

  const tabs = useMemo(() => {
    return lead
      ? lead.books.map((book) => ({
          key: book.title,
          label: book.title,
          to: `/leads/${id}/details?bookId=${book.id}`,
        }))
      : [];
  }, [lead, id]);

  const leadTabs: TabType[] = [
    {
      key: 'history',
      label: 'History',
      onClick: () => setActiveTab('history'),
    },
    {
      key: 'comments',
      label: 'Comments',
      onClick: () => setActiveTab('comments'),
    },
    {
      key: 'activity',
      label: 'Activity',
      onClick: () => setActiveTab('activity'),
    },
  ];

  const onSetTabKey = (key: string) => {
    const tab = tabs.find((tab) => tab.key === key);
    if (tab && tab.to)
      router.push(`${tab.to}&page=${page}&distroType=${distroType}`);
  };

  const handleCreateCompany = async (name: string) => {
    if (!name) return;

    try {
      await createCompany({
        createCompanyDto: {
          name,
        },
      }).unwrap();
      handleSuccess('Successfully created company');
    } catch (error) {
      handleError(error);
    }
  };

  const updateLeadStatusOrTag = async (statusId?: number, tagId?: number) => {
    try {
      await updateLeadMutation({
        updateLeadDto: { statusId, tagId },
        id,
      }).unwrap();
      statusId
        ? handleSuccess('Successfully updated lead status.')
        : handleSuccess('Successfully updated lead tag.');
    } catch (e) {
      handleError(e);
    }
  };

  const showMovedToGraveyardBtn =
    lead?.status.label &&
    lead.currentDistro === DISTRO_TYPE.ASSIGNED_UNSANITIZED &&
    (lead.status.label === STATUS.DO_NOT_CALL ||
      lead.status.label === STATUS.DECEASED);

  const showMovedToSanitizedBtn =
    lead &&
    lead.currentDistro === DISTRO_TYPE.ASSIGNED_UNSANITIZED &&
    (lead.tag.label === TAGS.HOT_LEAD ||
      FOR_SANITATION_LEAD_STATUS.includes(lead.status.label) ||
      lead?.leadContacts
        .filter(({ contact }) => contact?.contactType === 'PHONE')
        .every(({ status }) => status?.label === STATUS.VERIFIED)) &&
    !FOR_GRAVEYARD_LEAD_STATUS.includes(lead.status.label);

  const statusOptions = status
    .filter(({ label }) => {
      if (label === STATUS.PENDING_VERIFICATION) {
        return true;
      } else if (label === STATUS.RETURNED_TO_MINER) {
        return false;
      } else {
        return ![
          STATUS.PENDING_VERIFICATION,
          STATUS.NOT_IN_SERVICE,
          STATUS.WRONG_NUMBER,
          STATUS.RING_OUT,
        ].includes(label);
      }
    })
    .map((stat) => ({
      label: stat.label,
      color: stat.colorValue,
      onClick: () => {
        updateLeadStatusOrTag(stat.id, undefined);
      },
    }));

  const tagOptions = tags.map((tag) => ({
    label: tag.label,
    color: tag.colorValue!,
    onClick: () => {
      updateLeadStatusOrTag(undefined, tag.id);
    },
  }));

  const moveVertOptions: Option[] = [
    {
      label: 'Move to Sanitized Distro',
      onClick: async () => {
        try {
          await moveLeadToMainSanitizedDistro({ id }).unwrap();
          handleSuccess('Successfully moved lead to main sanitized.');
          if (leads.length) {
            handleNext();
          }
          router.replace('/unsanitized-distro/leads/verification');
        } catch (e) {
          handleError(e);
        }
      },
      disabled: !showMovedToSanitizedBtn,
    },
    {
      label: 'Move to Graveyard Distro',
      onClick: async () => {
        try {
          await moveLeadToGraveyardDistro({ id }).unwrap();
          handleSuccess('Successfully moved lead to graveyard.');
          if (leads.length) {
            handleNext();
          }
          router.replace('/unsanitized-distro/leads/verification');
        } catch (e) {
          handleError(e);
        }
      },
      disabled: !showMovedToGraveyardBtn,
    },
  ];

  const updateLeadBook = async (values: BookFormValues) => {
    try {
      await updateBookMutation({
        updateBookDto: { book: { ...values }, bookId },
      }).unwrap();
      setIsEditingBook(false);
      handleSuccess('Successfully updated book.');
    } catch (e) {
      handleError(e);
    }
  };

  const returnToMiner = async () => {
    const returnedToMinerStatusId = status.find(
      ({ label }) => label === STATUS.RETURNED_TO_MINER,
    )?.id;

    if (!returnedToMinerStatusId) {
      handleError(undefined, 'Status (RETURNED TO MINER) not found.');
      return;
    }

    try {
      await updateLeadMutation({
        updateLeadDto: { statusId: returnedToMinerStatusId },
        id,
      }).unwrap();

      handleSuccess('Successfully returned to miner.');

      router.replace('/unsanitized-distro/leads/verification');
    } catch (e) {
      handleError(e);
    }
  };

  const returnToVerifier = async () => {
    const pendingVerificationStatusId = status.find(
      ({ label }) => label === STATUS.PENDING_VERIFICATION,
    )?.id;

    if (!pendingVerificationStatusId) {
      handleError(undefined, 'Status (PENDING VERIFICATION) not found.');
      return;
    }

    try {
      await updateLeadMutation({
        updateLeadDto: { statusId: pendingVerificationStatusId },
        id,
      }).unwrap();

      handleSuccess('Successfully returned to the assigned verifier.');

      router.replace('/unsanitized-distro/leads');
    } catch (e) {
      handleError(e);
    }
  };

  const isAllPhoneNumbersInvalid = useMemo(() => {
    if (!lead) return false;

    return lead.leadContacts
      .filter(({ contact }) => contact?.contactType === 'PHONE')
      .every(({ status }) =>
        RETURN_TO_MINER_CONTACT_STATUS.includes(status?.label ?? ''),
      );
  }, [lead]);

  const showReturnToMinerBtn = useMemo(() => {
    if (!lead) return false;

    return (
      isAllPhoneNumbersInvalid &&
      lead.currentDistro === DISTRO_TYPE.ASSIGNED_UNSANITIZED &&
      lead.status.label !== STATUS.RETURNED_TO_MINER
    );
  }, [lead]);

  const showReturnToVerifier = useMemo(() => {
    if (!lead) return false;

    return (
      !isAllPhoneNumbersInvalid &&
      lead.currentDistro === DISTRO_TYPE.ASSIGNED_UNSANITIZED &&
      lead.status.label === STATUS.RETURNED_TO_MINER
    );
  }, [lead]);

  return {
    lead,
    book,
    isLoading,
    tabs,
    bookId,
    onSetTabKey,
    handleNext,
    handlePrev,
    currentIndex,
    leadIds,
    isOpenEditAuthorInfoDialog,
    setIsOpenEditAuthorInfoDialog,
    isOpenCreateBookDialog,
    setIsOpenCreateBookDialog,
    isEditingBook,
    setIsEditingBook,
    control,
    isOpenContactCreateDialog,
    setIsOpenContactCreateDialog,
    leadTabs,
    activeTab,
    systemLogs,
    statusOptions,
    tagOptions,
    companies,
    returnToMiner,
    returnToVerifier,
    handleCreateCompany,
    bookDetailFields,
    showReturnToVerifier,
    showReturnToMinerBtn,
    isAllPhoneNumbersInvalid,
    openReturnToMinerConfirmationDialog,
    setOpenReturnToMinerConfirmationDialog,
    openReturnToVerifierrConfirmationDialog,
    setOpenReturnToVerifierConfirmationDialog,
    onSubmit: handleSubmit(updateLeadBook),
    showMovedToSanitizedBtn,
    moveVertOptions,
    hasUserRole,
  };
};
