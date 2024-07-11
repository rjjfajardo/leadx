import { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { ComponentProps } from 'react';

import Link from '../Link';

/**
 * Properties for {@link Link}
 */
export type StyledLinkProps = {
  /**
   * URL to navigate to
   */
  href: string;

  /**
   * Target to open the link on.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target}
   */
  target?: string;

  /**
   * Content of the link.
   */
  children?: React.ReactNode;

  /**
   * SX Properties for the link.
   * @see {@link https://mui.com/system/getting-started/the-sx-prop/}
   */
  sx?: ComponentProps<typeof Link>['sx'];

  /**
   * Color to use with the link.
   * @see {@link https://mui.com/material-ui/api/link/#props}
   */
  color?: MuiLinkProps['color'];

  /**
   *
   * @see {@link https://mui.com/material-ui/api/link/#props}
   */
  onClick?: MuiLinkProps['onClick'];
};

export const StyledLink = (props: StyledLinkProps) => {
  const { href, target, children, sx, color, onClick } = props;

  return (
    <Link
      href={href}
      target={target}
      color={color}
      onClick={onClick}
      sx={{
        textDecoration: 'none',
        color: '#057EBC',
        '&:hover': {
          textDecorationLine: 'underline',
        },
        ...sx,
      }}
    >
      {children}
    </Link>
  );
};
