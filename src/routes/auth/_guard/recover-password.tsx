import { Trans } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/_guard/recover-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Trans>Hello "/(auth)/recover-password"!</Trans>
    </div>
  );
}
