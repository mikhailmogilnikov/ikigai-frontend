import { useMediaQuery } from 'usehooks-ts';
import { useMemo } from 'react';

import { MobileLayout } from './mobile';
import { DesktopLayout } from './desktop';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const childrenMemo = useMemo(() => children, [children]);

  return isMobile ? <MobileLayout>{childrenMemo}</MobileLayout> : <DesktopLayout>{childrenMemo}</DesktopLayout>;
}
