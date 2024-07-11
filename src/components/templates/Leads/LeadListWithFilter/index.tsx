import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAlt from '@mui/icons-material/FilterAlt';
import Search from '@mui/icons-material/Search';
import { LinearProgress } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FormProvider } from 'react-hook-form';

import CheckBoxList from '@/components/parts/CheckBoxList';
import FilterItem from '@/components/parts/FilterItem';
import SelectInput from '@/components/parts/SelectInput';
import { TemplateContentWithDataGrid } from '@/components/parts/TemplateContent';
import TextInput from '@/components/parts/TextInput';
import AcquireMinedLeadsDialog from '@/components/templates/Leads/AcquireMinedLeadsDialog/index';
import LeadCreateDialog from '@/components/templates/Leads/LeadCreateDialog';
import LeadList from '@/components/templates/Leads/LeadList';
import { useHooks } from '@/components/templates/Leads/LeadListWithFilter/hooks';
import { DISTRO_TYPE } from '@/constants/lead';
import { DistroType } from '@/store/api/gen/leads';

export interface LeadListWithFilterProps {
  actionButton?: JSX.Element;
  distroType: DistroType;
  showDailyTarget?: boolean;
}

const LeadListWithFilter = ({
  showDailyTarget = true,
  actionButton,
  distroType,
}: LeadListWithFilterProps) => {
  const {
    totalLeads,
    leads,
    page,
    setPage,
    formMethods,
    filterItems,
    showFilters,
    setShowFilters,
    expandedAccordion,
    handleAccordionChange,
    showCreateForm,
    setShowCreateForm,
    minerOptions,
    publisherOptions,
    showAcquireLeadsDialog,
    setShowAcquireLeadsDialog,
  } = useHooks({ distroType });

  const filters = [
    {
      label: 'Miner',
      content: (
        <FormGroup>
          <CheckBoxList name="miners" label="" options={minerOptions} />
        </FormGroup>
      ),
    },
    {
      label: 'Publisher',
      content: (
        <FormGroup>
          <CheckBoxList name="publishers" label="" options={publisherOptions} />
        </FormGroup>
      ),
    },
    {
      label: 'Date Added',
      content: (
        <FormGroup>
          <TextInput
            label={'From'}
            control={formMethods.control}
            name="dateAddedFrom"
            type="date"
            sx={{ mb: 1 }}
          />
          <TextInput
            label={'To'}
            control={formMethods.control}
            name="dateAddedTo"
            type="date"
          />
        </FormGroup>
      ),
    },
  ];

  return (
    <>
      <TemplateContentWithDataGrid>
        {showDailyTarget && (
          <DailyTargetContainer gap={2}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography fontWeight={600}>Daily Target</Typography>
              <Typography>50/100</Typography>
            </Stack>

            <LinearProgress variant="determinate" value={50} />
          </DailyTargetContainer>
        )}
        <Stack direction={'row'} gap={1}>
          {distroType === DISTRO_TYPE.MAIN_UNSANITIZED && (
            <SelectInput
              control={formMethods.control}
              name="listType"
              options={[
                { id: 'ALL_MINED_LEADS', label: 'ALL MINED LEADS' },
                { id: 'RETURNED_LEADS', label: 'RETURNED LEADS' },
              ]}
              formControlProps={{ fullWidth: false, sx: { width: 250 } }}
              disableClearable
            />
          )}

          <TextInput
            control={formMethods.control}
            name="searchText"
            size="small"
            placeholder="Search leads by name, book title, ISBN or publisher"
            formControlProps={{ sx: { flex: 1 } }}
            InputProps={{
              startAdornment: (
                <Search fontSize="small" sx={{ mr: 1.5, color: 'grey.500' }} />
              ),
              endAdornment: (
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  <FilterAlt fontSize="small" sx={{ color: 'grey.700' }} />
                </IconButton>
              ),
            }}
          />

          {actionButton}
        </Stack>

        {!!filterItems.length && (
          <Stack direction="row" mt={1} flexWrap="wrap" sx={{ width: '100%' }}>
            {filterItems.map((item) => (
              <FilterItem key={item.title} {...item} />
            ))}
          </Stack>
        )}

        <Stack
          minHeight={filterItems.length ? '68.5vh' : '72.5vh'}
          direction={'row'}
          flexGrow={1}
          gap={1}
          mt={1}
        >
          <LeadList
            leads={leads}
            page={page}
            setPage={setPage}
            totalLeads={totalLeads}
            distroType={distroType}
          />

          {showFilters && (
            <FormProvider {...formMethods}>
              <Stack
                border={'0.5px solid #DCDCDC'}
                sx={{
                  overflowY: 'scroll',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                borderRadius={1}
                flexShrink={0}
                bgcolor={'white'}
              >
                {filters.map(({ label, content }) => {
                  const isAccordionExpanded = expandedAccordion === label;

                  return (
                    <Accordion
                      key={label}
                      elevation={0}
                      disableGutters
                      sx={{ width: 250 }}
                      expanded={isAccordionExpanded}
                      onChange={(_, expanded) =>
                        handleAccordionChange(label, expanded)
                      }
                    >
                      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{label}</Typography>
                      </StyledAccordionSummary>
                      <AccordionDetails sx={{ px: 2 }}>
                        {content}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>
            </FormProvider>
          )}
        </Stack>
      </TemplateContentWithDataGrid>
      <LeadCreateDialog
        open={showCreateForm}
        handleClose={() => setShowCreateForm(false)}
      />
      <AcquireMinedLeadsDialog
        open={showAcquireLeadsDialog}
        handleClose={() => setShowAcquireLeadsDialog(false)}
      />
    </>
  );
};

export default LeadListWithFilter;

const DailyTargetContainer = styled(Stack)(({ theme }) => ({
  borderRadius: '3px',
  backgroundColor: 'white',
  border: '0.3px solid #DCDCDC',
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(1),
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '&.Mui-expanded': {
    backgroundColor: theme.palette.grey[100],
  },
}));
