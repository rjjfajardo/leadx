import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TabType } from '@/components/parts/Tabs';
import { bookSchema } from '@/components/templates/Leads/LeadCreateDialog/BookForm/hooks';
import { ContactType, DISTRO_TYPE } from '@/constants/lead';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import yup from '@/lib/yup';
import {
  Format,
  LeadContactInfo,
  useLeadsControllerCreateMutation,
} from '@/store/api/gen/leads';

const schema = yup.object().shape({
  author: yup.object().shape({
    firstName: yup.string().required(),
    middleName: yup.string().optional(),
    lastName: yup.string().required(),
    prefix: yup.string().optional(),
    alias: yup.string().optional(),
    gender: yup.string().oneOf(['MALE', 'FEMALE']).optional(),
    suffix: yup.string().optional(),
  }),
  emails: yup
    .array()
    .of(
      yup
        .object({
          email: yup.string().label('Email').email().required(),
        })
        .required(),
    )
    .min(1),
  phoneNumbers: yup
    .array()
    .of(
      yup.object({
        phoneNumber: yup.string().label('Phone Number').required(),
      }),
    )
    .length(1),
  address: yup
    .object({
      street: yup.string().optional(),
      city: yup.string().optional(),
      state: yup.string().optional(),
      zip: yup.string().optional(),
      country: yup.string().optional(),
    })
    .optional(),
  books: yup.array().of(bookSchema).optional(),
});

export type LeadFormValues = yup.InferType<typeof schema>;

type Props = {
  handleClose: (value: boolean) => void;
};

export type BookDetail = {
  isbn: string;
  publisher: { id: string; name: string };
  year: number;
  bookFormat: Format;
};

export type Book = {
  title: string;
  bookLink: string;
  details?: BookDetail[];
};

export const useHooks = ({ handleClose }: Props) => {
  const [activeTab, setActiveTab] = useState<'author' | 'book'>('author');

  const [book, setBook] = useState<Book>();

  const [createLeadMutation] = useLeadsControllerCreateMutation();

  const { handleSuccess, handleError } = useResponseHandler();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      emails: [{}],
      phoneNumbers: [{}],
      books: [],
    },
  });

  const { control, reset } = methods;

  const tabs: TabType[] = [
    {
      key: 'author',
      label: 'AUTHOR',
      onClick: () => setActiveTab('author'),
    },
    {
      key: 'book',
      label: 'BOOK',
      onClick: () => setActiveTab('book'),
    },
  ];

  const handleBookInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title' || name === 'bookLink') {
      setBook((prev) => ({
        ...(prev || { title: '', bookLink: '', details: [] }),
        [name]: value,
      }));
    } else {
      const [parent, key, field] = name.split('.');
      if (parent === 'details') {
        const updatedDetails = [...(book?.details || [])];
        updatedDetails[Number(key)] = {
          ...updatedDetails[Number(key)],
          [field]: value,
        };

        setBook((prev) => ({
          ...(prev || { title: '', bookLink: '', details: [] }),
          details: updatedDetails,
        }));
      }
    }
  };

  const handleCloseAndReset = () => {
    handleClose(false);
    setActiveTab('author');
    reset({
      author: {
        firstName: '',
        middleName: '',
        lastName: '',
        prefix: '',
        alias: '',
        gender: undefined,
        suffix: '',
      },
      emails: [{ email: '' }],
      phoneNumbers: [{ phoneNumber: '' }],
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
      books: [],
    });
    setBook(undefined);
  };

  const onSubmit = async (values: LeadFormValues) => {
    const { author, books, phoneNumbers, emails, address } = values;

    const formattedPhoneNumbers: LeadContactInfo[] | undefined =
      phoneNumbers?.map(({ phoneNumber }, index) => ({
        contactDetail: phoneNumber,
        contactType: ContactType.PHONE,
        priority: index++,
        countryCode: phoneNumber.match(/\+\S+/)?.[0] as string,
      })) ?? [];

    const formattedEmails: LeadContactInfo[] | undefined =
      emails?.map(({ email }, index) => ({
        contactDetail: email,
        contactType: ContactType.EMAIL,
        priority: index++,
        countryCode: '',
      })) ?? [];

    try {
      const hasAddressInput = Object.values(address || {}).some((value) =>
        Boolean(value),
      );

      await createLeadMutation({
        createLeadDto: {
          author: {
            ...author,
            prefix: author.prefix ?? '',
            middleName: author.middleName ?? '',
            alias: author.alias ?? '',
            gender: author.gender,
            suffix: author.suffix ?? '',
            timezone: '',
          },
          contactInfo: [...formattedEmails, ...formattedPhoneNumbers],
          currentDistro: DISTRO_TYPE.MAIN_UNSANITIZED,
          sourceId: null,
          books: book ? [...(books || []), book] : [...(books || [])],
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
      handleSuccess('Sucessfully created lead.');
      handleCloseAndReset();
    } catch (error) {
      handleError(error);
    }
  };

  return {
    tabs,
    activeTab,
    methods,
    control,
    onSubmit,
    book,
    setBook,
    handleBookInputChange,
    handleCloseAndReset,
  };
};
