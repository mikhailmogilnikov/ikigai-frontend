import { Trans } from '@lingui/react/macro';

import { normalizePrice } from '~/shared/lib/utils/price/normalize-price';
import { Transaction } from '~/domains/education/entities/transaction';
import { formatLocaleDate } from '~/shared/lib/services/date';

export function TransactionsTable() {
  const sortedData = MOCK_DATA.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <table>
      <thead className='bg-default z-1 sticky top-16 rounded-lg shadow-lg md:top-4'>
        <tr>
          <th className='w-min rounded-l-lg py-2 pl-4 text-start'>
            <Trans>Дата</Trans>
          </th>
          <th className='w-full px-4 text-start'>
            <Trans>Курс</Trans>
          </th>
          <th className='w-min rounded-r-lg pr-4 text-end'>
            <Trans>Сумма</Trans>
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

function TransactionRow({ date, amount, course_name }: Transaction) {
  return (
    <tr className='border-divider not-last:border-b align-top'>
      <td className='text-wrap break-words pl-2 pt-4 opacity-50'>{formatLocaleDate(date)}</td>
      <td className='p-4'>{course_name}</td>
      <td className='pr-2 pt-4 text-end'>{normalizePrice(amount)}</td>
    </tr>
  );
}

/* eslint-disable lingui/no-unlocalized-strings */
const MOCK_DATA: Transaction[] = [
  {
    id: 1,
    date: '2021-01-01',
    amount: 100000,
    course_name: 'Введение в веб-разработку',
  },
  {
    id: 2,
    date: '2021-02-15',
    amount: 150,
    course_name: 'Продвинутый JavaScript',
  },
  {
    id: 3,
    date: '2021-03-10',
    amount: 200,
    course_name: 'React: Основы и лучшие практики',
  },
  {
    id: 4,
    date: '2021-04-05',
    amount: 120,
    course_name: 'Node.js для бэкенда',
  },
  {
    id: 5,
    date: '2021-05-20',
    amount: 180,
    course_name: 'Базы данных: SQL и NoSQL',
  },
  {
    id: 6,
    date: '2021-06-15',
    amount: 220,
    course_name: 'Тестирование ПО: Unit и интеграционные тесты',
  },
  {
    id: 7,
    date: '2021-07-01',
    amount: 90,
    course_name: 'Основы дизайна UI/UX',
  },
  {
    id: 8,
    date: '2021-08-18',
    amount: 250,
    course_name: 'DevOps: CI/CD и Docker',
  },
  {
    id: 9,
    date: '2021-09-12',
    amount: 130,
    course_name: 'Python для анализа данных',
  },
  {
    id: 10,
    date: '2021-10-25',
    amount: 170,
    course_name: 'Машинное обучение: Введение',
  },
  {
    id: 11,
    date: '2021-11-08',
    amount: 210,
    course_name: 'Кибербезопасность для разработчиков',
  },
  {
    id: 12,
    date: '2021-12-01',
    amount: 110,
    course_name: 'Управление проектами в IT',
  },
  {
    id: 13,
    date: '2022-01-15',
    amount: 190,
    course_name: 'Разработка мобильных приложений на Flutter',
  },
  {
    id: 14,
    date: '2022-02-10',
    amount: 140,
    course_name: 'Angular: Современный фреймворк',
  },
  {
    id: 15,
    date: '2022-03-05',
    amount: 230,
    course_name: 'Архитектура микросервисов',
  },
  {
    id: 16,
    date: '2022-04-20',
    amount: 160,
    course_name: 'Облачные вычисления: AWS и Azure',
  },
  {
    id: 17,
    date: '2022-05-15',
    amount: 200,
    course_name: 'Графический дизайн: Основы',
  },
  {
    id: 18,
    date: '2022-06-10',
    amount: 125,
    course_name: 'Swift для iOS разработки',
  },
  {
    id: 19,
    date: '2022-07-05',
    amount: 240,
    course_name: 'Kotlin для Android разработки',
  },
  {
    id: 20,
    date: '2022-08-20',
    amount: 175,
    course_name: 'Game Development с Unity',
  },
  {
    id: 21,
    date: '2022-09-15',
    amount: 215,
    course_name: 'Блокчейн и криптовалюты',
  },
  {
    id: 22,
    date: '2022-10-10',
    amount: 105,
    course_name: 'Интернет-маркетинг: SEO и SMM',
  },
  {
    id: 23,
    date: '2022-11-05',
    amount: 195,
    course_name: 'Big Data: Основы и инструменты',
  },
  {
    id: 24,
    date: '2022-12-20',
    amount: 155,
    course_name: 'Искусственный интеллект: Продвинутые техники',
  },
  {
    id: 25,
    date: '2023-01-10',
    amount: 225,
    course_name: 'Разработка на C++: Современные стандарты',
  },
];
