import { useEffect, useState } from 'react';

import { useResponseHandler } from '@/hooks/useResponseHandler';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import contactApi from '@/store/api/enhancedApi/contacts';

interface Props {
  handleClose: (value: boolean) => void;
  leadContactId: number;
}

interface TimeSpent {
  hrs: string;
  mins: string;
  secs: string;
}

export const useHooks = ({ handleClose, leadContactId }: Props) => {
  const { id } = useRouterQuery<{
    id: string;
  }>();

  const { handleError } = useResponseHandler();

  const [createContactLogMutation] =
    contactApi.useContactsControllerCreateContactLogMutation();

  const [openOngoingCall, setOpenOngoingCallDialog] = useState(false);
  const [formattedDuration, setFormattedDuration] = useState<string>('');
  const [timeSpent, setTimeSpent] = useState<TimeSpent>({
    hrs: '00',
    mins: '00',
    secs: '00',
  });
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStartTimer = () => {
    if (!intervalId) {
      const interval = setInterval(() => {
        setTimeInSeconds((prev) => prev + 1);
      }, 1000);
      setIntervalId(interval);
    }
  };

  const handleStopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);

      const hrs = Math.floor(timeInSeconds / 3600);
      const mins = Math.floor((timeInSeconds % 3600) / 60);
      const secs = timeInSeconds % 60;

      setTimeSpent({
        hrs: hrs < 10 ? `0${hrs}` : `${hrs}`,
        mins: mins < 10 ? `0${mins}` : `${mins}`,
        secs: secs < 10 ? `0${secs}` : `${secs}`,
      });

      let durationText = '';
      if (hrs > 0) {
        durationText += `${hrs}hrs `;
      }
      if (mins > 0 || hrs > 0) {
        durationText += `${mins}min `;
      }
      durationText += `${secs}sec`;

      setFormattedDuration(durationText);

      setTimeInSeconds(0);
      setIntervalId(null);
    }
  };

  const handleResetAndClose = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    handleClose(false);
    setOpenOngoingCallDialog(false);
    setTimeSpent({
      hrs: '00',
      mins: '00',
      secs: '00',
    });
    setFormattedDuration('');
    setTimeInSeconds(0);
    setIntervalId(null);
  };

  useEffect(() => {
    const hrs = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = timeInSeconds % 60;

    setTimeSpent({
      hrs: hrs < 10 ? `0${hrs}` : `${hrs}`,
      mins: mins < 10 ? `0${mins}` : `${mins}`,
      secs: secs < 10 ? `0${secs}` : `${secs}`,
    });
  }, [timeInSeconds]);

  const createContactLogHandler = async () => {
    try {
      await createContactLogMutation({
        createContactLogDto: {
          leadContactId,
          recipientId: id,
          remark: '',
          duration: formattedDuration,
        },
      }).unwrap();
      handleClose(false);
    } catch (e) {
      handleError(e);
    }
  };

  return {
    handleResetAndClose,
    openOngoingCall,
    setOpenOngoingCallDialog,
    timeSpent,
    handleStartTimer,
    handleStopTimer,
    formattedDuration,
    createContactLogHandler,
  };
};
