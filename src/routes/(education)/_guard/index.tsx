import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { t } = useLingui();

  return (
    <Container gap='2xl'>
      <CoursesSection title={t`В процессе изучения`} />
      <CoursesSection title={t`Не начатые`} />
      <CoursesSection title={t`Завершенные`} />
    </Container>
  );
}
