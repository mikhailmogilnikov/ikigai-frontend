import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { Flex } from '~/shared/ui/primitives/flex';
import { ScrollArea } from '~/shared/ui/primitives/scrollarea';

import { useAppLayout } from '../../lib/hooks/use-app-layout';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  const { header, sidebar } = useAppLayout();

  const [headerVisible, setHeaderVisible] = useState(!!header);
  const [sidebarVisible, setSidebarVisible] = useState(!!sidebar);

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setHeaderVisible(!!header);
    }, 50);

    const sidebarTimer = setTimeout(() => {
      setSidebarVisible(!!sidebar);
    }, 50);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(sidebarTimer);
    };
  }, [header, sidebar]);

  const contentClassName = clsx(
    'bg-default-50 border-divider-100 flex w-full flex-col rounded-lg border transition-all duration-300',
    {
      'h-[calc(100vh-calc(var(--spacing)*16))]': !!header,
      'mt-2 h-[calc(100vh-calc(var(--spacing)*4))]': !header,
    },
  );

  return (
    <div className='flex h-screen w-screen flex-col px-2 pb-2' id='app-layout'>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-out',
          headerVisible ? 'h-14 opacity-100' : 'h-0 opacity-0',
        )}
      >
        {header && (
          <Flex as='header' className='h-14 shrink-0 items-center justify-between px-2'>
            {header}
          </Flex>
        )}
      </div>
      <Flex gap='none'>
        <div
          className={clsx(
            'overflow-hidden transition-all duration-300 ease-out',
            sidebarVisible ? 'mr-2 w-60 opacity-100' : 'w-0 opacity-0',
          )}
        >
          {sidebar && <aside className='flex w-64 shrink-0 flex-col px-2 py-4'>{sidebar}</aside>}
        </div>
        <main className={contentClassName}>
          <ScrollArea
            className='shrink-1 flex h-full flex-col gap-4 overflow-y-auto px-4'
            viewportProps={{ className: 'py-4' }}
            classNames={{
              scrollbar: 'p-0.5',
              verticalScrollbar: 'w-2.5',
              horizontalScrollbar: 'h-2.5',
            }}
          >
            {children}
          </ScrollArea>
        </main>
      </Flex>
    </div>
  );
}
