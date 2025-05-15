import { HttpResponse } from 'msw';

import { http } from '../../http';
import { MOCK_USER_TRANSACTIONS } from '../../data/transactions';

export const edu_transactions_handlers = [
  http.get('/transactions', () => {
    return HttpResponse.json(MOCK_USER_TRANSACTIONS);
  }),
];
