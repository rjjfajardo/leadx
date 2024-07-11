import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export interface FilterItemProps {
  title: string;
  value: string;
  /**
   * Executed when the X button is clicked.
   */
  clear?: () => void;
  clearDisabled?: boolean;
}

/**
 * Renders a filtered item and a button to remove it from filtering.
 *
 * @param props - See {@link FilteredItemProps}
 */
const FilterItem = (props: FilterItemProps) => {
  const { title, value, clear, clearDisabled = false } = props;
  return (
    <Stack
      direction="row"
      sx={{
        mr: 1,
        borderRadius: 1,
        maxWidth: '100%',
        padding: '6px 8px',
        alignItems: 'center',
        bgcolor: 'grey.200',
      }}
    >
      <Box fontSize={14} lineHeight={1} color="#495057">
        {title}:{' '}
        <Box
          component="span"
          sx={{
            color: '#0F1011',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Box>
      </Box>
      {!clearDisabled && (
        <IconButton onClick={clear} sx={{ padding: '2px', marginLeft: '8px' }}>
          <CloseIcon sx={{ width: 14, height: 14, color: '#495057' }} />
        </IconButton>
      )}
    </Stack>
  );
};

export default FilterItem;
