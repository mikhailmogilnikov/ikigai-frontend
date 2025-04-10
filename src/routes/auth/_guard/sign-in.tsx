import { createFileRoute } from '@tanstack/react-router';

import { useSession } from '~/domains/global/entities/session';

export const Route = createFileRoute('/auth/_guard/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useSession();

  const handleLogin = (role: 'admin' | 'student') => {
    login({
      token: '1234567890',
      expiresAt: '1234',
      user: {
        id: '1234567890',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'Test',
        patronymic: 'Test',
        phone: '1234567890',
        join_date: '1234',
        role,
      },
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <button
        onClick={() => {
          handleLogin('admin');
        }}
      >
        Login as admin
      </button>
      <button
        onClick={() => {
          handleLogin('student');
        }}
      >
        Login as student
      </button>
    </div>
  );
}
