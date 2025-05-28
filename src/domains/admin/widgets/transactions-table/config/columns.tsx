import { Trans } from '@lingui/react/macro';
import { ColumnDef } from '@tanstack/react-table';
import Switch, { Case } from 'react-switch-case';

import { ApiComponents } from '~/shared/api';
import { formatLocaleDate } from '~/shared/lib/services/date';
import { normalizePrice } from '~/shared/lib/utils/price/normalize-price';
import { DataTableColumnHeader } from '~/shared/ui/common/data-table/column-header';
import { Chip } from '~/shared/ui/primitives/chip';

export const TRANSACTION_TABLE_COLUMNS: ColumnDef<ApiComponents['AdminTransaction']>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>ID</Trans>} />;
    },
  },
  {
    accessorKey: 'user_id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>ID пользователя</Trans>} />;
    },
  },
  {
    accessorKey: 'course_id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>ID курса</Trans>} />;
    },
  },
  {
    accessorKey: 'invoice_id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>ID транзакции</Trans>} />;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Сумма</Trans>} />;
    },
    cell: ({ row }) => {
      return <span>{normalizePrice(row.original.amount)}</span>;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Дата</Trans>} />;
    },
    cell: ({ row }) => {
      return <span>{formatLocaleDate(row.original.created_at)}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={<Trans>Статус</Trans>} />;
    },
    cell: ({ row }) => {
      return (
        <span>
          <Switch condition={row.original.status}>
            <Case value='confirmed'>
              <Chip size='sm' color='success'>
                <Trans>Подтвержден</Trans>
              </Chip>
            </Case>
            <Case value='pending'>
              <Chip size='sm' color='warning'>
                <Trans>Ожидает</Trans>
              </Chip>
            </Case>
            <Case value='rejected'>
              <Chip size='sm' color='danger'>
                <Trans>Отклонен</Trans>
              </Chip>
            </Case>
          </Switch>
        </span>
      );
    },
  },
];
