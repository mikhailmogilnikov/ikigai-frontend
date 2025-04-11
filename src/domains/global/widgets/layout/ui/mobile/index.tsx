import { Flex } from '~/shared/ui/primitives/flex';

interface MobileLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function MobileLayout({ children, header }: MobileLayoutProps) {
  return (
    <Flex col gap='none' id='app-layout'>
      <header className='bg-background border-divider-100 sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b px-4'>
        {header}
      </header>
      <main className='flex flex-col gap-4 p-4'>{children}</main>
    </Flex>
  );
}
