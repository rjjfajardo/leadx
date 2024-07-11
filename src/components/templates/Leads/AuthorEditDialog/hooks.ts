import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useResponseHandler } from '@/hooks/useResponseHandler';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import yup from '@/lib/yup';
import leadApi from '@/store/api/enhancedApi/leads';
import { LeadForFindOne } from '@/store/api/gen/leads';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  middleName: yup.string().optional(),
  lastName: yup.string().required(),
  prefix: yup.string().optional(),
  alias: yup.string().optional(),
  gender: yup.string().oneOf(['MALE', 'FEMALE']).optional(),
  suffix: yup.string().optional(),
});

export type FormValues = yup.InferType<typeof schema>;

interface Props {
  author: LeadForFindOne;
  handleClose: (value: boolean) => void;
}

export const useHooks = (props: Props) => {
  const { id } = useRouterQuery<{
    id: string;
  }>();

  const { author, handleClose } = props;
  const { handleError, handleSuccess } = useResponseHandler();

  const { control, reset, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [updateAuthor] = leadApi.useLeadsControllerUpdateMutation();

  useEffect(() => {
    reset({
      firstName: author.firstName,
      lastName: author.lastName,
      middleName: author.middleName ?? undefined,
      prefix: author.prefix ?? undefined,
      alias: author.alias ?? undefined,
    });
  }, [author]);

  const handleResetAndClose = () => {
    reset();
    handleClose(false);
  };

  const updateHandler = async (values: FormValues) => {
    try {
      await updateAuthor({
        id,
        updateLeadDto: {
          author: {
            ...values,
            prefix: values.prefix ?? '',
            middleName: values.middleName ?? '',
            alias: values.alias ?? '',
            gender: values.gender,
            suffix: values.suffix ?? '',
            timezone: '',
          },
        },
      }).unwrap();
      handleSuccess('Successfully updated author info.');
      handleResetAndClose();
    } catch (e) {
      handleError(e);
    }
  };

  return {
    control,
    handleResetAndClose,
    onSubmit: handleSubmit(updateHandler),
  };
};
