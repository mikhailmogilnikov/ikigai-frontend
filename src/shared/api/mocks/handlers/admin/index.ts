import { admin_courses_handlers } from './courses';
import { admin_users_handlers } from './users';

export const admin_handlers = [...admin_courses_handlers, ...admin_users_handlers];
