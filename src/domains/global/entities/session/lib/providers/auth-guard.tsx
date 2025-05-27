import { Navigate } from '@tanstack/react-router';

import { useSession } from '../hooks/use-session';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, payload } = useSession();

  if (isAuthenticated) {
    switch (payload?.role) {
      case 'admin':
        return <Navigate to='/admin/courses' replace />;
      case 'student':
        return <Navigate to='/' replace />;
    }
  }

  return children;
}
