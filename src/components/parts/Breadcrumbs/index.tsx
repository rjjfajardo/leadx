import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Theme } from '@mui/material';
import {
  BreadcrumbsProps as MUIBreadcrumbsProps,
  default as MUIBreadcrumbs,
} from '@mui/material/Breadcrumbs';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';

import Link from '@/components/parts/Link';

export type BreadcrumbType = {
  title: string;
  href?: string;
  onClick?: () => void;
};

export interface BreadcrumbsProps
  extends Omit<MUIBreadcrumbsProps, 'children'> {
  breadcrumbs: BreadcrumbType[];
  breadcrumbItemSx?: SxProps<Theme>;
}

const BreadcrumbItem = styled(Typography)(() => ({
  fontSize: 16,
  maxWidth: 200,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontWeight: 'bolder',
}));

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs, breadcrumbItemSx, ...muiBreadcrumbsProps } = props;

  return (
    <MUIBreadcrumbs
      {...muiBreadcrumbsProps}
      separator={
        <NavigateNextIcon fontSize="small" sx={{ color: grey[800] }} />
      }
    >
      {breadcrumbs.map((breadcrumb, index) => {
        const { title, href, onClick } = breadcrumb;

        return href ? (
          <Link
            key={index}
            href={href}
            color={'primary.main'}
            sx={{
              fontSize: 16,
              textDecoration: 'underline',
              ...breadcrumbItemSx,
            }}
          >
            {title}
          </Link>
        ) : (
          <BreadcrumbItem
            onClick={() => onClick?.()}
            key={index}
            sx={{
              cursor: onClick ? 'pointer' : 'default',
              color: onClick ? 'rgb(63, 106, 140)' : grey[800],
              ...breadcrumbItemSx,
            }}
          >
            {title}
          </BreadcrumbItem>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
