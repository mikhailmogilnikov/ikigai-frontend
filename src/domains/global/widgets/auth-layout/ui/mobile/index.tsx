import { LogoIcon } from '~/shared/assets/svg/logo';
import { Flex } from '~/shared/ui/primitives/flex';

interface AuthLayoutMobileProps {
  children: React.ReactNode;
}

export function AuthLayoutMobile({ children }: AuthLayoutMobileProps) {
  return (
    <Flex className='p-4' col>
      <h1 className='sr-only'>IKIGAI</h1>
      <LogoIcon className='mb-16 h-10 py-1 text-white' />
      <Flex col className=''>
        {children}
      </Flex>
    </Flex>
  );
}
