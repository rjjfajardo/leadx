import { Theme } from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { SxProps } from '@mui/system';
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link';

/**
 * Properties for {@link Link}
 */
export type LinkProps = {
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
  sx?: SxProps<Theme>;
  /**
   * Color to use with the link.
   * @see {@link https://mui.com/material-ui/api/link/#props}
   */
  color?: MuiLinkProps['color'];
  /**
   * @see {@link https://mui.com/material-ui/api/link/#props}
   */
  onClick?: MuiLinkProps['onClick'];
};
/**
 * Renders a link that will use Next JS router when navigating.
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/link}
 * @param props - See {@link LinkProps}
 */
const Link = (props: LinkProps) => {
  const { href, target, children, sx, color, onClick } = props;

  return (
    <MuiLink
      component={NextLink}
      href={href}
      target={target}
      rel="noopener noreferrer"
      color={color}
      onClick={onClick}
      sx={{ textDecoration: 'none', ...sx }}
      scroll={false}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
