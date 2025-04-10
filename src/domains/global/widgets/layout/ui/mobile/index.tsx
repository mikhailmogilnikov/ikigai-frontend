import { Flex } from '~/shared/ui/primitives/flex';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return <Flex>{children}</Flex>;
}
