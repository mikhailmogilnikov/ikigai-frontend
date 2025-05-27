import { Navigate } from '@tanstack/react-router';

import { ApiComponents } from '~/shared/api';

import { useSession } from '../hooks/use-session';

interface PrivateGuardProps {
  role: ApiComponents['UserRoles'];
  children: React.ReactNode;
}

export function PrivateGuard({ role, children }: PrivateGuardProps) {
  const { isAuthenticated, payload } = useSession();

  if (!isAuthenticated) {
    return <Navigate to='/auth/sign-in' replace />;
  }

  switch (role) {
    case 'student':
      if (payload?.role === 'admin') {
        return <Navigate to='/admin/courses' replace />;
      }
      break;
    case 'admin':
      if (payload?.role !== 'admin') {
        return <Navigate to='/' replace />;
      }
      break;
  }

  return children;
}
