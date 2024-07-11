import type { ButtonProps } from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import { SxProps, Theme } from '@mui/system';
import * as React from 'react';

import type { DialogActionItem } from '@/components/parts/DialogActionItems';
import DialogActionItems from '@/components/parts/DialogActionItems';
import { DialogTitle } from '@/components/parts/DialogTitle';
/**
 * Properties for {@link CMMDialog}
 */
export interface SFSDDialogProps
  extends Omit<DialogProps, 'onSubmit' | 'title'> {
  /**
   * Executed when user closes the dialog.
   */
  // before) onClose: () => void
  onClose: (event?: any, reason?: 'backdropClick' | 'escapeKeyDown') => void;
  /**
   * Dialog Title
   */
  title?: string | React.ReactElement;
  /**
   * Dialog Sub Title
   */
  subTitle?: string;
  /**
   * Label for confirmation button.
   */
  submitLabel?: string;
  /**
   * Properties for confirmation button.
   */
  submitButtonProps?: Pick<ButtonProps, 'color' | 'variant' | 'disabled' | 'startIcon'>
  /**
   * Label for cancel button.
   */
  cancelLabel?: string;
  /**
   * Properties for cancel button.
   */
  cancelButtonProps?: Pick<
    ButtonProps,
    'color' | 'variant' | 'disabled' | 'sx'
  >;
  /**
   * Event handler for when user confirms.
   */
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: DialogContentProps['children'];
  /**
   * If `true` a close button will be shown. Pressing on the close button
   * will execute {@link M1DialogProps}'s `onClose`
   */
  showCloseIcon?: boolean;
  /**
   * If `true`, the cancel button will be hidden.
   */
  hiddenCancelButton?: boolean;
  /**
   * Content to be shown to the left of the cancel button.
   */
  actionLeftElement?: React.ReactNode;
  dialogContentSx?: SxProps<Theme>;
  /**
   * Add sx to dialog box title or actions
   */
  dialogTitleSx?: SxProps<Theme>;
  dialogActionsSx?: SxProps<Theme>;

  disableSubmitBtn?: boolean;
}

/**
 * Renders a confirmation dialog and executes callbacks when user
 * answers.
 *
 * @param props - See {@Link SFSDDialogProps}
 */
const CMMDialog = (props: SFSDDialogProps) => {
  const {
    open,
    onClose,
    title,
    subTitle,
    submitLabel,
    cancelLabel,
    children,
    onSubmit,
    showCloseIcon,
    hiddenCancelButton,
    submitButtonProps,
    cancelButtonProps,
    actionLeftElement,
    dialogContentSx,
    dialogTitleSx,
    dialogActionsSx,
    disableSubmitBtn,
    ...rest
  } = props;

  const items: DialogActionItem[] = [
    ...(actionLeftElement
      ? [{ itemType: 'custom' as const, content: actionLeftElement }]
      : []),
    {
      itemType: 'button' as const,
      onClick: hiddenCancelButton ? undefined : onClose,
      label: cancelLabel || 'Cancel',
      variant: 'outlined',
      color: 'secondary',
      ...cancelButtonProps,
    },
    {
      itemType: 'secondary-button' as const,
      label: submitLabel || 'Confirm',
      onClick: onSubmit,
      color: 'primary',
      disabled: disableSubmitBtn,
      ...submitButtonProps,
    },
  ];

  return (
    <Dialog {...rest} open={open} onClose={(e, result) => onClose(e, result)}>
      {title && (
        <DialogTitle
          subTitle={subTitle}
          sx={dialogTitleSx}
          noCloseButton={!showCloseIcon}
          onClose={onClose}
        >
          {title}
        </DialogTitle>
      )}
      {children && (
        <DialogContent sx={dialogContentSx}>{children}</DialogContent>
      )}
      <DialogActions
        sx={{ borderTop: '1px solid #dcdcdc', ...dialogActionsSx }}
      >
        <DialogActionItems items={items} />
      </DialogActions>
    </Dialog>
  );
};

export default CMMDialog;
