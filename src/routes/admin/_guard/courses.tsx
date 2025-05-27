/* eslint-disable lingui/no-unlocalized-strings */
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '~/shared/ui/common/data-table/column-header';
import { DataTable } from '~/shared/ui/common/data-table/data-table';

const MOCK_DATA: Payment[] = [
  // Fetch data from your API here.
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: 'a1b2c3d4',
    amount: 250,
    status: 'success',
    email: 'ivan@example.com',
  },
  {
    id: 'e5f6g7h8',
    amount: 75,
    status: 'failed',
    email: 'anna@example.com',
  },
  {
    id: 'i9j0k1l2',
    amount: 500,
    status: 'processing',
    email: 'petr@example.com',
  },
  {
    id: 'm3n4o5p6',
    amount: 150,
    status: 'success',
    email: 'maria@example.com',
  },
  {
    id: 'q7r8s9t0',
    amount: 300,
    status: 'pending',
    email: 'alex@example.com',
  },
  {
    id: 'u1v2w3x4',
    amount: 200,
    status: 'failed',
    email: 'elena@example.com',
  },
  {
    id: 'y5z6a7b8',
    amount: 450,
    status: 'processing',
    email: 'dmitriy@example.com',
  },
  {
    id: 'c9d0e1f2',
    amount: 175,
    status: 'success',
    email: 'sergey@example.com',
  },
  {
    id: 'g3h4i5j6',
    amount: 225,
    status: 'pending',
    email: 'natalia@example.com',
  },
  {
    id: 'k7l8m9n0',
    amount: 350,
    status: 'processing',
    email: 'andrey@example.com',
  },
  {
    id: 'o1p2q3r4',
    amount: 125,
    status: 'failed',
    email: 'olga@example.com',
  },
  {
    id: 's5t6u7v8',
    amount: 275,
    status: 'success',
    email: 'vladimir@example.com',
  },

  // ...
];

export const Route = createFileRoute('/admin/_guard/courses')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='-m-4'>
      <DataTable columns={columns} data={MOCK_DATA} />
    </div>
  );
}

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Status' />;
    },
    // cell: ({ row, cell }) => {
    //   const { original } = row;

    //   return <Link to=''>{cell.renderValue()}</Link>;
    // },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Email' />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
