import { Trans } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { useSession } from '~/domains/global/entities/session';

export const Route = createFileRoute('/auth/_guard/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useSession();

  const handleLogin = (role: 'admin' | 'student') => {
    const studentToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImV4cCI6MTc0NTY1NDkyMiwicm9sZSI6InN0dWRlbnQifQ.IA0up6uQFlGNWG-zo7iKHh0DTLEjyI5DMMO8JvWgNfY';
    const adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImV4cCI6MTc0NTY1NDkyMiwicm9sZSI6ImFkbWluIn0.QGfAjdzEzjAoozLSePfPawuWJkRanWSlzggnn796Cpw';

    login({
      access_token: role === 'admin' ? adminToken : studentToken,
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <button
        onClick={() => {
          handleLogin('admin');
        }}
      >
        <Trans>Login as admin</Trans>
      </button>
      <button
        onClick={() => {
          handleLogin('student');
        }}
      >
        <Trans>Login as student</Trans>
      </button>
    </div>
  );
}
