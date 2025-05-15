import { edu_courses_handlers } from './courses';
import { edu_transactions_handlers } from './transactions';

export const educationHandlers = [...edu_courses_handlers, ...edu_transactions_handlers];
