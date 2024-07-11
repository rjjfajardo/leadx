import SaveIcon from '@mui/icons-material/Save';
import { FormProvider } from 'react-hook-form';

import CMMDialog from '@/components/parts/CMMDialog';
import TabPageLayout from '@/components/templates/Layout/TabPageLayout';
import AuthorForm from '@/components/templates/Leads/LeadCreateDialog/AuthorForm';
import BookForm from '@/components/templates/Leads/LeadCreateDialog/BookForm';
import { useHooks } from '@/components/templates/Leads/LeadCreateDialog/hooks';

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
};

const LeadCreateDialog = ({ open, handleClose }: Props) => {
  const {
    tabs,
    activeTab,
    methods,
    onSubmit,
    book,
    setBook,
    handleBookInputChange,
    handleCloseAndReset,
  } = useHooks({ handleClose });

  return (
    <CMMDialog
      open={open}
      onClose={handleCloseAndReset}
      title="Add New Lead"
      onSubmit={methods.handleSubmit(onSubmit)}
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
          padding: 0,
          maxHeight: '80%',
        },
      }}
    >
      <TabPageLayout
        tabs={tabs}
        initialKey="author"
        title=""
        templateContentSx={{
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        <FormProvider {...methods}>
          {activeTab === 'author' && <AuthorForm />}
          {activeTab === 'book' && (
            <BookForm
              book={book}
              setBook={setBook}
              handleInputChange={handleBookInputChange}
            />
          )}
        </FormProvider>
      </TabPageLayout>
    </CMMDialog>
  );
};

export default LeadCreateDialog;
