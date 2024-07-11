import { GridColDef } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';

import DataGrid from '@/components/parts/DataGrid';
import Link from '@/components/parts/Link';
import { PER_PAGE } from '@/constants/pagination';
import { formatToMMDDYYYY } from '@/lib/date';
import { DistroType, LeadForFindAll } from '@/store/api/gen/leads';

interface LeadListProps {
  leads: LeadForFindAll[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalLeads: number;
  distroType: DistroType;
}

const LeadList = ({
  leads,
  page,
  setPage,
  totalLeads,
  distroType,
}: LeadListProps) => {
  const columns: GridColDef<LeadForFindAll>[] = [
    {
      field: 'author',
      headerName: 'Author',
      width: 250,
      hideable: false,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
      renderCell: (params) => (
        <Link
          href={`/leads/${params.row.id}/details?page=${page}&distroType=${distroType}`}
        >
          {`${params.row.firstName} ${params.row.lastName}`}
        </Link>
      ),
    },
    {
      field: 'book',
      headerName: 'Book Title',
      minWidth: 250,
      hideable: false,
      valueGetter: (_, row) => (row.books.length ? row.books[0].title : ''),
    },
    {
      field: 'isbn',
      headerName: 'ISBN',
      width: 250,
      hideable: false,
      valueGetter: (_, row) =>
        row.books.length
          ? row.books[0].bookPublishers.length
            ? row.books[0].bookPublishers.map(({ isbn }) => isbn).join(', ')
            : ''
          : '',
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      width: 200,
      hideable: false,
      valueGetter: (_, row) =>
        row.books.length
          ? row.books[0].bookPublishers.length
            ? row.books[0].bookPublishers
                .map(({ publisher }) => publisher.name)
                .join(', ')
            : ''
          : '',
    },
    {
      field: 'miner',
      headerName: 'Miner',
      width: 200,
      hideable: false,
      valueGetter: (_, row) => `${row.miner.firstName} ${row.miner.lastName}`,
    },
    {
      field: 'createdAt',
      headerName: 'Date Added',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      flex: 1,
      hideable: false,
      valueFormatter: (value) => formatToMMDDYYYY(value),
      valueGetter: (_, row) => formatToMMDDYYYY(new Date(row.createdAt)),
    },
  ];

  return (
    <DataGrid<LeadForFindAll>
      rows={leads}
      columns={columns}
      rowCount={totalLeads}
      paginationMode="server"
      pageSizeOptions={[PER_PAGE]}
      paginationModel={{ page: page - 1, pageSize: PER_PAGE }}
      onPaginationModelChange={(model) => setPage(model.page + 1)}
    />
  );
};

export default LeadList;
