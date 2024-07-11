import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type ActivityType = 'Callback' | 'Meeting';

export const useHooks = () => {
  const { control } = useForm();

  const [activityType, setActivityType] = useState<ActivityType>('Callback');

  const onChangeActivityType = (type: ActivityType) => setActivityType(type);

  return {
    control,
    activityType,
    setActivityType,
    onChangeActivityType,
  };
};
