import { useMediaQuery } from 'usehooks-ts';

import { BREAKPOINT_TABLET } from '~/shared/config/constants';

import { AuthLayoutMobile } from './mobile';
import { AuthLayoutDesktop } from './desktop';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const isMobile = useMediaQuery(BREAKPOINT_TABLET);

  return isMobile ? <AuthLayoutMobile>{children}</AuthLayoutMobile> : <AuthLayoutDesktop>{children}</AuthLayoutDesktop>;
}
