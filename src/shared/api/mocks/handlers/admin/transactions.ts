import { HttpResponse } from 'msw';

import { http } from '../../http';
import { MOCK_ADMIN_TRANSACTIONS } from '../../data/admin-transactions';

export const admin_transactions_handlers = [
  http.get('/admin/transactions', () => {
    return HttpResponse.json(MOCK_ADMIN_TRANSACTIONS);
  }),
];
