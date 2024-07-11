import LeadListWithFilter from '@/components/templates/Leads/LeadListWithFilter';
import { DISTRO_TYPE } from '@/constants/lead';
import { useHooks } from '@/pages/sanitized-distro/leads/assigned/hooks';

const MyAssignedLeadsPage = () => {
  useHooks();

  return (
    <LeadListWithFilter
      distroType={DISTRO_TYPE.ASSIGNED_SANITIZED}
      showDailyTarget={false}
    />
  );
};

export default MyAssignedLeadsPage;
