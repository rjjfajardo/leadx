import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React from 'react';

import AppBar from '@/components/parts/AppBar';
import SideNav from '@/components/parts/SideNav';
import { LoadingLayout } from '@/components/templates/Layout/Loading';
import NonLoginLayout from '@/components/templates/Layout/NonLoginLayout';
import { whiteListedRoutes } from '@/constants/whiteListedRoutes';
import { useAuth } from '@/hooks/api/useAuth';

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  minWidth: 0,
  paddingTop: theme.spacing(8),
  display: 'flex',
}));

export const Layout = (props: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (!user) {
    return <NonLoginLayout {...props} />;
  }

  if (whiteListedRoutes.includes(router.pathname)) {
    return <NonLoginLayout {...props} />;
  }

  return (
    <>
      <SideNav />
      <ContentWrapper>
        <AppBar />
        {props.children}
      </ContentWrapper>
    </>
  );
};

export default Layout;
