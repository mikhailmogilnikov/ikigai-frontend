import { Trans } from '@lingui/react/macro';
import { ColumnDef } from '@tanstack/react-table';

import { ApiComponents } from '~/shared/api';
import { formatLocaleDate } from '~/shared/lib/services/date';
import { normalizePrice } from '~/shared/lib/utils/price/normalize-price';
import { DataTableColumnHeader } from '~/shared/ui/common/data-table/column-header';

export const USERS_TABLE_COLUMNS: ColumnDef<ApiComponents['AdminCourse']>[] = [
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
  },
  {
    accessorKey: 'is_published',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Опубликован</Trans>} />;
    },
    cell: ({ row }) => {
      return <span>{row.original.is_published ? <Trans>Да</Trans> : <Trans>Нет</Trans>}</span>;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Дата создания</Trans>} />;
    },
    cell: ({ row }) => {
      return <span>{formatLocaleDate(row.original.created_at)}</span>;
    },
  },
  {
    accessorKey: 'lessons_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Уроков</Trans>} />;
    },
  },
  {
    accessorKey: 'modules_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Модулей</Trans>} />;
    },
  },
  {
    accessorKey: 'users_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Пользователей</Trans>} />;
    },
  },
  {
    accessorKey: 'finished_users_amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Закончили</Trans>} />;
    },
  },
];
