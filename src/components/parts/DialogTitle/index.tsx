import CloseIcon from '@mui/icons-material/Close';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiIconButton from '@mui/material/IconButton';
import { styled, SxProps, Theme } from '@mui/system';
import type { FC, PropsWithChildren } from 'react';

import TitleText from '@/components/parts/DialogTitle/TitleText';

const DialogTitleWrap = styled(MuiDialogTitle, {
  label: 'SFSD-DialogTitle',
})({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #dcdcdc',
});

const IconButton = styled(MuiIconButton, {
  label: 'SFSD-DialogTitle-closeButton',
})({
  padding: '6px',
});

type DialogTitleBaseProps = {
  sx?: SxProps<Theme>;
  subTitle?: string;
};
type DialogTitleWithCloseButtonProps = DialogTitleBaseProps & {
  onClose: () => void;
};
type DialogTitleWithoutCloseButtonProps = DialogTitleBaseProps & {
  noCloseButton: boolean;
};

type Props =
  | DialogTitleWithoutCloseButtonProps
  | DialogTitleWithCloseButtonProps;

const isNoCloseButton = (
  props: any,
): props is DialogTitleWithoutCloseButtonProps => {
  return !!props.noCloseButton;
};

const className = 'SFSD-DialogTitle';
const closeButtonClass = 'SFSD-DialogTitle-closeButton';

export const DialogTitle: FC<PropsWithChildren<Props>> = (props) => {
  const { children, sx, subTitle } = props;

  return (
    <DialogTitleWrap className={className} sx={sx}>
      <TitleText>
        {children}
        {subTitle && <TitleText sx={{ fontSize: 12 }}>{subTitle}</TitleText>}
      </TitleText>
      {isNoCloseButton(props) ? null : (
        <IconButton className={closeButtonClass} onClick={props.onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </DialogTitleWrap>
  );
};
