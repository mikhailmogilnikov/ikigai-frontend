import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '~/domains/global/features/auth';

export const Route = createFileRoute('/auth/_guard/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm className='mx-auto w-full max-w-md' />;
}
