import { useMediaQuery } from 'usehooks-ts';
import { useMemo } from 'react';

import { MobileLayout } from './mobile';
import { DesktopLayout } from './desktop';

interface AppLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function AppLayout({ children, header }: AppLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const childrenMemo = useMemo(() => children, [children]);

  return isMobile ? (
    <MobileLayout header={header}>{childrenMemo}</MobileLayout>
  ) : (
    <DesktopLayout header={header}>{childrenMemo}</DesktopLayout>
  );
}
