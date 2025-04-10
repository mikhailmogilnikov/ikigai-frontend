import { Trans } from '@lingui/react/macro';
import { createFileRoute, Link } from '@tanstack/react-router';

import { EducationHeader } from '~/domains/education/widgets/header';
import { useSession } from '~/domains/global/entities/session';
import { useAppLayout } from '~/domains/global/widgets/layout/lib/hooks/use-app-layout';
import { Flex } from '~/shared/ui/primitives/flex';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useSession();
  const { setHeader, setSidebar } = useAppLayout();

  console.log('education guard');

  return (
    <Flex col wrap>
      <Link to='/test'>
        <Trans>Test</Trans>
      </Link>
      <button onClick={logout}>
        <Trans>Logout</Trans>
      </button>
      <button
        onClick={() => {
          setHeader(<EducationHeader />);
        }}
      >
        <Trans>Open Header</Trans>
      </button>

      <button
        onClick={() => {
          setHeader(null);
        }}
      >
        <Trans>Header Close</Trans>
      </button>

      <button
        onClick={() => {
          setSidebar(<div>Sidebar</div>);
        }}
      >
        <Trans>Sidebar</Trans>
      </button>
      <button
        onClick={() => {
          setSidebar(null);
        }}
      >
        <Trans>Sidebar Close</Trans>
      </button>
      <div className='h-200 bg-default w-20' />
      <div className='h-200 bg-default w-20' />
    </Flex>
  );
}
