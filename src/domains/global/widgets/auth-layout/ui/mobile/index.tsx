import { Flex } from '~/shared/ui/primitives/flex';

interface AuthLayoutMobileProps {
  children: React.ReactNode;
}

export function AuthLayoutMobile({ children }: AuthLayoutMobileProps) {
  return <Flex>{children}</Flex>;
}
