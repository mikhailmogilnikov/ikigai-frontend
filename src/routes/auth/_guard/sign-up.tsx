import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/_guard/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/sign-up"!</div>;
}
