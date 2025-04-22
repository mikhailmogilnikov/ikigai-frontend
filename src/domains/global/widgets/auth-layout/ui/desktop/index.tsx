import { Flex } from '~/shared/ui/primitives/flex';
import noise from '~/shared/assets/images/noise.webp';
import { LogoIcon } from '~/shared/assets/svg/logo';

interface AuthLayoutDesktopProps {
  children: React.ReactNode;
}

export function AuthLayoutDesktop({ children }: AuthLayoutDesktopProps) {
  return (
    <Flex gap='none' className='h-dvh w-dvw'>
      <Flex className='relative h-full w-1/2 p-2 pr-1'>
        <div className='to-primary/10 via-primary dark:from-default-50 relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-black/80 via-60%'>
          <img draggable={false} className='z-1 absolute h-full w-full object-cover opacity-10' src={noise} />
          <Flex className='absolute left-5 top-4'>
            <h1 className='sr-only'>IKIGAI</h1>
            <LogoIcon className='h-20 py-1 text-white' />
          </Flex>
        </div>
      </Flex>
      <Flex className='h-full w-1/2 p-2 pl-1'>
        <Flex className='bg-default-50 border-foreground/5 h-full w-full rounded-xl shadow-lg dark:border'>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
