import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';

import { ContactType } from '@/constants/lead';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import { useSnackbar } from '@/hooks/useSnackbar';
import yup from '@/lib/yup';
import contactApi from '@/store/api/enhancedApi/contacts';
import { ContactInfo } from '@/store/api/gen/contacts';

const schema = yup.object().shape(
  {
    emails: yup.array().when('phoneNumbers', {
      is: (phoneNumbers: string[]) =>
        !phoneNumbers || phoneNumbers.length === 0,
      then: (schema) =>
        schema.of(yup.object({ email: yup.string().required() })),
      otherwise: (schema) => schema.optional(),
    }),
    phoneNumbers: yup.array().when('emails', {
      is: (emails: string[]) => !emails || emails.length === 0,
      then: (schema) =>
        schema.of(yup.object({ phoneNumber: yup.string().required() })),
      otherwise: (schema) => schema.optional(),
    }),
    address: yup
      .object()
      .shape({
        street: yup.string().optional(),
        city: yup.string().optional(),
        state: yup.string().optional(),
        zip: yup.string().optional(),
        country: yup.string().optional(),
      })
      .optional(),
  },
  [['emails', 'phoneNumbers']],
);

export type FormValues = yup.InferType<typeof schema>;

interface Props {
  handleClose: (value: boolean) => void;
}

export const useHooks = (props: Props) => {
  const { id } = useRouterQuery<{
    id: string;
  }>();

  const { handleClose } = props;
  const { handleError, handleSuccess } = useResponseHandler();

  const { setSnackbar } = useSnackbar();

  const [createContact] = contactApi.useContactsControllerCreateMutation();

  const { control, reset, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumbers: [{}],
      emails: [{}],
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
    },
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const {
    fields: phoneNumberFields,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  const handleResetAndClose = () => {
    reset();
    handleClose(false);
  };

  const createHandler = async (values: FormValues) => {
    const { phoneNumbers, emails, address } = values;

    const hasAddressInput = Object.values(address || {}).some((value) =>
      Boolean(value),
    );

    console.log({ emails });

    if (
      !hasAddressInput &&
      (!phoneNumbers || phoneNumbers.length === 0) &&
      (!emails || emails.length === 0)
    ) {
      setSnackbar({
        message: 'Provide at least 1 value.',
        open: true,
        severity: 'warning',
      });
      return;
    }

    const formattedPhoneNumbers: ContactInfo[] | undefined =
      phoneNumbers
        ?.filter(
          ({ phoneNumber }) =>
            typeof phoneNumber === 'string' && phoneNumber.trim() !== '',
        )
        .map(({ phoneNumber }, index) => ({
          contactDetail: phoneNumber,
          contactType: ContactType.PHONE,
          priority: index++,
          countryCode: phoneNumber.match(/\+\S+/)?.[0] as string,
        })) ?? [];

    const formattedEmails: ContactInfo[] | undefined =
      emails
        ?.filter(
          ({ email }) => typeof email === 'string' && email.trim() !== '',
        )
        .map(({ email }, index) => ({
          contactDetail: email,
          contactType: ContactType.EMAIL,
          priority: index++,
          countryCode: '',
        })) ?? [];

    try {
      await createContact({
        createContactDto: {
          contacts: [...formattedEmails, ...formattedPhoneNumbers],
          leadId: id,
          address: hasAddressInput
            ? {
                street: address?.street ?? '',
                city: address?.city ?? '',
                state: address?.state ?? '',
                zip: address?.zip ?? '',
                country: address?.country ?? '',
              }
            : undefined,
        },
      }).unwrap();
      handleSuccess('Successfully added contact.');
      handleResetAndClose();
      reset;
    } catch (e) {
      handleError(e);
    }
  };

  return {
    control,
    handleResetAndClose,
    onSubmit: handleSubmit(createHandler),
    emailFields,
    appendEmail,
    removeEmail,
    phoneNumberFields,
    appendPhoneNumber,
    removePhoneNumber,
  };
};
