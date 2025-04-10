import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div>
      Hello "/(education)/_education/"!
      <button
        onClick={() => {
          void navigate({ to: '/auth/sign-in' });
        }}
      >
        Sign in
      </button>
    </div>
  );
}
