import { createFileRoute, Outlet, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useAppLayout } from '~/domains/global/widgets/layout';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/(education)/_guard/courses/$course/_layout')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  },
});

function RouteComponent() {
  const { course } = useParams({ from: '/(education)/_guard/courses/$course/_layout' });
  const { setSidebar } = useAppLayout();

  useEffect(() => {
    setSidebar(<div>Sidebar {course}</div>);

    return () => {
      setSidebar(null);
    };
  }, [course]);

  return <Outlet />;
}
