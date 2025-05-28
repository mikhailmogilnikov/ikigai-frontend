import { useNavigate } from '@tanstack/react-router';

import { DataTable } from '~/shared/ui/common/data-table/data-table';
import { ApiComponents } from '~/shared/api';
import { useSearch } from '~/domains/admin/features/search';

import { COURSES_TABLE_COLUMNS } from '../config/columns';

interface AdminCoursesTableProps {
  courses: ApiComponents['AdminCourse'][];
}

export function AdminCoursesTable({ courses }: AdminCoursesTableProps) {
  const navigate = useNavigate();
  const { search } = useSearch();

  const handleRowClick = (course: ApiComponents['AdminCourse']) => {
    void navigate({
      to: '/admin/courses/$course',
      params: { course: course.id.toString() },
    });
  };

  return <DataTable searchValue={search} columns={COURSES_TABLE_COLUMNS} data={courses} onRowClick={handleRowClick} />;
}
