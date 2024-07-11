import Add from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import AcquireMinedLeadsDialog from '@/components/templates/Leads/AcquireMinedLeadsDialog';
import LeadListWithFilter from '@/components/templates/Leads/LeadListWithFilter';
import { DISTRO_TYPE } from '@/constants/lead';
import { useHooks } from '@/pages/unsanitized-distro/leads/verification/hooks';

const LeadVerificationListPage = () => {
  const { showAcquireLeadsDialog, setShowAcquireLeadsDialog } = useHooks();

  return (
    <>
      <LeadListWithFilter
        distroType={DISTRO_TYPE.ASSIGNED_UNSANITIZED}
        actionButton={
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ color: 'white', width: 250 }}
            onClick={() => setShowAcquireLeadsDialog(true)}
          >
            Acquire Mined Leads
          </Button>
        }
      />
      <AcquireMinedLeadsDialog
        open={showAcquireLeadsDialog}
        handleClose={() => setShowAcquireLeadsDialog(false)}
      />
    </>
  );
};

export default LeadVerificationListPage;
