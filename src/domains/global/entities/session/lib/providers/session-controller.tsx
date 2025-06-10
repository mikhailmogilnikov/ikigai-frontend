import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useSession } from '../hooks/use-session';

export function SessionController() {
  const navigate = useNavigate();
  const { session } = useSession();

  const prevSessionRef = useRef(session);

  useEffect(() => {
    const prevRole = prevSessionRef.current?.role;
    const currentRole = session?.role;

    if (prevRole === currentRole) return;

    if (session) {
      switch (session.role) {
        case 'admin':
          void navigate({ to: '/admin/courses' });
          break;
        case 'student':
          void navigate({ to: '/' });
          break;
      }
    } else {
      void navigate({ to: '/auth/sign-in' });
    }

    prevSessionRef.current = session;
  }, [session]);

  return null;
}
