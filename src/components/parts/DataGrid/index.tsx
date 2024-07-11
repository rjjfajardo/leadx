import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';
import {
  DataGrid as MuiDataGrid,
  DataGridProps as MuiDataGridProps,
  GridColDef,
  GridRow,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { memo } from 'react';

export const MemoizedRow = memo(GridRow);

const DataGridWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'white',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: grey[200],
  },
  '& .MuiDataGrid-virtualScrollerContent .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
  '& .MuiDataGrid-virtualScrollerContent': {
    '& .MuiDataGrid-row': {
      '&:hover, &.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataGridProps<R extends GridValidRowModel = any> =
  MuiDataGridProps<R> & {
    wrapperSx?: SxProps<Theme>;
    columns: GridColDef<R>[];
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGrid = <R extends GridValidRowModel = any>({
  columns,
  // initialState,
  // apiRef,
  wrapperSx,
  ...props
}: DataGridProps<R>) => {
  return (
    <DataGridWrapper sx={{ ...wrapperSx, flex: 1, overflow: 'auto' }}>
      <MuiDataGrid<R>
        autoHeight={false}
        columns={columns}
        disableColumnFilter
        disableRowSelectionOnClick
        {...props}
      />
    </DataGridWrapper>
  );
};

export default memo(DataGrid) as typeof DataGrid;
