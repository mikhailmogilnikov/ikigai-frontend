import { useMediaQuery } from 'usehooks-ts';
import { useMemo } from 'react';

import { BREAKPOINT_MOBILE } from '~/shared/config/constants';

import { MobileLayout } from './mobile';
import { DesktopLayout } from './desktop';

interface AppLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function AppLayout({ children, header }: AppLayoutProps) {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  const childrenMemo = useMemo(() => children, [children]);

  return isMobile ? (
    <MobileLayout header={header}>{childrenMemo}</MobileLayout>
  ) : (
    <DesktopLayout header={header}>{childrenMemo}</DesktopLayout>
  );
}
