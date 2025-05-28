import { Trans } from '@lingui/react/macro';
import { ColumnDef } from '@tanstack/react-table';

import { ApiComponents } from '~/shared/api';
import { formatLocaleDate } from '~/shared/lib/services/date';
import { normalizePrice } from '~/shared/lib/utils/price/normalize-price';
import { DataTableColumnHeader } from '~/shared/ui/common/data-table/column-header';

export const COURSES_TABLE_COLUMNS: ColumnDef<ApiComponents['AdminCourse']>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>ID</Trans>} />;
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Название</Trans>} />;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Цена</Trans>} />;
    },
    cell: ({ row }) => {
      return <span>{normalizePrice(row.original.price)}</span>;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'is_published',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Опубликован</Trans>} />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.is_published ? (
            <span className='text-success'>
              <Trans>Да</Trans>
            </span>
          ) : (
            <span className='opacity-50'>
              <Trans>Нет</Trans>
            </span>
          )}
        </span>
      );
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Дата создания</Trans>} />;
    },
    cell: ({ row }) => {
      return <span>{formatLocaleDate(row.original.created_at)}</span>;
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'lessons_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Уроков</Trans>} />;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'modules_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Модулей</Trans>} />;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'finished_users_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Кол-во прохождений</Trans>} />;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'users_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Кол-во продаж</Trans>} />;
    },
    enableGlobalFilter: false,
  },
];
