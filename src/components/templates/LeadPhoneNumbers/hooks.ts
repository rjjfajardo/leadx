import { useState } from 'react';

import { ChipSelectProps } from '@/components/templates/ChipSelect/hooks';
import { CONTACT_STATUS } from '@/constants/lead';
import { useStatus } from '@/hooks/api/status';
import { useAccessControl } from '@/hooks/useAccessControl';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import contactApi from '@/store/api/enhancedApi/contacts';
import { Contact } from '@/store/api/gen/leads';

export const useHooks = () => {
  const { status } = useStatus();
  const { hasUserRole } = useAccessControl();
  const { handleError, handleSuccess } = useResponseHandler();
  const [openIniateCallDialog, setOpenIniateCallDialog] = useState(false);
  const [callInformation, setCallInformation] = useState<{
    leadContactId: number;
    phoneNumber: string;
  }>({ phoneNumber: '', leadContactId: 0 });

  const [updateContactStatus] =
    contactApi.useContactsControllerUpdateMutation();

  const updateContactStatusHandler = async (
    statusId: number,
    leadContactId: number,
  ) => {
    try {
      await updateContactStatus({
        updateContactDto: {
          leadContactId,
          statusId,
        },
      });
      handleSuccess('Successfully updated contact status');
    } catch (e) {
      handleError(e);
    }
  };

  const statusOptions = (leadContactId: number): ChipSelectProps[] => {
    return status
      .filter(({ label }) => CONTACT_STATUS.includes(label))
      .map((stat) => ({
        label: stat.label,
        color: stat.colorValue,
        onClick: () => {
          updateContactStatusHandler(stat.id, leadContactId);
        },
      }));
  };

  const handlePhoneIconClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    contact: Contact,
    leadContactId: number,
  ) => {
    event.preventDefault();

    if (leadContactId && contact) {
      setOpenIniateCallDialog(true);
      setCallInformation({
        leadContactId,
        phoneNumber: contact.contactDetail,
      });
    } else {
      setOpenIniateCallDialog(false);
      console.error('Contact information is missing.');
    }
  };

  return {
    statusOptions,
    handlePhoneIconClick,
    callInformation,
    openIniateCallDialog,
    setOpenIniateCallDialog,
    hasUserRole,
  };
};
