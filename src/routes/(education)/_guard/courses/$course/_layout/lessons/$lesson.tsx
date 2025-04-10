import { Trans } from '@lingui/react/macro';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/(education)/_guard/courses/$course/_layout/lessons/$lesson')({
  component: RouteComponent,
});

function RouteComponent() {
  const { course, lesson } = useParams({ from: '/(education)/_guard/courses/$course/_layout/lessons/$lesson' });

  return (
    <div>
      Hello course {course} lesson {lesson}
      <Link to='/courses/$course/lessons/$lesson' params={{ course: '1', lesson: '3' }}>
        <Trans>Course 2</Trans>
      </Link>
    </div>
  );
}
