import { createFileRoute } from '@tanstack/react-router';

import { RegistrationForm } from '~/domains/global/features/auth';

export const Route = createFileRoute('/auth/_guard/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegistrationForm className='mx-auto w-full max-w-md' />;
}
