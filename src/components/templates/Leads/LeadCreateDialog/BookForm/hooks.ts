import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { BookFormProps } from '@/components/templates/Leads/LeadCreateDialog/BookForm';
import {
  BookDetail,
  LeadFormValues,
} from '@/components/templates/Leads/LeadCreateDialog/hooks';
import { BookFormat } from '@/constants/lead';
import { useCompanies } from '@/hooks/api/companies';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import yup from '@/lib/yup';
import companyApi from '@/store/api/enhancedApi/companies';

export const bookSchema = yup.object({
  title: yup.string().required(),
  bookLink: yup.string().optional(),
  details: yup.array().of(
    yup.object({
      id: yup.number().optional(),
      isbn: yup.string().required(),
      publisher: yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
      }),
      year: yup.number().required(),
      bookFormat: yup.string().oneOf(BookFormat).required(),
    }),
  ),
});

export const bookDetailDefaultValues = {
  isbn: '',
  publisher: { id: '', name: '' },
  year: undefined,
  bookFormat: undefined,
};

export type BookFormValues = yup.InferType<typeof bookSchema>;

type UseHooksProps = Pick<BookFormProps, 'book' | 'setBook'>;

export const useHooks = ({ book, setBook }: UseHooksProps) => {
  const { control } = useFormContext<LeadFormValues>();

  const [error, setError] = useState({
    title: false,
    details: false,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'books',
  });

  const { companies } = useCompanies();

  const [bookDetail, setBookDetail] = useState<Partial<BookDetail>>();
  const { handleSuccess, handleError } = useResponseHandler();

  const [createCompany] = companyApi.useCompaniesControllerCreateMutation();

  const handleBookDetailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setBookDetail({
      ...bookDetail,
      [name]: value,
    });
  };

  const checkBookDetail = (
    detail: Partial<BookDetail>,
  ): detail is BookDetail => {
    return (
      !!detail?.isbn &&
      !!detail?.publisher?.id &&
      !!detail?.publisher?.name &&
      !!detail?.year &&
      !!detail?.bookFormat
    );
  };

  const handleAddBookDetail = () => {
    if (checkBookDetail(bookDetail ?? {})) {
      setBook((prev) => ({
        ...(prev || { title: '', bookLink: '', details: [] }),
        details: [
          ...(prev?.details || []),
          {
            isbn: bookDetail?.isbn ?? '',
            publisher: {
              id: bookDetail?.publisher?.id ?? '',
              name: bookDetail?.publisher?.name ?? '',
            },
            year: bookDetail?.year ?? 0,
            bookFormat: bookDetail?.bookFormat ?? 'PAPERBACK',
          },
        ],
      }));

      resetValues();
    } else {
      setError((prev) => ({ ...prev, details: true }));
    }
  };

  const handleRemoveBookDetail = (detailToRemove: BookDetail) => {
    if (!book) return;
    const filtered = book.details?.filter(
      (detail) => detail !== detailToRemove,
    );
    setBook((prev) => ({
      ...(prev || { title: '', bookLink: '', details: [] }),
      details: filtered,
    }));
  };

  const resetValues = () => {
    setBookDetail(bookDetailDefaultValues);
    setError({ title: false, details: false });
  };

  const handleAddBook = () => {
    if (!book) return;
    if (book.title === '') {
      setError((prev) => ({ ...prev, title: true }));
      return;
    }

    const bookToSave = { ...book };

    if (checkBookDetail(bookDetail ?? {})) {
      bookToSave.details = [
        ...(bookToSave.details || []),
        {
          isbn: bookDetail?.isbn ?? '',
          year: bookDetail?.year ?? 0,
          bookFormat: bookDetail?.bookFormat ?? 'PAPERBACK',
          publisher: bookDetail?.publisher ?? { id: '', name: '' },
        },
      ];
    }

    append(bookToSave);
    setBook(undefined);
    resetValues();
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

  return {
    error,
    fields,
    remove,
    companies,
    handleBookDetailInputChange,
    bookDetail,
    setBookDetail,
    handleAddBook,
    handleAddBookDetail,
    handleRemoveBookDetail,
    handleCreateCompany,
  };
};
