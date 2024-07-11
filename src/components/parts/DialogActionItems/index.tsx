import Box from '@mui/material/Box';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { Fragment, ReactNode } from 'react';

export const assertNever = (_: never, throwError = true) => {
  if (!throwError) return;
  throw new Error('This code should not be called');
};

type ButtonType = {
  itemType: 'button' | 'secondary-button' | 'error-button';
  label: ReactNode;
} & Omit<MuiButtonProps, 'children' | 'variant' | 'color'>;

type TextType = {
  itemType: 'text';
  text: string;
};

/**
 * Custom item that is not a button or text.
 * creating a new type instead of using this is preferred.
 */
type CustomType = {
  itemType: 'custom';
  content: ReactNode;
};

export type DialogActionItem = ButtonType | TextType | CustomType;

type Props = {
  items: DialogActionItem[];
};

const DialogActionItems = (props: Props) => {
  const { items } = props;

  return (
    <>
      {items.map((item, index) => {
        const { itemType } = item;
        if (itemType === 'text') {
          return <Box key={index}>{item.text}</Box>;
        }

        if (
          itemType === 'button' ||
          itemType === 'secondary-button' ||
          itemType === 'error-button'
        ) {
          const { label, ...rest } = item;
          if (!item.onClick) return null;
          if (!item.label) return null;

          const colorMap: Record<
            ButtonType['itemType'],
            MuiButtonProps['color']
          > = {
            button: 'inherit',
            'secondary-button': 'secondary',
            'error-button': 'error',
          };

          const color = colorMap[itemType];

          return (
            <Button
              key={index}
              variant="contained"
              color={color}
              disabled={item.disabled}
              {...rest}
            >
              {label}
            </Button>
          );
        }

        if (itemType === 'custom') {
          const { content } = item;
          return <Fragment key={index}>{content}</Fragment>;
        }

        assertNever(itemType, false);

        return null;
      })}
    </>
  );
};

export default DialogActionItems;
