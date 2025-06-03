import { createFileRoute } from '@tanstack/react-router';

import { RecoverPasswordForm } from '~/domains/global/features/auth/ui/recover-password-form';

export const Route = createFileRoute('/auth/_guard/recover-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RecoverPasswordForm className='w-full max-w-md' />;
}
