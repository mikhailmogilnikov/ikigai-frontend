import { Trans } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/_guard/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Trans>Hello "/auth/sign-up"!</Trans>
    </div>
  );
}
