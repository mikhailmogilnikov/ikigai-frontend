import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_guard/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/dashboard"!</div>;
}
