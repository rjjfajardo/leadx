import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { ReactNode } from 'react';

import ContentHeader from '@/components/parts/ContentHeader';
import { Tabs, TabType } from '@/components/parts/Tabs';
import TemplateContent from '@/components/parts/TemplateContent';
import { useHooks } from '@/components/templates/Layout/TabPageLayout/hooks';

type Props = {
  initialKey: string;
  children: ReactNode;
  tabs: TabType[];
  title: string;
  templateContentSx?: SxProps;
  boxChildrenSx?: SxProps;
};

const TabPageLayout = ({
  initialKey,
  children,
  tabs,
  title,
  templateContentSx,
  boxChildrenSx,
}: Props) => {
  const { onSetTabKey } = useHooks({ tabs });

  return (
    <TemplateContent sx={{ ...templateContentSx }}>
      <ContentHeader title={title} wrapperSx={{ my: 0 }} />
      <Tabs tabs={tabs} initialKey={initialKey} onSetKey={onSetTabKey} />
      <Box sx={{ pt: 2.5, ...boxChildrenSx }}>{children}</Box>
    </TemplateContent>
  );
};

export default TabPageLayout;
