import { Trans } from '@lingui/react/macro';
import { ColumnDef } from '@tanstack/react-table';

import { ApiComponents } from '~/shared/api';
import { formatLocaleDate } from '~/shared/lib/services/date';
import { DataTableColumnHeader } from '~/shared/ui/common/data-table/column-header';
import { Chip } from '~/shared/ui/primitives/chip';

export const USERS_TABLE_COLUMNS: ColumnDef<ApiComponents['AdminUser']>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>ID</Trans>} />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Email</Trans>} />;
    },
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Имя</Trans>} />;
    },
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Фамилия</Trans>} />;
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Роль</Trans>} />;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.role === 'admin' ? (
            <Chip color='success' size='sm'>
              <Trans>Админ</Trans>
            </Chip>
          ) : (
            <Chip size='sm'>
              <Trans>Студент</Trans>
            </Chip>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'join_date',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Дата регистрации</Trans>} />;
    },
    cell: ({ row }) => {
      return <div>{formatLocaleDate(row.original.join_date)}</div>;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'course_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Кол-во курсов</Trans>} />;
    },
    enableGlobalFilter: false,
  },
];
