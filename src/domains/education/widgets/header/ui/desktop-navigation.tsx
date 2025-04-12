import { Trans } from '@lingui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLocation } from '@tanstack/react-router';

import { BREAKPOINT_MOBILE } from '~/shared/config/constants';
import { Divider } from '~/shared/ui/primitives/divider';
import { Flex } from '~/shared/ui/primitives/flex';
import { cn } from '~/shared/lib/utils';
import { LinkButton } from '~/shared/ui/primitives/link-button';

const navigationItems = [
  {
    id: 'my_collection',
    path: '/',
    label: 'Моя коллекция',
  },
  {
    id: 'course_shop',
    path: '/shop',
    label: 'Магазин курсов',
  },
] as const;

export function HeaderDesktopNavigation() {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (isMobile) return null;

  return (
    <>
      <Divider vertical className='bg-divider h-5' />
      <Flex gap='sm'>
        {navigationItems.map((item) => (
          <LinkButton
            key={item.path}
            to={item.path}
            variant='ghost'
            size='sm'
            className={cn(
              'hover:bg-default-50 dark:hover:bg-default-100',
              isActive(item.path) ? 'bg-default-50 dark:bg-default-100 opacity-100' : 'opacity-75',
            )}
          >
            <Trans id={`navigation.${item.id}`} message={item.label} />
          </LinkButton>
        ))}
      </Flex>
    </>
  );
}
