import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Flex } from '~/shared/ui/primitives/flex';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { t } = useLingui();

  return (
    <Flex col>
      <CoursesSection title={t`В процессе изучения`} />
      <CoursesSection title={t`Не начатые`} />
      <CoursesSection title={t`Завершенные`} />
    </Flex>
  );
}
