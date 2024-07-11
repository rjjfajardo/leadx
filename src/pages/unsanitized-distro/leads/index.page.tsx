import Add from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import LeadCreateDialog from '@/components/templates/Leads/LeadCreateDialog';
import LeadListWithFilter from '@/components/templates/Leads/LeadListWithFilter';
import { DISTRO_TYPE } from '@/constants/lead';
import { useHooks } from '@/pages/unsanitized-distro/leads/hooks';

const UnsanitizedLeadListPage = () => {
  const { showCreateForm, setShowCreateForm } = useHooks();

  return (
    <>
      <LeadListWithFilter
        distroType={DISTRO_TYPE.MAIN_UNSANITIZED}
        actionButton={
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ color: 'white', width: 250 }}
            onClick={() => setShowCreateForm(true)}
          >
            Add Lead
          </Button>
        }
      />
      <LeadCreateDialog
        open={showCreateForm}
        handleClose={() => setShowCreateForm(false)}
      />
    </>
  );
};

export default UnsanitizedLeadListPage;
