import SaveIcon from '@mui/icons-material/Save';
import { FormProvider } from 'react-hook-form';

import CMMDialog from '@/components/parts/CMMDialog';
import { useHooks } from '@/components/templates/Leads/BookCreateDialog/hooks';
import BookForm from '@/components/templates/Leads/LeadCreateDialog/BookForm';

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
};

const BookCreateDialog = ({ open, handleClose }: Props) => {
  const {
    handleResetAndClose,
    onSubmit,
    formMethods,
    book,
    setBook,
    handleBookInputChange,
  } = useHooks({
    handleClose,
  });

  return (
    <CMMDialog
      open={open}
      onClose={handleResetAndClose}
      title="Add Book"
      onSubmit={onSubmit}
      submitLabel="Save"
      submitButtonProps={{
        startIcon: <SaveIcon />,
      }}
      sx={{
        '& .MuiDialog-paperScrollPaper': {
          width: '80%',
        },
        '& .MuiDialogContent-root > *': {
          margin: 0,
          paddingTop: 2.5,
        },
      }}
    >
      <FormProvider {...formMethods}>
        <BookForm
          book={book}
          setBook={setBook}
          handleInputChange={handleBookInputChange}
        />
      </FormProvider>
    </CMMDialog>
  );
};

export default BookCreateDialog;
