import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import { CourseSidebar } from '~/domains/education/widgets/course-sidebar';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { Typo } from '~/shared/ui/primitives/typo';

export const Route = createFileRoute('/(education)/_guard/courses_/$course_/lessons_/$lesson')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
});

function RouteComponent() {
  const { course, lesson } = Route.useParams();
  const { sidebar, setSidebar } = useAppLayout();

  useEffect(() => {
    if (!sidebar) {
      setSidebar(<CourseSidebar />);
    }

    return () => {
      setSidebar(null);
    };
  }, [setSidebar]);

  return (
    <Container size='md'>
      <Typo as='h1' size='2xl' weight='semibold'>
        {course}
      </Typo>
      <Typo as='h2' size='xl' weight='semibold'>
        {lesson}
      </Typo>
    </Container>
  );
}
