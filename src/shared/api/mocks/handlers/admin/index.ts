import { admin_courses_handlers } from './courses';
import { admin_modules_handlers } from './modules';
import { admin_transactions_handlers } from './transactions';
import { admin_users_handlers } from './users';

export const admin_handlers = [
  ...admin_courses_handlers,
  ...admin_modules_handlers,
  ...admin_users_handlers,
  ...admin_transactions_handlers,
];
