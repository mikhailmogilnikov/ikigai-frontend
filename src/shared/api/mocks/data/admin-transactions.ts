import { ApiComponents } from '../..';

const generateRandomTransaction = (id: number): ApiComponents['AdminTransaction'] => {
  const statuses = ['confirmed', 'pending', 'rejected'] as const;
  const randomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  };

  return {
    id: id.toString(),
    invoice_id: Math.floor(Math.random() * 1000).toString(),
    amount: Math.floor(Math.random() * 10000) + 100,
    created_at: randomDate(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    user_id: Math.floor(Math.random() * 50 + 1).toString(),
    course_id: Math.floor(Math.random() * 10 + 1).toString(),
  };
};

export const MOCK_ADMIN_TRANSACTIONS: ApiComponents['AdminTransaction'][] = Array.from({ length: 100 }, (_, index) =>
  generateRandomTransaction(index + 1),
);
