import { Navigate } from '@tanstack/react-router';

import { useSession } from '../hooks/use-session';
import { UserRole } from '../../../user';

interface PrivateGuardProps {
  role: `${UserRole}`;
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
        return <Navigate to='/admin/dashboard' replace />;
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
