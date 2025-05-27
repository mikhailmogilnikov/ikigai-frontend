import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_guard/transactions')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
