import { createFileRoute, useParams } from '@tanstack/react-router';

import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/(education)/_guard/courses/$course/_layout/lessons/$lesson')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { course, lesson } = useParams({ from: '/(education)/_guard/courses/$course/_layout/lessons/$lesson' });

  return (
    <div className='mx-auto w-full max-w-screen-md'>
      Hello course {course} lesson {lesson}
    </div>
  );
}
