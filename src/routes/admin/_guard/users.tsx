import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_guard/users')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
