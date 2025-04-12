import { Trans } from '@lingui/react';
import { Link } from '@tanstack/react-router';

import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface CoursesSectionProps {
  title: string;
}

export function CoursesSection({ title }: CoursesSectionProps) {
  const courses = Array.from({ length: Math.ceil(Math.random() * 10) }, (_, index) => index + 1);

  return (
    <Flex col as='section' className='mb-4 w-full'>
      <Typo as='h5' weight='semibold' size='2xl'>
        <Trans id={title} message={title} />
      </Typo>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {courses.map((course) => (
          <Link key={course} to='/courses/$course/lessons/$lesson' params={{ course: course.toString(), lesson: '1' }}>
            <div className='bg-default h-100 w-full rounded-xl shadow-md' />
          </Link>
        ))}
      </div>
    </Flex>
  );
}
