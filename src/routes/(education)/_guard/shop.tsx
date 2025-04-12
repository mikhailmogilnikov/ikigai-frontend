import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(education)/_guard/shop')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(education)/_guard/shop"!</div>;
}
