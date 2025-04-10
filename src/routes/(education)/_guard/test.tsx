import { createFileRoute } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';

export const Route = createFileRoute('/(education)/_guard/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Trans>Hello "/(education)/_guard/test"!</Trans>
    </div>
  );
}
