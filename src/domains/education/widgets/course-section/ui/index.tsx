import { Trans } from '@lingui/react';

import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface CoursesSectionProps {
  title: string;
  children: React.ReactNode;
}

export function CoursesSection({ title, children }: CoursesSectionProps) {
  return (
    <Flex col as='section' className='w-full'>
      <Typo as='h5' weight='semibold' size='2xl'>
        <Trans id={title} message={title} />
      </Typo>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>{children}</div>
    </Flex>
  );
}
