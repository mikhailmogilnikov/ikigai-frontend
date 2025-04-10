export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  phone: string;
  join_date: string;
  role: `${UserRole}`;
}
