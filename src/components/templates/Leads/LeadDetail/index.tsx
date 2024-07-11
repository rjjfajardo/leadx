import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import AccessControl from '@/components/parts/AccessControl';
import ConfirmationDialog from '@/components/parts/ConfirmationDialog';
import InfoDisplay from '@/components/parts/InfoDisplay';
import MoreVertMenu from '@/components/parts/MoreVertMenu';
import SelectInput from '@/components/parts/SelectInput';
import Tabs from '@/components/parts/Tabs';
import TemplateContent from '@/components/parts/TemplateContent';
import TextInput from '@/components/parts/TextInput';
import { ChipSelect } from '@/components/templates/ChipSelect';
import { LoadingCover } from '@/components/templates/Layout/Loading';
import LeadPhoneNumbers from '@/components/templates/LeadPhoneNumbers';
import AuthorEditDialog from '@/components/templates/Leads/AuthorEditDialog';
import BookCreateDialog from '@/components/templates/Leads/BookCreateDialog';
import ContactCreateDialog from '@/components/templates/Leads/ContactCreateDialog';
import LeadComments from '@/components/templates/Leads/LeadComments';
import { useHooks } from '@/components/templates/Leads/LeadDetail/hooks';
import ScheduleAcitiy from '@/components/templates/ScheduleActivity';
import { ACCESS_TYPE } from '@/constants/accessControl';
import { BookFormat, DISTRO_TYPE } from '@/constants/lead';
import { OFFICIAL_ROLE_NAMES } from '@/constants/roles';
import { STATUS } from '@/constants/tagsAndStatus';
import { formatAddress } from '@/lib/address';
import { formatToMMDDYYYY } from '@/lib/date';

