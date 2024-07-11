import { styled } from '@mui/material/styles';
import {
  default as MuiTooltip,
  tooltipClasses,
  TooltipProps as MUITooltipProps,
} from '@mui/material/Tooltip';
import React from 'react';

/**
 * Properties for {@link Tooltip}
 */
interface TooltipProps extends MUITooltipProps {
  /**
   * Determines the color of the arrow and text of the tooltip.
   */
  textColor?: string;
}

/**
 * Renders a tooltip and allows to customize the color of the arrow and text.
 *
 * @see {@link https://mui.com/components/tooltips/}
 * @param props - See {@link TooltipProps}
 */
const Tooltip = styled((props: TooltipProps) => {
  const { className, ...rest } = props;
  return <MuiTooltip {...rest} classes={{ popper: className }} />;
})(({ color, textColor }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    color: textColor,
  },
}));

export default Tooltip;
