import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { AcquireMinedLeadsDialogProps } from '@/components/templates/Leads/AcquireMinedLeadsDialog/';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import yup from '@/lib/yup';
import leadApi from '@/store/api/enhancedApi/leads';

const schema = yup.object({
  count: yup.number().when('keyword', {
    is: (keyword: string) => !!keyword,
    then: (schema) => schema.optional(),
  }),
  keywordType: yup
    .string()
    .oneOf(['LEAD_NAME', 'BOOK_TITLE', 'ISBN'])
    .when('keyword', {
      is: (count: number) => !!count,
      then: (schema) => schema.required(),
    }),
  keyword: yup.string().when('leadCount', {
    is: (count: number) => !!count,
    then: (schema) => schema.optional(),
  }),
});

export type FormValues = yup.InferType<typeof schema>;

interface Props extends Pick<AcquireMinedLeadsDialogProps, 'handleClose'> {}

export const useHooks = ({ handleClose }: Props) => {
  const { handleSuccess, handleError } = useResponseHandler();

  const { control, reset, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { keywordType: 'LEAD_NAME' },
  });

  const [acquireLeads] = leadApi.useLeadsControllerAcquireMinedLeadsMutation();

  const countWatch = useWatch({ control, name: 'count' });
  const keywordWatch = useWatch({ control, name: 'keyword' });

  useEffect(() => {
    if (countWatch && keywordWatch) {
      reset({ ...getValues(), keyword: undefined, keywordType: 'LEAD_NAME' });
    }
  }, [countWatch]);

  useEffect(() => {
    if (keywordWatch && countWatch) reset({ ...getValues(), count: undefined });
  }, [keywordWatch]);

  const handleResetAndClose = () => {
    reset({
      keywordType: 'LEAD_NAME',
      keyword: undefined,
      count: undefined,
    });
    handleClose();
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await acquireLeads({ acquireLeadsDto: values }).unwrap();

      if (response.success) {
        handleSuccess(response.success);
        handleResetAndClose();
      }

      if (response.error) {
        handleError(undefined, response.error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    control,
    countWatch,
    keywordWatch,
    handleResetAndClose,
    onSubmit: handleSubmit(onSubmit),
  };
};
