import { Trans } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { useSession } from '~/domains/global/entities/session';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Flex } from '~/shared/ui/primitives/flex';
import { LinkButton } from '~/shared/ui/primitives/link-button';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { logout } = useSession();

  return (
    <Flex col>
      <button onClick={logout}>
        <Trans>Logout</Trans>
      </button>

      <LinkButton
        color='primary'
        className='w-30'
        to='/courses/$course/lessons/$lesson'
        params={{ course: 'd', lesson: '2' }}
      >
        <Trans>Course 1</Trans>
      </LinkButton>

      <div className='h-200 bg-default w-20' />
      <div className='h-200 bg-default w-20' />
    </Flex>
  );
}