const LeadDetail = () => {
  const {
    lead,
    book,
    isLoading,
    tabs,
    onSetTabKey,
    handleNext,
    handlePrev,
    currentIndex,
    leadIds,
    isOpenEditAuthorInfoDialog,
    setIsOpenEditAuthorInfoDialog,
    isOpenCreateBookDialog,
    setIsOpenCreateBookDialog,
    isEditingBook,
    setIsEditingBook,
    isOpenContactCreateDialog,
    setIsOpenContactCreateDialog,
    control,
    leadTabs,
    activeTab,
    systemLogs,
    statusOptions,
    tagOptions,
    companies,
    handleCreateCompany,
    bookDetailFields,
    onSubmit,
    returnToMiner,
    returnToVerifier,
    showReturnToVerifier,
    showReturnToMinerBtn,
    moveVertOptions,
    openReturnToMinerConfirmationDialog,
    setOpenReturnToMinerConfirmationDialog,
    openReturnToVerifierrConfirmationDialog,
    setOpenReturnToVerifierConfirmationDialog,
    hasUserRole,
  } = useHooks();

  if (isLoading) return <LoadingCover />;
  if (!lead) return <></>;

  return (
    <TemplateContent
      sx={{
        padding: '0px 0px 120px 0px',
        height: `calc(100vh - 64px)`,
        flexDirection: 'column',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <Box>
        <InfoContainer
          direction={'row'}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 120,
          }}
        >
          <IconButton
            disableRipple
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ArrowBackIos />
          </IconButton>

          <Stack direction="row">
            <InfoDisplay
              label="Lead Miner"
              values={[`${lead.miner.firstName} ${lead.miner.lastName}`]}
            />
          </Stack>

          <InfoDisplay
            label="Date Added"
            values={[formatToMMDDYYYY(new Date(lead.createdAt))]}
          />

          {!hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) && (
            <Stack gap={0.3}>
              <Typography fontSize={12} fontWeight={500} color={'grey.500'}>
                Status
              </Typography>

              <ChipSelect
                currentStatus={lead.status.label}
                statusOptions={statusOptions}
                disabled={
                  showReturnToMinerBtn ||
                  !lead?.leadContacts
                    .filter(({ contact }) => contact?.contactType === 'PHONE')
                    .some(({ status }) => status?.label === STATUS.VERIFIED)
                }
              />
            </Stack>
          )}

          {!hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) && (
            <Stack gap={0.3}>
              <Typography fontSize={12} fontWeight={500} color={'grey.500'}>
                Tag
              </Typography>
              <ChipSelect
                currentStatus={lead.tag.label}
                statusOptions={tagOptions}
                disabled={
                  !lead?.leadContacts
                    .filter(({ contact }) => contact?.contactType === 'PHONE')
                    .some(({ status }) => status?.label === STATUS.VERIFIED)
                }
              />
            </Stack>
          )}

          {!showReturnToMinerBtn &&
            !hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) &&
            lead.currentDistro === DISTRO_TYPE.ASSIGNED_UNSANITIZED && (
              <MoreVertMenu
                options={moveVertOptions}
                useButtonToggle
                buttonToggleLabel="Action"
              />
            )}

          <Stack direction="row" mr={0} sx={{ justifyContent: 'flex-end' }}>
            <IconButton
              disableRipple
              onClick={handleNext}
              disabled={currentIndex === leadIds.length - 1}
            >
              <ArrowForwardIos />
            </IconButton>
          </Stack>
        </InfoContainer>
      </Box>

      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box
          sx={{
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          flex={1}
        >
          <InfoContainer gap={1}>
            <InfoHeader
              label="Author"
              action={
                !hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) ? (
                  <IconButton
                    onClick={() => setIsOpenEditAuthorInfoDialog(true)}
                  >
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            />

            <Container justifyContent={'space-evenly'}>
              <>
                <InfoDisplay
                  label="Name"
                  values={[
                    `${lead.prefix ?? ''} ${lead.firstName} ${lead.lastName} ${lead.suffix ?? ''}`,
                  ]}
                />

                <InfoDisplay label="Pen Name" values={[lead.alias ?? '']} />

                <InfoDisplay label="Gender" values={[lead.gender ?? '']} />
              </>
            </Container>
          </InfoContainer>
          <InfoContainer gap={2}>
            <InfoHeader
              label="Contact Information"
              action={
                <Stack direction={'row'}>
                  {showReturnToMinerBtn && (
                    <>
                      <Button
                        size="small"
                        variant="text"
                        color="error"
                        onClick={() =>
                          setOpenReturnToMinerConfirmationDialog(true)
                        }
                      >
                        Return to Miner
                      </Button>
                      <ConfirmationDialog
                        handleSubmit={returnToMiner}
                        open={openReturnToMinerConfirmationDialog}
                        onClose={() =>
                          setOpenReturnToMinerConfirmationDialog(false)
                        }
                        content="Are you sure you want to return this lead to the miner?"
                      />
                    </>
                  )}
                  {showReturnToVerifier && (
                    <>
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        onClick={() =>
                          setOpenReturnToVerifierConfirmationDialog(true)
                        }
                      >
                        Return to Verifier
                      </Button>
                      <ConfirmationDialog
                        handleSubmit={returnToVerifier}
                        open={openReturnToVerifierrConfirmationDialog}
                        onClose={() =>
                          setOpenReturnToVerifierConfirmationDialog(false)
                        }
                        content="Are you sure you want to return this lead to the assigned verifier?"
                      />
                    </>
                  )}
                  <AccessControl
                    requiredResources={[
                      { type: 'CONTACTS', accessTypes: [ACCESS_TYPE.CREATE] },
                    ]}
                    hideNoAccessTemplate
                  >
                    {hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) &&
                      lead.status.label === STATUS.RETURNED_TO_MINER && (
                        <IconButton
                          onClick={() => setIsOpenContactCreateDialog(true)}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                      )}

                    {!hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) && (
                      <IconButton
                        onClick={() => setIsOpenContactCreateDialog(true)}
                      >
                        <AddOutlinedIcon />
                      </IconButton>
                    )}
                  </AccessControl>
                </Stack>
              }
            />

            <Container sx={{ gap: 4 }}>
              <InfoDisplay
                label="Address"
                showOrderNumber={!!lead.leadAddresses.length}
                values={
                  lead.leadAddresses.length
                    ? lead.leadAddresses.map(({ address }) =>
                        formatAddress(address),
                      )
                    : []
                }
              />

              <LeadPhoneNumbers
                leadContacts={lead.leadContacts}
                isReturnedToMiner={
                  lead.status.label === STATUS.RETURNED_TO_MINER
                }
              />

              <InfoDisplay
                label="Email"
                showOrderNumber={
                  !!lead.leadContacts.filter(
                    ({ contact }) => contact?.contactType === 'EMAIL',
                  ).length
                }
                values={lead.leadContacts
                  .filter(({ contact }) => contact?.contactType === 'EMAIL')
                  .map(({ contact }) => contact?.contactDetail)
                  .filter((email): email is string => !!email)}
              />
            </Container>
          </InfoContainer>
          <InfoContainer height={'100%'} gap={3}>
            <InfoHeader
              label="Book Information"
              action={
                !hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) ? (
                  <IconButton onClick={() => setIsOpenCreateBookDialog(true)}>
                    <AddOutlinedIcon />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            />
            {!!tabs.length && (
              <Tabs
                tabs={tabs}
                initialKey={tabs[0].key}
                onSetKey={onSetTabKey}
              />
            )}

            <form style={{ height: '100%' }} onSubmit={onSubmit}>
              <BookInfoContainer sx={{ border: '0.3px solid #DCDCDC' }}>
                {lead.books.length && book ? (
                  <>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ alignItems: isEditingBook ? 'flex-end' : '' }}
                    >
                      {isEditingBook ? (
                        <TextInput
                          name={'title'}
                          control={control}
                          label="Book Title"
                          required
                        />
                      ) : (
                        <>
                          <InfoDisplay
                            label="Book Name"
                            values={[book.title]}
                          />
                        </>
                      )}
                      {!isEditingBook ? (
                        <AccessControl
                          requiredResources={[
                            {
                              type: 'LEADS',
                              accessTypes: [ACCESS_TYPE.UPDATE],
                            },
                          ]}
                          hideNoAccessTemplate
                        >
                          <IconButton onClick={() => setIsEditingBook(true)}>
                            <ModeEditOutlineOutlinedIcon />
                          </IconButton>
                        </AccessControl>
                      ) : (
                        <Stack direction="row">
                          <Button
                            variant="text"
                            sx={{
                              height: 40,
                              fontWeight: 'bold',
                              ml: 1,
                              display: { xs: 'none', sm: 'inline' },
                            }}
                            onClick={() => setIsEditingBook(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                              height: 40,
                              fontWeight: 'bold',
                              ml: 1,
                              display: { xs: 'none', sm: 'inline' },
                            }}
                          >
                            Save
                          </Button>
                        </Stack>
                      )}
                    </Stack>{' '}
                    <>
                      {isEditingBook ? (
                        <>
                          <Stack direction="row" gap={2}>
                            <TextInput
                              name={'bookLink'}
                              control={control}
                              label="Book Link"
                            />
                          </Stack>

                          {bookDetailFields.map((item, idx) => (
                            <div key={item.id}>
                              <Stack direction="row" gap={2} mb={2}>
                                <TextInput
                                  name={`details.${idx}.isbn`}
                                  control={control}
                                  label="ISBN"
                                />

                                <SelectInput
                                  control={control}
                                  name={`details.${idx}.bookFormat`}
                                  label="Book Format"
                                  options={BookFormat.map((format) => ({
                                    id: format,
                                    label: format.split('_').join(' '),
                                  }))}
                                />
                              </Stack>
                              <Stack direction="row" gap={2}>
                                <SelectInput
                                  name={`details.${idx}.publisher.id`}
                                  label="Publisher"
                                  control={control}
                                  options={companies.map((company) => ({
                                    id: company.id,
                                    label: company.name,
                                  }))}
                                  onClickAddLabel="Add Company"
                                  onClickAdd={handleCreateCompany}
                                  disableClearable={true}
                                />
                                <TextInput
                                  name={`details.${idx}.year`}
                                  control={control}
                                  label="Year Published"
                                />
                              </Stack>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <InfoDisplay
                            label="Book Link"
                            values={[book.bookLink || '']}
                          />
                          <InfoDisplay
                            label="Author Name Used"
                            values={[`${lead.firstName} ${lead.lastName}`]}
                          />
                          <InfoDisplay
                            label="ISBN - Publisher - Year - Format"
                            values={book?.bookPublishers.map(
                              ({ isbn, publisher, year, bookFormat }) =>
                                `${isbn ?? ''} - ${publisher.name ?? ''} - ${year ?? ''} - ${bookFormat ?? ''}`,
                            )}
                          />
                        </>
                      )}
                    </>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    No book record found.
                  </Box>
                )}
              </BookInfoContainer>
            </form>
          </InfoContainer>
        </Box>
        <Stack direction="column" flex={1}>
          <Box>
            <Tabs tabs={leadTabs} initialKey="history" />
          </Box>
          <Box
            sx={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {activeTab === 'comments' && <LeadComments />}
            {activeTab == 'history' && (
              <Stack gap={1} m={2}>
                {systemLogs.map((log) => (
                  <LogContainer
                    gap={1}
                    direction={'row'}
                    sx={{ borderLeft: '0.3px solid #DCDCDC' }}
                    key={log.id}
                  >
                    <Avatar />

                    <Stack flex={1}>
                      <Stack
                        gap={2}
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                      >
                        <Typography
                          fontWeight={600}
                        >{`${log.personnel.firstName} ${log.personnel.lastName}`}</Typography>
                        <Typography
                          color="grey.500"
                          fontWeight={550}
                          fontSize={10}
                        >
                          {log.createdAt}
                        </Typography>
                      </Stack>
                      <Typography fontSize={13}>{log.log}</Typography>
                    </Stack>
                  </LogContainer>
                ))}
              </Stack>
            )}
            {activeTab === 'activity' && <ScheduleAcitiy />}
          </Box>
        </Stack>
      </Box>

      <AuthorEditDialog
        open={isOpenEditAuthorInfoDialog}
        handleClose={() => setIsOpenEditAuthorInfoDialog(false)}
        author={lead}
      />

      <BookCreateDialog
        open={isOpenCreateBookDialog}
        handleClose={() => setIsOpenCreateBookDialog(false)}
      />

      <ContactCreateDialog
        open={isOpenContactCreateDialog}
        handleClose={() => setIsOpenContactCreateDialog(false)}
      />
    </TemplateContent>
  );
};

const Label = styled(Typography)(() => ({
  fontWeight: 550,
  fontSize: 20,
}));

const Container = styled(Stack)(({ theme: { spacing } }) => ({
  gap: spacing(1),
  height: '100%',
}));

const InfoContainer = styled(Stack)(({ theme: { spacing } }) => ({
  padding: spacing(3),
  backgroundColor: 'white',
  borderTop: '0.3px solid #DCDCDC',
  borderBottom: '0.3px solid #DCDCDC',
  borderRight: '0.3px solid #DCDCDC',
}));

const BookInfoContainer = styled(InfoContainer)(({ theme: { spacing } }) => ({
  gap: spacing(4),
  height: '100%',
  padding: spacing(4),
  backgroundColor: '#FDFDFD',
}));

const LogContainer = styled(InfoContainer)(({ theme: { spacing } }) => ({
  gap: spacing(1.5),
  padding: spacing(1.5),
  alignItems: 'center',
  backgroundColor: '#FDFDFD',
}));

const InfoHeader = ({
  label,
  action,
}: {
  label: string;
  action: JSX.Element;
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Label>{label}</Label>
      {action}
    </Stack>
  );
};

export default LeadDetail;
