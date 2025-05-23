import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { Flex } from '~/shared/ui/primitives/flex';
import { ScrollArea } from '~/shared/ui/primitives/scrollarea';

import { useAppLayout } from '../../lib/hooks/use-app-layout';

interface DesktopLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function DesktopLayout({ children, header }: DesktopLayoutProps) {
  const { sidebar, setScrollToTop } = useAppLayout();

  const [scrollAreaRef, setScrollAreaRef] = useState<HTMLDivElement | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(!!sidebar);

  useEffect(() => {
    if (scrollAreaRef) {
      setScrollToTop(() => {
        scrollAreaRef.scrollTo({ top: 0 });
      });
    }
  }, [scrollAreaRef]);

  useEffect(() => {
    const sidebarTimer = setTimeout(() => {
      setSidebarVisible(!!sidebar);
    }, 50);

    return () => {
      clearTimeout(sidebarTimer);
    };
  }, [sidebar]);

  const contentClassName = clsx(
    'bg-default-50 border-divider dark:border-divider-100 flex w-full flex-col rounded-lg border',
    'h-[calc(100vh-calc(var(--spacing)*16))]',
  );

  return (
    <div className='flex h-screen w-screen flex-col px-2 pb-2' id='app-layout'>
      <Flex as='header' className='h-14 shrink-0 items-center justify-between px-2'>
        {header}
      </Flex>

      <Flex gap='none'>
        <div
          id='sidebar-container'
          className={clsx(
            'ease-snappy duration-400 shrink-0 overflow-hidden transition-[width,margin,opacity,translate]',
            sidebarVisible ? 'mr-2 w-60 translate-x-0 opacity-100' : 'mr-0 w-0 -translate-x-1/2 opacity-0',
          )}
        >
          {sidebarVisible && <aside className='flex h-full w-60 shrink-0 flex-col px-0.5 py-px'>{sidebar}</aside>}
        </div>
        <main className={contentClassName}>
          <ScrollArea
            ref={setScrollAreaRef}
            className='shrink-1 flex h-full flex-col gap-4 overflow-y-auto'
            viewportProps={{ className: 'p-4' }}
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
