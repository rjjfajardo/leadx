import 'react-phone-input-2/lib/style.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { Provider } from 'react-redux';

import Snackbar from '@/components/parts/Snackbar';
import Layout from '@/components/templates/Layout';
import { useRedirector } from '@/hooks/useRedirector';
import theme from '@/lib/theme';
import { store } from '@/store/store';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
);

const AppContainer: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Redirector />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
      <Snackbar />
    </ThemeProvider>
  );
};

const App = (props: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>LeadX | Creative Media Marketing</title>
        <link rel="icon" href="/CMM-logo.png" />
      </Head>
      <AppContainer {...props} />
    </Provider>
  );
};

const Redirector = (): null => {
  useRedirector();
  return null;
};

// This is a little hacky solution to prevent `const { page } = router.query` is undefined on first rendering.
// https://nextjs.org/docs/messages/empty-object-getInitialProps
// https://github.com/vercel/next.js/discussions/11484
App.getInitialProps = async () => ({});

export default App;
