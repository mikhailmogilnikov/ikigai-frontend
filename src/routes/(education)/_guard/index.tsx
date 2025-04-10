import { Trans } from '@lingui/react/macro';
import { createFileRoute, Link } from '@tanstack/react-router';

import { useSession } from '~/domains/global/entities/session';
import { useAppLayout } from '~/domains/global/widgets/layout/lib/hooks/use-app-layout';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useSession();
  const { setSidebar } = useAppLayout();

  return (
    <Flex col>
      <button onClick={logout}>
        <Trans>Logout</Trans>
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

      <Button
        as={Link}
        color='primary'
        className='w-30'
        to='/courses/$course/lessons/$lesson'
        params={{ course: '1', lesson: '2' } as unknown as true}
      >
        <Trans>Course 1</Trans>
      </Button>

      <div className='h-200 bg-default w-20' />
      <div className='h-200 bg-default w-20' />
    </Flex>
  );
}
