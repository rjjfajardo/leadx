import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { bookSchema } from '@/components/templates/Leads/LeadCreateDialog/BookForm/hooks';
import { Book } from '@/components/templates/Leads/LeadCreateDialog/hooks';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import yup from '@/lib/yup';
import bookApi from '@/store/api/enhancedApi/books';

const schema = yup.object().shape({
  books: yup.array().of(bookSchema).required(),
});

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

  const [createBookMutation] = bookApi.useBooksControllerCreateMutation();

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { control, reset, handleSubmit } = formMethods;

  const [book, setBook] = useState<Book | undefined>();

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

  const handleResetAndClose = () => {
    reset();
    setBook(undefined);
    handleClose(false);
  };

  const updateHandler = async (values: FormValues) => {
    const { books } = values;

    try {
      await createBookMutation({
        createBookDto: {
          books: book ? [...(books || []), book] : [...(books || [])],
          leadId: id,
        },
      }).unwrap();
      handleSuccess('Successfully added book.');
      handleResetAndClose();
    } catch (e) {
      handleResetAndClose();
      handleError(e);
    }
  };

  return {
    control,
    handleResetAndClose,
    onSubmit: handleSubmit(updateHandler),
    formMethods,
    book,
    setBook,
    handleBookInputChange,
  };
};
