import { Trans } from '@lingui/react';

import { CourseCard } from '~/domains/education/entities/course/ui/card/course-card';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface CoursesSectionProps {
  title: string;
}

export function CoursesSection({ title }: CoursesSectionProps) {
  const courses = Array.from({ length: Math.ceil(Math.random() * 10) }, (_, index) => index + 1);

  return (
    <Flex col as='section' className='w-full'>
      <Typo as='h5' weight='semibold' size='2xl'>
        <Trans id={title} message={title} />
      </Typo>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {courses.map((course) => (
          <CourseCard
            key={course}
            courseId={course.toString()}
            variant='collection'
            completedLessonsCount={Math.floor(Math.random() * 10)}
            title={`Курс ${course.toString()}`}
            imageUrl='https://fakeimg.pl/600x400/292929/909090?font=bebas'
            lessonsCount={10}
          />
        ))}
      </div>
    </Flex>
  );
}
