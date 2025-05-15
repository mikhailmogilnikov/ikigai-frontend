import { Trans } from '@lingui/react/macro';

import { normalizePrice } from '~/shared/lib/utils/price/normalize-price';
import { formatLocaleDate } from '~/shared/lib/services/date';
import { ApiComponents } from '~/shared/api';
import { Flex } from '~/shared/ui/primitives/flex';

interface TransactionTableProps {
  transactions: ApiComponents['Transaction'][];
}

export function TransactionsTable({ transactions }: TransactionTableProps) {
  const sortedData = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <table>
      <thead className='bg-default z-1 sticky top-16 rounded-lg shadow-lg md:top-4'>
        <tr>
          <th className='w-full rounded-l-lg px-4 py-2 text-start'>
            <Trans>Курс</Trans>
          </th>
          <th className='w-min min-w-40 rounded-r-lg pr-4 text-end'>
            <Trans>Сумма / Дата</Trans>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((transaction) => (
          <TransactionRow key={transaction.id} {...transaction} />
        ))}
      </tbody>
    </table>
  );
}

function TransactionRow({ date, amount, title }: ApiComponents['Transaction']) {
  return (
    <tr className='border-divider not-last:border-b align-top'>
      <td className='p-3 pl-2'>{title}</td>

      <td className='flex flex-col py-3 pr-2 text-end'>
        <Flex gap='sm' className='flex-col items-end'>
          <span className='text-base font-bold'>{normalizePrice(amount)}</span>
          <span className='text-sm opacity-50'>{formatLocaleDate(date)}</span>
        </Flex>
      </td>
    </tr>
  );
}
