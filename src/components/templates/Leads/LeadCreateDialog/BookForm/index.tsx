import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import { Dispatch, SetStateAction } from 'react';

import SelectInput from '@/components/parts/SelectInput/SelectInput';
import * as TextInputPresentation from '@/components/parts/TextInput/TextInput';
import {
  BookAccordion,
  BookDetailAccordion,
} from '@/components/templates/Leads/LeadCreateDialog/BookForm/BookAccordion';
import { useHooks } from '@/components/templates/Leads/LeadCreateDialog/BookForm/hooks';
import { Book } from '@/components/templates/Leads/LeadCreateDialog/hooks';
import { BookFormat } from '@/constants/lead';

const UncontrolledTextInput = TextInputPresentation.default;

export type BookFormProps = {
  book: Book | undefined;
  setBook: Dispatch<SetStateAction<Book | undefined>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BookForm = ({ book, handleInputChange, setBook }: BookFormProps) => {
  const {
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
  } = useHooks({ book, setBook });

  return (
    <Stack gap={2}>
      {fields.length > 0 &&
        fields.map((_book, index) => (
          <>
            <Stack direction="row" gap={1} alignItems="center" key={_book.id}>
              <IconButton
                onClick={() => remove(index)}
                disableRipple
                sx={{ px: 0 }}
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
              <BookAccordion book={_book} />
            </Stack>
          </>
        ))}
      <Stack gap={2}>
        <UncontrolledTextInput
          name={'title'}
          value={book?.title}
          onChange={handleInputChange}
          label="Book Title"
          error={error.title ? 'This field is required' : ''}
          required
        />
        <UncontrolledTextInput
          name={'bookLink'}
          value={book?.bookLink}
          onChange={handleInputChange}
          label="Book Link"
        />
      </Stack>
      <Stack gap={2}>
        <Typography fontSize="small" mt={2}>
          Other Details:
        </Typography>
        {book?.details?.map((detail, index) => (
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            key={`${detail.isbn}-${index}`}
          >
            <IconButton
              onClick={() => handleRemoveBookDetail(detail)}
              disableRipple
              sx={{ px: 0 }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            <BookDetailAccordion detail={detail} />
          </Stack>
        ))}
        <Stack direction="row" gap={2}>
          <UncontrolledTextInput
            name={`isbn`}
            value={bookDetail?.isbn}
            onChange={handleBookDetailInputChange}
            label="ISBN"
            type="number"
            error={error.details ? 'This field is required' : ''}
          />
          <SelectInput
            name={`bookFormat`}
            label="Book Format"
            value={bookDetail?.bookFormat}
            options={BookFormat.map((format) => ({
              id: format,
              label: format.split('_').join(' '),
            }))}
            onChange={(v) =>
              handleBookDetailInputChange({
                target: { name: `bookFormat`, value: v },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            error={error.details ? 'This field is required' : ''}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <SelectInput
            name={`publisher`}
            label="Publisher"
            value={bookDetail?.publisher?.id}
            options={companies.map((company) => ({
              id: company.id,
              label: company.name,
            }))}
            onChange={(v, o) =>
              setBookDetail((prev) => ({
                ...prev,
                publisher: { id: o.id, name: o.label },
              }))
            }
            error={error.details ? 'This field is required' : ''}
            onClickAddLabel="Add Company"
            onClickAdd={handleCreateCompany}
            disableClearable={true}
          />
          <UncontrolledTextInput
            name={`year`}
            value={bookDetail?.year}
            onChange={handleBookDetailInputChange}
            label="Year Published"
            type="number"
            error={error.details ? 'This field is required' : ''}
          />
        </Stack>
      </Stack>
      <Button
        variant="text"
        startIcon={<AddIcon />}
        type="button"
        onClick={handleAddBookDetail}
      >
        Add book details
      </Button>
      <Button
        variant="text"
        startIcon={<AddIcon />}
        type="button"
        onClick={handleAddBook}
      >
        Add book
      </Button>
    </Stack>
  );
};

export default BookForm;
