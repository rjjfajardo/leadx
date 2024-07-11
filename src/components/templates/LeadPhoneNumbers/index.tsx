import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AccessControl from '@/components/parts/AccessControl';
import { ChipSelect } from '@/components/templates/ChipSelect';
import { useHooks } from '@/components/templates/LeadPhoneNumbers/hooks';
import CallLeadDialog from '@/components/templates/Leads/CallLeadDialog';
import { ACCESS_TYPE } from '@/constants/accessControl';
import { OFFICIAL_ROLE_NAMES } from '@/constants/roles';
import { LeadContacts } from '@/store/api/gen/leads';

interface Props {
  leadContacts: LeadContacts[];
  scheduleReminder?: () => void;
  isReturnedToMiner: boolean;
}

const LeadPhoneNumbers = ({ leadContacts, isReturnedToMiner }: Props) => {
  const {
    statusOptions,
    handlePhoneIconClick,
    callInformation,
    openIniateCallDialog,
    setOpenIniateCallDialog,
    hasUserRole,
  } = useHooks();

  return (
    <Stack gap={0.3}>
      <Typography fontSize={12} fontWeight={500} color={'grey.500'}>
        Phone Numbers
      </Typography>
      {leadContacts
        .filter(({ contact }) => contact?.contactType === 'PHONE')
        .map(
          ({ contact, status, id }, idx) =>
            contact && (
              <Stack
                direction="row"
                key={contact?.contactDetail}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border={1}
                    borderRadius="50%"
                    padding={1}
                    width={20}
                    height={20}
                    color="white"
                    fontWeight={600}
                    fontSize={12}
                    sx={{ backgroundColor: 'primary.light' }}
                  >
                    {idx + 1}
                  </Box>

                  <Typography fontSize={18}>
                    {contact.contactDetail || '-'}
                  </Typography>
                </Stack>

                <AccessControl
                  requiredResources={[
                    { type: 'CONTACTS', accessTypes: [ACCESS_TYPE.CREATE] },
                  ]}
                  hideNoAccessTemplate
                >
                  <Stack direction="row" gap={1}>
                    {status && (
                      <ChipSelect
                        currentStatus={status.label}
                        statusOptions={statusOptions(id)}
                        disabled={
                          isReturnedToMiner ||
                          hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER)
                        }
                      />
                    )}

                    {!hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) && (
                      <Tooltip title="Call">
                        <IconButton
                          component="a"
                          href={`tel:${contact.contactDetail}`}
                          onClick={(e) => handlePhoneIconClick(e, contact, id)}
                        >
                          <LocalPhoneOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </AccessControl>
                <CallLeadDialog
                  open={openIniateCallDialog}
                  handleClose={() => setOpenIniateCallDialog(false)}
                  setOpenIniateCallDialog={setOpenIniateCallDialog}
                  phoneNumber={callInformation.phoneNumber}
                  leadContactId={callInformation.leadContactId}
                />
              </Stack>
            ),
        )}
    </Stack>
  );
};

export default LeadPhoneNumbers;
