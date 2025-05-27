import { useLocation } from '@tanstack/react-router';

import { AddCourseButton } from '~/domains/admin/features/add-course';

export function AdminHeaderPageActions() {
  const { pathname } = useLocation();

  return <>{pathname === '/admin/courses' && <AddCourseButton />}</>;
}
