import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { TemplateContentWithDataGrid } from '@/components/parts/TemplateContent';
import BarGraphChart from '@/components/templates/Charts/BarGraphChart';
import { HalfDoughnutChart } from '@/components/templates/Charts/HalfDoughnutChart';
import LeadMinedSummary from '@/components/templates/LeadMinedSummary';
import { useHooks } from '@/pages/dashboard/hooks';

const DashboardPage = () => {
  const { totalSales, missedSales } = useHooks();

  return (
    <TemplateContentWithDataGrid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 12, md: 12, lg: 12 }}
      >
        <>
          <Grid item xs={1} sm={3} md={3} lg={4}>
            <StyledPaper elevation={0}>
              <HalfDoughnutChart values={[totalSales, missedSales]} />
            </StyledPaper>
          </Grid>
          <Grid item xs={1} sm={3} md={3} lg={8}>
            <StyledPaper elevation={0}>
              <BarGraphChart />
            </StyledPaper>
          </Grid>
        </>
        <Grid item xs={1} sm={12} md={12} lg={12}>
          <LeadMinedSummary />
        </Grid>
      </Grid>
    </TemplateContentWithDataGrid>
  );
};

export default DashboardPage;

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  border: '0.3px solid #DCDCDC',
  padding: theme.spacing(4),
}));
