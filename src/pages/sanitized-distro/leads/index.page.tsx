import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@mui/material';

import AssignLeadDialog from '@/components/templates/Leads/AssignLeadDialog';
import LeadListWithFilter from '@/components/templates/Leads/LeadListWithFilter';
import { DISTRO_TYPE } from '@/constants/lead';
import { useHooks } from '@/pages/sanitized-distro/leads/hooks';

const SanitizedLeadListPage = () => {
  const { openDialog, setOpenDialog } = useHooks();

  return (
    <>
      <LeadListWithFilter
        distroType={DISTRO_TYPE.MAIN_SANITIZED}
        showDailyTarget={false}
        actionButton={
          <Button
            variant="contained"
            startIcon={<PeopleIcon />}
            sx={{ color: 'white', width: 250 }}
            onClick={() => setOpenDialog(true)}
          >
            Assign Leads
          </Button>
        }
      />
      <AssignLeadDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default SanitizedLeadListPage;
